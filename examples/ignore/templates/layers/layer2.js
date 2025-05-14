module.exports.default = (context) => {
  const baseStyle = {
    "id": "road",
    "type": "line",
    "source": context.sources.root,
    "source-layer": "roads",
    "minzoom": 16,
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-width": 5,
      "line-color": context.colors.road
    }
  };

  let overrides = {};

  return {
    baseStyle,
    overrides
  };
};
