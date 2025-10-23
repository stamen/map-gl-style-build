module.exports.context = {
  sources: {
    root: 'Example'
  },
  colors: {
    backgroundLow: 'red',
    backgroundHigh: 'blue',
    road: 'green'
  }
};

module.exports.template = {
  version: 8,
  name: 'ignore-3',
  sources: {
    Example: {
      type: 'vector',
      url: 'https://example.com/source.json'
    }
  },
  sprite: 'https://example.com/sprites/sprite',
  glyphs: 'https://example.com/{fontstack}/{range}.pbf',
  layers: ['layer1', 'layer2'],
  id: 'example-simple'
};
