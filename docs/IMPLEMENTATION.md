# Implementation

## Converting Existing Stylesheets

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

After conversion, you can organize variables to improve maintainability. This step is optional but recommended for complex styles. See the [Defining Style Variables](#context-requirements) section in Building From Scratch for explanations of how to organize variables.

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

The `context` object contains variables that layers can reference. If you choose to store variables in separate files (recommended for complex stylesheets) those files must be declared using `require()`:

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

See more information about using variables and variable files in [WORKFLOW.md](./WORKFLOW.md). Some helper functions for managing variables are documented in the [advanced documentation](./ADVANCED.md).

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

## Next steps

For more information about using variables, adding new layers, and managing additional variants, see [Cartographic Workflow](./WORKFLOW.md).