# Map GL Style Build

A build system for [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/style-spec/) and [Maplibre GL](https://maplibre.org/maplibre-style-spec) styles that enables modular, maintainable map styling through layer composition and template-based development.

## What This Tool Does

Instead of maintaining massive JSON stylesheets, `map-gl-style-build` lets you:

- **Break stylesheets into manageable layer files** - Each map layer becomes its own JavaScript module
- **Create style variants easily** - Define multiple styles by composing layers with different contexts
- **Work iteratively** - Make changes to individual layers and rebuild instantly
- **Maintain consistency** - Share common styling logic across multiple map styles
- **Version control effectively** - Track changes at the layer level, not the entire stylesheet

## Who is this tool for?

- Users who need to maintain multiple stylesheets that are variations on one another and contain redundant style definitions
- Users who need to maintain a single stylesheet and prefer to work on layers in a more composable and maintainable way

This library is a compiler that turns your JS files into renderable JSON stylesheets. To use it effectively, it expects you to set up a specific directory and file structure. More on this below.

## Installation

```bash
# Install the tool in your map project directory
yarn add map-gl-style-build@https://github.com/stamen/map-gl-style-build
```

## Setting up your file structure

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

See the [Examples](#examples) directory in this repo for examples of the file structure.

See [Building From Scratch](#building-from-scratch) or [Converting Existing Stylesheets](#converting-existing-stylesheets) for help setting this file structure up. 

### Converting Existing Stylesheets (Recommended)

If you already have Mapbox GL or Maplibre GL style JSON files, you can convert them into the template structure using the built-in conversion tool.

### Step 1: Prepare Your Styles

1. **Organize your existing stylesheets** in a directory (e.g., `original_styles/`)
2. **Identify your base style** - if you have multiple related stylesheets, identify the one that will serve as the foundation for others
3. **Audit for consistency** - if you have multiple related stylesheets, ensure layers that represent the same features have matching `id`, `type`, and `source` fields across stylesheets

### Step 2: Convert to Templates

Use the `create-layer-templates` command to break your stylesheets into manageable files.

Note that this script is only intended to be used once at the beginning of a project when implementing this system.

Based on the prerequisite decisions about primary differentiators for variants, this script can do the initial work of:

    Breaking existing JSON stylesheets out into the style template and layer JS files
    Imposing a file structure on the repo

```bash
yarn create-layer-templates \
  --in-dir=original_styles \
  --out-dir=templates \
  --base-style-path=original_styles/main-style.json
```

**Parameters:**
- `--in-dir`: Directory containing your existing style JSON files
- `--out-dir`: Directory where template files will be created
- `--base-style-path`: Path to your base/reference style file

`--base-style-path` indicates the specific stylesheet that all other styles in the directory designated as `--in-dir` will be considered variations off of.

You may manually delete the initial styles directory unless reusing it for building the templates to. The script avoids this step as there may occasionally be reason to archive these pre-build-system styles for posterity.

**Directory Structure Flexibility:** The folder and file names in the project structure can be renamed to match your project's conventions without impacting functionality. For example, you could use `themes` instead of `styles`, `components` instead of `layers`, or `output` instead of `build`. Just update the corresponding command parameters accordingly within your project directory, and note the differences when consulting further in this documentation.

### Step 3: Review Generated Structure

After conversion, you'll find:

```
templates/
├── layers/              # Individual layer definitions
│   ├── roads.js
│   ├── buildings.js
│   └── labels.js
└── styles/             # Style variants
    ├── main-style.js
    └── alternative-style.js
```

**Key points:**
- Each layer becomes a separate JavaScript file in `templates/layers/`
- Each style variant gets a file in `templates/styles/`
- The `context` section contains variables that can eliminate repetitive overrides
- Look for opportunities to create shared variables for colors, line widths, dash patterns, zoom-based interpolations, opacity values, font sizes, and data sources

### Step 4: Organize Variables (Optional)

After conversion, you can organize variables to improve maintainability. This step is optional but recommended for complex styles. See the [Defining Style Variables](#defining-style-variables) section in Building From Scratch for explanations of how to organize variables.

### Step 5: Test your build system

```bash
yarn map-gl-style-build \
  --style-dir=templates/styles \
  --layer-dir=templates/layers \
  --out-dir=build
```

Compare the generated stylesheets in `build/` with your original files to ensure they match.

### Troubleshooting Conversion

**Common issues:**
- **Missing layers**: Check that all layers from your original styles are present in the templates
- **Incorrect styling**: Verify that layer IDs, types, and sources match between variants
- **Missing sources**: Ensure all data sources are defined in your style templates

## Cartographic Workflow

### 1. Iterative Changes

Use your favorite text editor to make changes to individual layer files, then rebuild:

```bash
# Make changes to templates/layers/roads.js
# Then rebuild
yarn map-gl-style-build --style-dir=templates/styles --layer-dir=templates/layers --out-dir=build

# Preview changes locally using a tool like [Maperture](https://github.com/stamen/maperture/)
```

### 2. Adding New Layers

1. Create a new layer file in `templates/layers/`
2. Add the layer name to your style variant's `layers` array
3. Rebuild to see the changes

### 3. Creating Style Variants

1. Create a new style file in `templates/styles/`
2. Define your `context` and `template` objects
3. Rebuild to generate the new variant

## Building From Scratch

If you're starting with no existing stylesheets, this section explains how to create the template structure manually.

### Project Structure

The build system organizes layer definitions as individual template files, making them easier to edit directly, track in source control, or use with external style editors. You can also define variables and give them different values by creating style variants.

A simple build command exports a stylesheet for each variant, which you can reference in your Maplibre or Mapbox map.

### Layer Templates

The foundation of this system is the layer template - a JavaScript module that defines how a single map layer should be styled. Each layer template exports a function that receives a `context` object containing variables and returns two objects: `baseStyle` and `overrides`.

#### Basic Structure

```javascript
// templates/layers/roads.js
module.exports = (context) => {
  const baseStyle = {
    id: 'roads',
    type: 'line',
    source: context.roadSource,
    paint: {
      'line-color': context.theme.colors.roads,
      'line-width': context.layout.iconSize
    }
  };

  const overrides = {};
  
  // Conditional styling based on context
  if (context.styleName === 'dark-theme') {
    overrides.paint = {
      'line-color': context.theme.colors.roads
    };
  }

  return { baseStyle, overrides };
};
```

### Styles

Once you have a set of layer templates, you can organize them into a complete map style, or a set of related map styles. You create style files manually in the `templates/styles/` directory - these define the context (variables) and layer order for each style variant. 

#### Required Structure

Styles define the context (variables) and layer order. Each variant file must export two objects: `context` and `template`. Every style file must follow this structure:

```javascript
// templates/styles/My_Style.js
module.exports.context = {
  // Variables available to layers
  theme: { /* ... */ },
  layout: { /* ... */ }
};

module.exports.template = {
  version: 8,
  name: "My Style Name",
  sources: { /* ... */ },
  layers: [ /* ... */ ]
};
```

#### Context Requirements

The `context` object contains variables that layers can reference. Each variable file must be declared using `require()`:

```javascript
// For separate variable files
const theme = require('../variables/theme');
const layout = require('../variables/layout');

module.exports.context = {
  theme: theme.light,
  layout: layout.light
};

// For embedded variables
module.exports.context = {
  theme: {
    colors: { roads: '#666', buildings: '#ccc' },
    fonts: { labelFont: ["Noto Sans Regular"] }
  },
  layout: {
    iconSize: ["interpolate", ["linear"], ["zoom"], 11, 0.7, 16, 1],
    textPadding: 2
  }
};
```

#### Template Requirements

The `template` object defines the complete style specification:

- **`sources`**: All data sources must be declared here
- **`layers`**: Array of layer names that controls render order (z-order)

The `layers` array is crucial - it determines the order layers appear in the final `style.json`, which controls the visual stacking order on the map. Layers listed first render behind layers listed later.

### Build

When you run the build command, it processes these style files and generates the final `style.json` files in your `build/` directory.

```
your-project/
├── templates/
│   ├── layers/           # Individual layer definitions
│   │   ├── roads.js
│   │   ├── buildings.js
│   │   └── labels.js
│   └── styles/        # Single style file with embedded variables
│       └── My_Map.js
└── build/               # Generated stylesheet
    └── My_Map/
        └── style.json
```

### Defining Style Variables

One of the greatest benefits of this build system is that it allows you to avoid repetitive stylesheet declarations by using variables instead. There are multiple approaches for defining variables: through overrides within an individual layer file, by adding context definitions in the style file itself, or by defining variables across the style or style variants in a separate directory. With each approach, when the style is built, these variables resolve across all layers. We recommend you choose an approach that makes it easy to maintain a consistent design system and update themes globally.

#### Using Overrides

This approach is useful when you have specific conditional styling that doesn't warrant the additional complexity of creating variables across styles or style variants.

You can use overrides for conditional styling:

```javascript
// templates/layers/buildings.js
module.exports = (context) => {
  const baseStyle = {
    id: 'buildings',
    type: 'fill',
    source: 'mapbox-streets',
    paint: {
      'fill-color': '#cccccc',
      'fill-opacity': 0.8
    }
  };

  const overrides = {};
  
  // Override for dark theme
  if (context.styleName === 'dark-theme') {
    overrides.paint = {
      'fill-color': '#333333',
      'fill-opacity': 0.9
    };
  }
  
  // Override for high contrast mode
  if (context.highContrast) {
    overrides.paint = {
      'fill-opacity': 1.0
    };
  }

  return { baseStyle, overrides };
};
```

#### Declaring Variables Separately

If you want to manage related styles across multiple maps, or create a manageable theme or design system, we recommend you create variable styling instead of managing overrides.

##### Single Map Style

For simple projects with one map style, you may choose to define all variables directly in the style file's context:

```javascript
// templates/styles/My_Map.js
module.exports.context = {
  theme: {
    colors: {
      roads: 'rgb(143, 143, 143)',
      buildings: 'rgb(204, 204, 204)',
      labels: 'rgb(92, 92, 92)'
    },
    fonts: {
      labelFont: ["Noto Sans Regular"],
      iconFont: ["Noto Sans Bold"]
    }
  },
  layout: {
    iconSize: ["interpolate", ["linear"], ["zoom"], 11, 0.7, 16, 1, 18, 1.5],
    labelFontSize: ["interpolate", ["exponential", 0.7], ["zoom"], 13, 11, 16, 12, 18, 14],
    textPadding: 2,
    haloWidth: 1
  }
};

module.exports.template = {
  version: 8,
  name: "My_Map",
  sources: { /* ... */ },
  layers: [ /* ... */ ]
};
```

This approach is simpler but less maintainable for complex styles with many shared values. Thus even for a project with a single map style, you may choose to define variables in a separate directory and import them when building your styles.

```
your-project/
├── templates/
│   ├── layers/           # Individual layer definitions
│   │   ├── roads.js
│   │   ├── buildings.js
│   │   └── labels.js
│   ├── styles/
│   │   └── My_Map.js
│   └── variables/       # Shared variables
│       ├── theme.js
│       └── layout.js
└── build/               # Generated stylesheet
    └── My_Map/
        └── style.json
```

##### Multiple Style Variants

For multiple related styles, your best option is to organize shared variables in separate files:

```
your-project/
├── templates/
│   ├── layers/           # Individual layer definitions
│   │   ├── roads.js
│   │   ├── buildings.js
│   │   └── labels.js
│   ├── styles/        # Style variants
│   │   ├── light-theme.js
│   │   └── dark-theme.js
│   └── variables/       # Shared variables
│       ├── theme.js
│       └── layout.js
└── build/               # Generated stylesheets
    ├── light-theme/
    │   └── style.json
    └── dark-theme/
        └── style.json
```


## Running the build script

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

## Advanced Features

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

### Helper Functions

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

## Examples

Check out the `examples/` directory for complete working examples:

- **`simple/`** - Basic single-style setup
- **`shared-variables/`** - Using shared variables across styles
- **`nested/`** - Complex nested directory structures
- **`unused-context/`** - Handling unused context variables

## Contributing to map-gl-style-build

If you want to contribute to the tool itself:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/stamen/map-gl-style-build.git
cd map-gl-style-build

# Install dependencies
yarn install

# Start development mode
yarn watch
```

### Project Structure

- `src/` - Source code index and libraries
- `bin/` - Command-line executables
- `examples/` - Usage examples
- `dist/` - Built output (generated)

### Development Commands

```bash
yarn watch      # Watch for changes and rebuild
yarn build      # Build for production
yarn test       # Run tests
```

### Making Changes

1. Edit files in `src/`
2. Changes are automatically built to `dist/` when using `yarn watch`
3. Test your changes with the examples
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: See [INSTALLATION](INSTALLATION.md) for detailed setup instructions
- **Examples**: Check the `examples/` directory
- **Issues**: [GitHub Issues](https://github.com/stamen/map-gl-style-build/issues)

