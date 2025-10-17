# Map GL Style Build

A build system for [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/style-spec/) and [Maplibre GL](https://maplibre.org/maplibre-style-spec) styles that enables modular, maintainable map styling through layer composition and template-based development.

## What This Tool Does

Instead of maintaining massive JSON stylesheets, `map-gl-style-build` lets you:

- **Break stylesheets into manageable layer files** - Each map layer becomes its own JavaScript module
- **Create style variants easily** - Define multiple styles by composing layers with different contexts
- **Work iteratively** - Make changes to individual layers and rebuild instantly
- **Maintain consistency** - Share common styling logic across multiple map styles
- **Version control effectively** - Track changes at the layer level, not the entire stylesheet

## Quick Start

If you're familiar with Node.js, npm/yarn, and map styling, run these commands in your map project directory (not in this repository).

```bash
# Install the tool in your map project directory
yarn add map-gl-style-build@https://github.com/stamen/map-gl-style-build
```

### For Everyone Else

If you want to use this tool for maintaining map styles, but need a more detailed explanation, see [INSTALLATION](INSTALLATION.md) for detailed setup instructions.

## Typical Commands

```bash
# Basic build
yarn map-gl-style-build --style-dir=templates/styles --layer-dir=templates/layers --out-dir=build

# Verbose output
yarn map-gl-style-build --style-dir=templates/styles --layer-dir=templates/layers --out-dir=build -v

# Convert existing stylesheet
yarn create-layer-templates --in-dir=styles --out-dir=templates --base-style-path=styles/main.json
```

**Note:** Some preparation is required before running these commands. See [Building From Scratch](#building-from-scratch) or [Converting Existing Stylesheets](#converting-existing-stylesheets) sections below for setup instructions.

### Converting Existing Stylesheets (Recommended)

If you already have Mapbox GL or Maplibre GL style JSON files, you can convert them into the template structure using the built-in conversion tool.

### Step 1: Prepare Your Styles

1. **Organize your existing stylesheets** in a directory (e.g., `original_styles/`)
2. **Identify your base style** - if you have multiple related stylesheets, identify the one that will serve as the foundation for others
3. **Audit for consistency** - if you have multiple related stylesheets, ensure layers that represent the same features have matching `id`, `type`, and `source` fields across stylesheets

### Step 2: Convert to Templates

Use the `create-layer-templates` command to break your stylesheets into manageable files:

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

# Preview changes locally
yarn preview  # (if configured in package.json)
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

## Advanced Features

### Helper Functions

The tool provides several utility functions for complex styling scenarios:

#### `mergeOverrides`
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

#### `mergeVariables`
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

#### `modifyNumberVariables`
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

