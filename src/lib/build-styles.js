#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const { format } = require('map-gl-style-format');

const { buildStyle } = require('./build-style');

export const buildStyles = async (
  styleDir,
  layerDir,
  outputDir,
  options = {}
) => {
  const { includeExcludePaths } = options;

  let stylePaths = await fg([path.resolve(`${styleDir}/**/*.js`)]);

  for (const includeExcludePath of includeExcludePaths) {
    const { flag, pathPattern } = includeExcludePath;

    switch (flag) {
      case 'exclude': {
        const excludePaths = await fg([path.resolve(pathPattern)]);
        stylePaths = stylePaths.filter(sp => !excludePaths.includes(sp));
        break;
      }
      case 'include': {
        const includePaths = await fg([path.resolve(pathPattern)]);
        stylePaths = [...new Set(stylePaths.concat(includePaths))];
        break;
      }
      default: {
      }
    }
  }

  stylePaths.forEach(absoluteStylePath => {
    const relativePath = path.relative(styleDir, absoluteStylePath);
    const { dir, name } = path.parse(relativePath);
    const styleOutputDir = path.resolve(outputDir, dir, name);

    if (!fs.existsSync(styleOutputDir)) {
      fs.mkdirSync(styleOutputDir, { recursive: true });
    }

    try {
      // Passing in the relativePath as the style name so users can easily find issues
      let { styleJson: builtStyle } = buildStyle(
        relativePath,
        absoluteStylePath,
        layerDir,
        options
      );
      builtStyle = format(builtStyle);

      fs.writeFileSync(path.resolve(styleOutputDir, 'style.json'), builtStyle);
    } catch (e) {
      // We catch errors here rather than the default, which
      // prints stack traces
      console.error(e.message);
      process.exit(1);
    }
  });

  console.log('');
};
