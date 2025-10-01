#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { mergeOverrides } from './merge-overrides';

/**
 * Check if a file exists
 *
 * @param {string} path - the file path
 * @return {boolean} whether the file exists
 */
const fileExists = path => {
  try {
    fs.accessSync(path, fs.constants.R_OK);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Determine whether a value is or contains undefined within it
 *
 * @param {*} v - the value to check
 * @returns {boolean|array}
 */
const findUndefined = v => {
  if (v == undefined) return true;

  // For objects and arrays, we want to know the keys/indices
  // that contain undefined values
  if (typeof v === 'object' || Array.isArray(v)) {
    const undefinedValues = Object.keys(v)
      .map(key => {
        const undefinedProps = findUndefined(v[key]);
        if (!undefinedProps) return null;

        // This is the leaf node, just return the key
        if (typeof undefinedProps === 'boolean') return key;

        // Undefined properties are deeper, include key and further branches
        return { [key]: undefinedProps };
      })
      .filter(v => !!v);

    return undefinedValues.length ? undefinedValues : false;
  }

  return false;
};

/**
 * Check built layer for validity
 *
 * @param {object} layer - the layer to check
 * @returns {array} an array of validation messages
 */
const validateLayer = layer => {
  let messages = [];

  const undefinedProps = findUndefined(layer);
  if (undefinedProps?.length) {
    messages = [
      ...messages,
      ...undefinedProps.map(undefinedProp => {
        return `Undefined property at ${JSON.stringify(undefinedProp)}`;
      })
    ];
  }

  return messages;
};

/**
 * Get a useful error message when something goes wrong while building a layer
 *
 * Avoid stack traces, try to find error description and line in the layer file.
 *
 * @param {Error} error - the error object thrown
 * @param {string} name - the layer name
 * @param {string} path - the file path to the layer
 * @returns {string}
 */
const getLayerBuildErrorMessage = (error, name, path) => {
  const { stack } = error;

  // Get first "at" line of stack trace, split : to get line number
  const lineNumber = stack.split('\n')[1].split(':')[1];

  // Load file and get the line at the given lineNumber
  const layerFile = fs.readFileSync(path, 'utf8');
  const layerLine = layerFile.split('\n')[lineNumber - 1];

  return `${chalk.red.bold('Error:')} Couldn't build layer ${chalk.blue(name)}.

Details: ${error.message} in
  ${chalk.blue(path)}

${lineNumber}: ${layerLine}`;
};

/**
 * Nicely format a file does not exist error message
 *
 * @param {string} fileType - 'layer' or 'style'
 * @param {string} name - the name of the file being loaded
 * @param {string} path - the file path being loaded
 * @returns {string}
 */
const getFileDoesNotExistMessage = (fileType, name, path) => {
  return `\n${chalk.red.bold('Error:')} Couldn't load ${fileType} ${chalk.blue(
    name
  )}, does it exist? Attempted to load from
  ${chalk.blue(path)}
`;
};

/**
 * Nicely format a file error message
 *
 * @param {string} fileType - 'layer' or 'style'
 * @param {string} name - the name of the file being loaded
 * @param {string} path - the file path being loaded
 * @param {string} error - the error message
 * @returns {string}
 */
const getFileErrorMessage = (fileType, name, path, error) => {
  return `\n${chalk.red.bold('Error:')} Couldn't load ${fileType} ${chalk.blue(
    name
  )}. Received this error:

${chalk.red(error.stack)}
`;
};

/**
 * Nicely format and log validation messages for style layers
 *
 * @param {object} validationMessages - the validation messages, keyed by layer name
 * @returns {Void}
 */
const logLayerValidationMessages = validationMessages => {
  Object.keys(validationMessages).forEach(layer => {
    console.warn(`  Layer ${chalk.blue(layer)}:`);
    validationMessages[layer].forEach(message => {
      console.warn(`    ${message}`);
    });
  });

  console.warn('');
};

/**
 * Load the function that will build the layer.
 *
 * @param {string} name - the layer name
 * @param {string} path - the file path to the layer
 * @returns {function} the layer builder
 */
const loadLayerBuilder = (name, path) => {
  if (!fileExists(path)) {
    throw new Error(getFileDoesNotExistMessage('layer', name, path));
  }

  try {
    return require(path).default;
  } catch (error) {
    throw new Error(getFileErrorMessage('layer', name, path, error));
  }
};

/**
 * Load a style, wrapped here to catch and format errors.
 *
 * @param {string} path - the file path to the style
 * @param {string} name - the style name
 * @returns {object}
 */
const loadStyle = (name, path) => {
  if (!fileExists(path)) {
    throw new Error(getFileDoesNotExistMessage('style', name, path));
  }

  try {
    return require(path);
  } catch (error) {
    throw new Error(getFileErrorMessage('style', name, path, error));
  }
};

/**
 * Build a layer
 *
 * @param {object} context - the context, which contains variables for the layer
 * @param {string} name - the layer name
 * @param {string} path - the file path to the layer
 * @returns {object}
 */
const buildLayer = (context, name, path) => {
  const builder = loadLayerBuilder(name, path);

  let layer;
  try {
    layer = builder(context);
  } catch (error) {
    throw new Error(getLayerBuildErrorMessage(error, name, path));
  }

  return {
    layer: mergeOverrides(layer.baseStyle, layer.overrides)
  };
};

/**
 * Build style
 *
 * @param {string} name - the name of the style being built
 * @param {string} absoluteStylePath - the input directory that contains styles
 * @param {string} layerDir - the input directory that contains layers
 * @returns {Object}
 */
export const buildStyle = (name, absoluteStylePath, layerDir, options = {}) => {
  if (!absoluteStylePath) {
    throw new Error('Must provide absoluteStylePath.');
  }
  if (!layerDir) {
    throw new Error('Must provide layerDir.');
  }

  const verbose = options?.verbose ?? false;

  const { context, template } = loadStyle(
    name,
    path.resolve(absoluteStylePath)
  );

  const styleJson = JSON.parse(JSON.stringify(template));

  let validationMessages = {};

  if (verbose) {
    console.log(`Building style ${chalk.blue(name)}`);
  }

  styleJson.layers = template.layers.map(layerName => {
    if (verbose) {
      console.log(`  Adding layer ${chalk.blue(layerName)}`);
    }

    const layerPath = path.resolve(layerDir, `${layerName}.js`);
    const { layer } = buildLayer(context, layerName, layerPath);

    // Collect validation messages for each layer
    const layerValidationMessages = validateLayer(layer);
    if (layerValidationMessages.length) {
      validationMessages[layerName] = layerValidationMessages;
    }

    return layer;
  });

  if (Object.keys(validationMessages).length > 0) {
    console.warn(`Found issues in style ${chalk.blue(name)}:`);
    logLayerValidationMessages(validationMessages);
  }

  return { styleJson };
};
