# Map GL Style Build

Build [MapLibre GL styles](https://maplibre.org/maplibre-style-spec/) or [Mapbox GL styles](https://docs.mapbox.com/mapbox-gl-js/style-spec/) by composing layers.

A build system lets you more easily maintain stylesheet variations by removing the need to make duplicative changes across multiple stylesheets.

## Usage

### Style definition

This script assumes you have two directories:

1.  The **styles** directory, which contains each style you want to build. Each style is defined as a JS module that exports two plain JS objects:
    1. `context`: The variables this style defines that will be passed to layers during the build
    2. `template`: The style, which is a [MapLibre GL style](https://maplibre.org/maplibre-style-spec/) or [Mapbox GL style](https://docs.mapbox.com/mapbox-gl-js/style-spec/), the only difference being that `layers` is an array of layer ids.
2.  The **layers** directory, which contains each layer that will be included in a style. Each layer is defined as a JS module that exports a default function. The function takes one parameter: `context`, which contains the variables passed from the style. The function
    must return two objects:
    1. `baseStyle`: The base style object
    2. `overrides`: Any overrides for to the `baseStyle`, may be an empty object if no overrides are necessary

See the `examples` directory for examples.

### Using the script

Once installed using your package manager:

```bash
map-gl-style-build
    --style-dir=templates/styles
    --layer-dir=templates/layers
    --out-dir=build
```

The parameters are as follows:

- `--style-dir`: the style directory as defined above
- `--layer-dir`: the layer directory as defined above
- `--out-dir`: the directory built styles will be placed within
- `-v`: include for verbose output

### Helper functions

As a module, this library also exports two helper functions:

**`mergeOverrides`:**
Merges overrides with a base style or other overrides. Typically you can rely on `map-gl-style-build` to add overrides to your layers' base styles, but sometimes it makes sense to merge overrides earlier in situations where a layer's styles are complicated.

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

## Development

1.  Clone this rep
2.  `yarn install`
3.  `yarn watch`
4.  Edit files in `src/` and they will be built into `dist/`

## Implementation

Implementation of the build system is most easily done with a combination of a provided script and manual work.

Based on the prerequisite decisions about primary differentiators for variants, this script can do the initial work of:

- Breaking existing styles out into the style template and layer JS files
- Imposing a file structure on the repo

```bash
create-layer-templates
    --in-dir=styles
    --out-dir=templates
    --base-style-path=styles/base-style.json
```

The parameters are as follows:

- `--in-dir`: the style directory containing existing variant styles to break out into template files
- `--out-dir`: the directory to build your template files to
- `--base-style-path`: the name of the style in the "in-dir" that is the base style

After running the implementation script, you may manually delete the initial styles directory unless reusing it for building the templates to. The script avoids this step as there may occasionally be reason to leave these pre-build-system styles for posterity.

Before running your script or otherwise setting up the file structure in your repo, all style PRs should be merged and style work should stop until the new repo structure is merged.

After merge, style work can begin again in parallel with further changes for the build system.

Further changes to templates will be a manual process that includes:

- Continuing to make style layers consistent
- Finding common variables to use across layers

### Prerequisites

To reap the greatest benefit of a build system, you should consider addressing some prerequisites first:

- Decide which styles will be built
- Decide which style is the "base" or "default" style
- Decide what the primary differentiators of your styles are to use for `context` in layers (can be style id if no larger grouping makes sense)
- Keep layer ids for layers with the same styling/intention consistent across styles
- Make layer styling consistent where it can be

### Workflow implications of build system

After the build system is implemented, cartographers will no longer be able to make changes directly to a stylesheet. Instead all changes will be made directly to layer, variable, and style template files. These files will have to be built into output stylesheets via a command line tool provided by this library.

This means cartographers will be unable to make direct changes in an editor like Maputnik. If an editor is used to test style changes, those changes will need to be implemented by hand afterwards.

The build system will make certain large scale changes more difficult and others less difficult than editing stylesheets directly:

- The inability to use an editor, needing to add new layer files, and making changes to a layer file that need to be accounted for in all of its overrides may increase friction for large style changes
- The ability to make a change for all styles in one place and sharing common variables may decrease friction for other changes
