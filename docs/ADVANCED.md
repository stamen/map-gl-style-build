# Advanced Features

## Build system parameters

### Notes on `--include` and `--exclude` parameters

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

## Helper Functions

The tool provides several utility functions for complex styling scenarios:

#### `mergeOverrides`
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

#### `mergeVariables`
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

#### `modifyNumberVariables`
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
  // Double all text sizes
  textSizes: modifyNumberVariables(textSizes, '*', 2),
  
  // Round to nearest integer
  lineWidths: modifyNumberVariables(lineWidths, '*', 1.5, { round: true })
};
```