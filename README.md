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

## File structure

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

See the [Implementation](./docs/IMPLEMENTATION.md) documentation for help setting this file structure up, which includes sections on [Converting Existing Stylesheets](./docs/IMPLEMENTATION.md#converting-existing-stylesheets) or [Building From Scratch](./docs/IMPLEMENTATION.md#building-from-scratch). 

After setting up your file structure, see [Cartographic Workflow](./WORKFLOW.md) for common tasks with the build system, and more information about working with variables.

## Usage

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

For more information about the `--include` and `--exclude` parameters, see [Build System Parameters](./docs/ADVANCED.md#build-system-parameters)

## Helper Functions

The tool provides several utility functions for complex styling scenarios: `mergeOverrides`, `mergeVariables`, `modifyNumberVariables`, which are documented in [Helper Functions](./docs/ADVANCED.md#helper-functions)


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

