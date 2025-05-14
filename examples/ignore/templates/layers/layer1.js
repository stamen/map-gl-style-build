module.exports.default = (context) => {
  const baseStyle = {
    "id": "land",
    "type": "background",
    "paint": {
      "background-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        8,
        context.colors.backgroundLow,
        16,
        context.colors.backgroundHigh
      ]
    }
  };

  let overrides = {};

  return {
    baseStyle,
    overrides
  };
};
