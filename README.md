# Map GL Style Build

Build [MapLibre GL styles](https://maplibre.org/maplibre-style-spec/) or [Mapbox GL styles](https://docs.mapbox.com/mapbox-gl-js/style-spec/) by composing layers in shared JS files rather than in style JSONs.

A build system lets you more easily maintain stylesheet variations by removing the need to make duplicative changes across multiple stylesheets.

This library is a compiler that turns your files into renderable JSON stylesheets. To use it effectively, it expects you to set up a specific directory and file structure. More on this below.

### Who is this tool for?

- Users who need to maintain multiple stylesheets that are variations on one another and contain redundant style definitions
- Users who need to maintain a single stylesheet and prefer to work on layers in a more composable and maintainable way

## Usage

### File structure

The build script assumes you have two directories (whose names can be customized if you choose):

1.  The **styles** directory, which contains each style you want to build. Each style is defined as a JS module that exports two plain JS objects:
    1. `context`: The variables this style defines that will be passed to layers during the build
    2. `template`: The style, which is a [MapLibre GL style](https://maplibre.org/maplibre-style-spec/) or [Mapbox GL style](https://docs.mapbox.com/mapbox-gl-js/style-spec/), the only difference being that `layers` is an array of layer ids.
2.  The **layers** directory, which contains each layer that will be included in a style. Each layer is defined as a JS module that exports a default function. The function takes one parameter: `context`, which contains the variables passed from a given style file to customize the layer appropriately. The function must return two objects:
    1. `baseStyle`: The base style object
    2. `overrides`: Any overrides to the `baseStyle`, may be an empty object if no overrides are necessary

```
your-project/
├── templates/
│   ├── layers/           # Individual layer definitions
│   │   ├── roads.js
│   │   ├── buildings.js
│   │   └── labels.js
│   └── styles/        # Single style file with embedded variables
│       └── My_Map.js
└── build/               # Generated directory containing the generated stylesheets
    └── My_Map/
        └── style.json
```

See [`Implementation`](./docs/IMPLEMENTATION.md) for help setting this file structure up.

See the [`examples`](./examples/) directory in this repo for examples of the file structure. We recommend looking at [our `simple` example](./examples/simple) if you are new to the build system.

### Build script

Once installed using your package manager with the appropriate file setup, you can run the compiler in Bash or Node JS:

```bash
# Bash
map-gl-style-build
    --style-dir=templates/styles
    --layer-dir=templates/layers
    --out-dir=build
    --exclude=templates/styles/archived/*
    -v
```

```js
// JavaScript
import { buildStyles } from 'map-gl-style-build';

const styleDir = 'templates/styles';
const layerDir = 'templates/layers';
const outDir = 'build';
const options = {
  includeExcludePaths: [
    { flag: 'exclude', pathPattern: 'templates/styles/archived/*' }
  ],
  verbose: false
};

buildStyles(styleDir, layerDir, outDir, options);
```

The parameters are as follows:

- `--style-dir`: the style directory as defined above
- `--layer-dir`: the layer directory as defined above
- `--out-dir`: the directory built styles will be placed within
- `--exclude`: **optional** glob pattern or file path specifying files to exclude from included files
- `--include`: **optional** glob pattern or file path specifying files to include if varying from `style-dir` and `layer-dir`
- `-v`: include for verbose output

#### Notes on `--include` and `--exclude` parameters

Note that the `include` and `exclude` flags can be repeated and **order is relevant**.

For example, if we have a file structure like:

```
styles /
├── style-1.js
├── style-2.js
└── navigation /
    ├── nav-style-1.js
    └── nav-style-2.js
```

Then the following command would first ignore the `navigation` directory, but then explicitly include `nav-style-2.js` like the following:

##### Command

```
map-gl-style-build
    --style-dir=styles
    --layer-dir=...
    --out-dir=build
    --exclude=styles/navigation/*
    --include=styles/navigation/nav-style-2.js
```

##### Output

```
build /
├── style-1 /
│   └── style.json
├── style-2 /
│   └── style.json
└── navigation /
    └── nav-style-2/
        └── style.json
```

Alternatively, switching the order of those would have the same effect as not using the `include` flag as in this scenario, we first explicitly include `nav-style-2.js` (it would have been included anyway, but using this for the sake of a simple example), then we'd exclude the entire `navigation` directory which includes that style. This means the built styles would include no `navigation` styles at all.

##### Command

```
map-gl-style-build
    --style-dir=styles
    --layer-dir=...
    --out-dir=...
    --include=styles/navigation/nav-style-2.js
    --exclude=styles/navigation/*
```

##### Output

```
build /
├── style-1 /
│   └── style.json
└── style-2 /
    └── style.json
```

### Helper functions

As a JS module, this library also exports two helper functions:

**`mergeOverrides`:**
Merges overrides with a base style or other overrides. Typically you can rely on `map-gl-style-build` to add overrides to your layers' base styles, but sometimes it makes sense to merge overrides earlier in situations where a layer's styles are complicated.

Specifically, this function seamlessly merges in style properties within `paint` or `layout` in a style layer definition.

_Example:_

```js
// layer-template.js
const { mergeOverrides } = require('map-gl-style-build');

module.exports.default = context => {
  let baseStyle = {
    id: 'example-layer',
    type: 'fill',
    paint: {
      'fill-color': 'green'
    }
  };

  let overrides = {};

  if ((context.rootSource = 'source1')) {
    overrides = mergeOverrides(overrides, {
      paint: {
        'fill-color': 'red'
      }
    });
  }

  if ((context.colorMode = 'dark')) {
    // Add overrides to the existing overrides, if any.
    //
    // In thise case, only fill-opacity is added to the paint object, all other properties remain
    overrides = mergeOverrides(overrides, {
      paint: {
        'fill-opacity': 0.2
      }
    });
  }
};
```

**`mergeVariables`:**
Merges a variables object with an extender object to override variable values.

This function operates similarly to `mergeOverrides` with less specificity to the style spec.

_Example:_

```js
 // style-template.js
 const { mergeVariables, modifyNumberVariables } = require('map-gl-style-build');

 const textSizes = require('../variables/textSizes');

 module.exports.context = {
   textSizes: mergeVariables(textSizes, { countryLabelSize: 16 }),
   ...
 };
```

**`modifyNumberVariables`:**
Takes a variable or object specifying variables and applies a math function to the values. Expression values have the math function applied to all outputs within the expression.

This lets you easily apply math to variables to simplify the variables you track.

For example, if you have a variable for a road's line width of:

```
baseRoadWidth: [
  'interpolate',
  ['linear'],
  ['zoom'],
  1,
  5,
  12,
  20
];
```

then you could adjust that for other layers by using math where:

```
modifyNumberVariables(variables.baseRoadWidth, '*', 2)
```

is equal to

```
baseRoadWidth: [
  'interpolate',
  ['linear'],
  ['zoom'],
  1,
  10,
  12,
  40
];
```

Supports the following operations:

- `*`: multiplication
- `/`: division
- `+`: addition
- `-`: subtraction

Also added support for passing optional options object to round the modified value in different ways:

- `floor`: boolean
- `ceil`: boolean
- `round`: boolean
- `toFixed`: number

_Example:_

```js
 // style-template.js
 const { mergeVariables, modifyNumberVariables } = require('map-gl-style-build');

 const textSizes = require('../variables/textSizes');

 module.exports.context = {
   textSizes: modifyNumberVariables(textSizes, '*', 2, { round: true }),
   ...
 };
```

## Contributing to `map-gl-style-build`

1.  Clone this repo
1.  `yarn install`
1.  Edit files in `src/`
1.  `yarn build` or `yarn watch` to build files into `dist/`
1.  Add examples or tests if necessary
1.  File a pull request
