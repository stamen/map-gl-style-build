# Map GL Style Build - Installation Guide

:wave: This guide walks through installing and setting up `map-gl-style-build` in a new or existing project containing one or more [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/style-spec/) or [Maplibre GL](https://maplibre.org/maplibre-style-spec) stylesheet.

## Prerequisites

### Required Software
- **Node.js** (v16 or higher recommended)
- **npm** (comes bundled with Node.js)
- **Yarn** (package manager)

### Checking Current Installation

Before installing, verify what's already available on your system:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Yarn version
yarn --version
```

### Installing Prerequisites (if needed)

#### Install Node.js
If Node.js is not installed:

*Option 1: Use a package manager*

##### **macOS (using Homebrew):**
```bash
brew install node
```
##### **Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```
##### **Windows (using Chocolatey):**
```bash
choco install nodejs
```
*Option 2: Download from official website*
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS version for your operating system
- Run the installer

#### Install Yarn
If Yarn is not installed:

```bash
# Install Yarn globally using npm
npm install -g yarn

# Or install Yarn using the official installer
# Visit: https://yarnpkg.com/getting-started/install
```

## Installation Steps

### 1. Initialize Project (if needed)

If you're starting with a new project or one without package management:

```bash
# Initialize package.json
yarn init -y
```

This creates a `package.json` file with default values.

### 2. Install map-gl-style-build

```bash
# Install the latest version from GitHub
yarn add map-gl-style-build@https://github.com/mizmay/map-gl-style-build
```

### 3. Verify Installation

```bash
# Check version
yarn map-gl-style-build --version

# View help
yarn map-gl-style-build --help
```

Expected output:
```
0.9.0
```

## Project Structure

After installation, your project will have:

```
your-project/
├── package.json          # Project dependencies
├── yarn.lock            # Locked dependency versions
├── node_modules/        # Installed packages
└── .yarn/              # Yarn configuration
```
If you are using Git and these are not already in your .gitignore file, it makes sense to add them.

## Next Steps

### For Editing and Rebuilding Styles

#### 1. Make a change to a style attribute 

Find the attribute you want to change in one of the files under `template/layers`.

If you are starting from scratch, see the [README](README.md) for the file directory structure you should have or create.

If you are creating a new layer, add it to the render-ordered list of layers in `templates/styles`

#### 2. Boot up a local web server 

This is so you can preview the results of your changes locally.

I recommend [Caddy](https://caddyserver.com/docs/install), a web server that automatically handles HTTPS certificates and provides excellent performance for local development. It's particularly useful for map development because it can serve static files and handle CORS properly. Once installed, you can run it with:

`caddy file-server --listen :8080`

or, for CORS support:

`caddy file-server --listen :8080 --browse --cors`

Then paste the link into your browser to see a locally rendered version of your project.

#### 3. Optimize your workflow

Make your life easier by adding simple build (and preview) keywords you can type to run these commands

Under scripts to your new `package.json` add or modify the `scripts` section below:

```json
{
  "packageManager": "yarn@4.9.1",
  "dependencies": {
    "map-gl-style-build": "https://github.com/mizmay/map-gl-style-build"
  },
  "scripts": {
    "build": "map-gl-style-build --style-dir=templates/styles --layer-dir=templates/layers --out-dir=build",
    "build:verbose": "map-gl-style-build --style-dir=templates/styles --layer-dir=templates/layers --out-dir=build -v",
    "clean": "rm -rf build",
    "preview": "caddy file-server --root ./build --listen :8080 --browse --cors",
  }
}
```

Double-check and make any changes necessary for your local configuration.

Once you've saved that change, you can type `yarn build` to export your layer changes to a new stylesheet, or `yarn preview` to see your changes locally in the browser.

### For Converting Existing Styles

If you want to convert an existing style to templates:

1. **Use the create-layer-templates command:**
   ```bash
   yarn create-layer-templates --help
   ```

2. **Convert your existing style:**
   ```bash
   yarn create-layer-templates --in-dir=styles --out-dir=templates --base-style-path=styles/main-style.json
   ```

For more details see the [README](README.md)

## Troubleshooting

### Common Issues

**"yarn: command not found"**
- Yarn is not installed or not in PATH
- Solution: Install Yarn using the steps above

**"node: command not found"**
- Node.js is not installed or not in PATH
- Solution: Install Node.js using the steps above

**Permission errors on macOS/Linux**
- Try using `sudo` for global installations
- Or use a Node version manager like `nvm`

**Version conflicts**
- Clear yarn cache: `yarn cache clean`
- Delete `node_modules` and `yarn.lock`, then reinstall

### Getting Help

- **Tool help:** `yarn map-gl-style-build --help`
- **Create templates help:** `yarn create-layer-templates --help`
- **GitHub repository:** [mizmay/map-gl-style-build](https://github.com/mizmay/map-gl-style-build)

