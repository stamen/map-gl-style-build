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

### 4. Add or Adjust Style Variables

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