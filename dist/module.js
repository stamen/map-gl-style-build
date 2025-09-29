import * as $5OpyM$fs from "fs";
import * as $5OpyM$path from "path";
import * as $5OpyM$chalk from "chalk";
import * as $5OpyM$lodashclonedeep from "lodash.clonedeep";
import * as $5OpyM$lodashisplainobject from "lodash.isplainobject";
import * as $5OpyM$lodashisempty from "lodash.isempty";
import * as $5OpyM$jsonstringifyprettycompact from "json-stringify-pretty-compact";
import {latest as $5OpyM$latest} from "@mapbox/mapbox-gl-style-spec";

var $cf838c15c8b009ba$exports = {};
"use strict";
Object.defineProperty($cf838c15c8b009ba$exports, "__esModule", {
    value: true
});
Object.defineProperty($cf838c15c8b009ba$exports, "buildStyle", {
    enumerable: true,
    get: function get() {
        return $5c3f8fbf0bc952bf$exports.buildStyle;
    }
});
Object.defineProperty($cf838c15c8b009ba$exports, "createLayerTemplate", {
    enumerable: true,
    get: function get() {
        return $3248a428367b7c32$exports.createLayerTemplate;
    }
});
Object.defineProperty($cf838c15c8b009ba$exports, "createVariantTemplate", {
    enumerable: true,
    get: function get() {
        return $3248a428367b7c32$exports.createVariantTemplate;
    }
});
Object.defineProperty($cf838c15c8b009ba$exports, "mergeOverrides", {
    enumerable: true,
    get: function get() {
        return $6f6b0a3fd84dd156$exports.mergeOverrides;
    }
});
Object.defineProperty($cf838c15c8b009ba$exports, "mergeVariables", {
    enumerable: true,
    get: function get() {
        return $810f112ff77b3238$exports.mergeVariables;
    }
});
Object.defineProperty($cf838c15c8b009ba$exports, "modifyNumberVariables", {
    enumerable: true,
    get: function get() {
        return $a28de5cf82661a69$exports.modifyNumberVariables;
    }
});
var $5c3f8fbf0bc952bf$exports = {};
"use strict";
Object.defineProperty($5c3f8fbf0bc952bf$exports, "__esModule", {
    value: true
});
$5c3f8fbf0bc952bf$exports.buildStyle = void 0;

var $5c3f8fbf0bc952bf$var$_fs = $5c3f8fbf0bc952bf$var$_interopRequireDefault($5OpyM$fs);

var $5c3f8fbf0bc952bf$var$_path = $5c3f8fbf0bc952bf$var$_interopRequireDefault($5OpyM$path);

var $5c3f8fbf0bc952bf$var$_chalk = $5c3f8fbf0bc952bf$var$_interopRequireDefault($5OpyM$chalk);

var $5c3f8fbf0bc952bf$var$_lodash = $5c3f8fbf0bc952bf$var$_interopRequireDefault($5OpyM$lodashclonedeep);

var $5c3f8fbf0bc952bf$var$_lodash2 = $5c3f8fbf0bc952bf$var$_interopRequireDefault($5OpyM$lodashisplainobject);
var $40eefc352541bd70$exports = {};
"use strict";
Object.defineProperty($40eefc352541bd70$exports, "__esModule", {
    value: true
});
$40eefc352541bd70$exports.removeEmpty = $40eefc352541bd70$exports.deleteProp = void 0;

var $40eefc352541bd70$var$_lodash = $40eefc352541bd70$var$_interopRequireDefault($5OpyM$lodashisplainobject);

var $40eefc352541bd70$var$_lodash2 = $40eefc352541bd70$var$_interopRequireDefault($5OpyM$lodashisempty);
function $40eefc352541bd70$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
// Helper functions for unused context
var $40eefc352541bd70$var$deleteProp = function deleteProp(object, path) {
    var last = path.pop();
    var next = JSON.parse(JSON.stringify(object));
    delete path.reduce(function(o, k) {
        return o[k] || {};
    }, next)[last];
    return next;
};
$40eefc352541bd70$exports.deleteProp = $40eefc352541bd70$var$deleteProp;
var $40eefc352541bd70$var$removeEmpty = function removeEmpty1(o) {
    for(var k in o){
        if (!o[k] || !(0, $40eefc352541bd70$var$_lodash["default"])(o[k])) continue;
        removeEmpty1(o[k]);
        if ((0, $40eefc352541bd70$var$_lodash2["default"])(o[k])) delete o[k];
    }
    return o;
};
$40eefc352541bd70$exports.removeEmpty = $40eefc352541bd70$var$removeEmpty;


var $6f6b0a3fd84dd156$exports = {};
"use strict";
function $6f6b0a3fd84dd156$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $6f6b0a3fd84dd156$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $6f6b0a3fd84dd156$var$_typeof(obj1);
}
Object.defineProperty($6f6b0a3fd84dd156$exports, "__esModule", {
    value: true
});
$6f6b0a3fd84dd156$exports.mergeOverrides = void 0;

var $6f6b0a3fd84dd156$var$_lodash = $6f6b0a3fd84dd156$var$_interopRequireDefault($5OpyM$lodashclonedeep);
function $6f6b0a3fd84dd156$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $6f6b0a3fd84dd156$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $6f6b0a3fd84dd156$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $6f6b0a3fd84dd156$var$ownKeys(Object(source), !0).forEach(function(key) {
            $6f6b0a3fd84dd156$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $6f6b0a3fd84dd156$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $6f6b0a3fd84dd156$var$_defineProperty(obj, key, value) {
    key = $6f6b0a3fd84dd156$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $6f6b0a3fd84dd156$var$_toPropertyKey(arg) {
    var key = $6f6b0a3fd84dd156$var$_toPrimitive(arg, "string");
    return $6f6b0a3fd84dd156$var$_typeof(key) === "symbol" ? key : String(key);
}
function $6f6b0a3fd84dd156$var$_toPrimitive(input, hint) {
    if ($6f6b0a3fd84dd156$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($6f6b0a3fd84dd156$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $6f6b0a3fd84dd156$var$_slicedToArray(arr, i) {
    return $6f6b0a3fd84dd156$var$_arrayWithHoles(arr) || $6f6b0a3fd84dd156$var$_iterableToArrayLimit(arr, i) || $6f6b0a3fd84dd156$var$_unsupportedIterableToArray(arr, i) || $6f6b0a3fd84dd156$var$_nonIterableRest();
}
function $6f6b0a3fd84dd156$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $6f6b0a3fd84dd156$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $6f6b0a3fd84dd156$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $6f6b0a3fd84dd156$var$_arrayLikeToArray(o, minLen);
}
function $6f6b0a3fd84dd156$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $6f6b0a3fd84dd156$var$_iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for(; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
            _d = !0, _e = err;
        } finally{
            try {
                if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}
function $6f6b0a3fd84dd156$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
/**
 * Merge overrides with a baseStyle or other overrides
 *
 * paint and layout overrides do not fully overwrite paint and layout values in
 * the baseStyle, however, they add or replaces specific properties. In this
 * way, an overrides object can specify a single paint property to modify or add
 * without overwriting all of the paint properties of the baseStyle.
 *
 * @param {object} baseStyle
 * @param {object} overrides
 * @returns {object}
 */ var $6f6b0a3fd84dd156$var$mergeOverrides = function mergeOverrides(baseStyle, overrides) {
    var extended = (0, $6f6b0a3fd84dd156$var$_lodash["default"])(baseStyle);
    Object.entries(overrides).forEach(function(_ref) {
        var _ref2 = $6f6b0a3fd84dd156$var$_slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
        if (k === "layout" || k === "paint") extended[k] = $6f6b0a3fd84dd156$var$_objectSpread($6f6b0a3fd84dd156$var$_objectSpread({}, extended[k]), v);
        else extended[k] = v;
    });
    return extended;
};
$6f6b0a3fd84dd156$exports.mergeOverrides = $6f6b0a3fd84dd156$var$mergeOverrides;


function $5c3f8fbf0bc952bf$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $5c3f8fbf0bc952bf$var$_toConsumableArray(arr) {
    return $5c3f8fbf0bc952bf$var$_arrayWithoutHoles(arr) || $5c3f8fbf0bc952bf$var$_iterableToArray(arr) || $5c3f8fbf0bc952bf$var$_unsupportedIterableToArray(arr) || $5c3f8fbf0bc952bf$var$_nonIterableSpread();
}
function $5c3f8fbf0bc952bf$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $5c3f8fbf0bc952bf$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $5c3f8fbf0bc952bf$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $5c3f8fbf0bc952bf$var$_arrayLikeToArray(o, minLen);
}
function $5c3f8fbf0bc952bf$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $5c3f8fbf0bc952bf$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $5c3f8fbf0bc952bf$var$_arrayLikeToArray(arr);
}
function $5c3f8fbf0bc952bf$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $5c3f8fbf0bc952bf$var$_defineProperty(obj, key, value) {
    key = $5c3f8fbf0bc952bf$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $5c3f8fbf0bc952bf$var$_toPropertyKey(arg) {
    var key = $5c3f8fbf0bc952bf$var$_toPrimitive(arg, "string");
    return $5c3f8fbf0bc952bf$var$_typeof(key) === "symbol" ? key : String(key);
}
function $5c3f8fbf0bc952bf$var$_toPrimitive(input, hint) {
    if ($5c3f8fbf0bc952bf$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($5c3f8fbf0bc952bf$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $5c3f8fbf0bc952bf$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $5c3f8fbf0bc952bf$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $5c3f8fbf0bc952bf$var$_typeof(obj1);
}
/**
 * Check if a file exists
 *
 * @param {string} path - the file path
 * @return {boolean} whether the file exists
 */ var $5c3f8fbf0bc952bf$var$fileExists = function fileExists(path) {
    try {
        $5c3f8fbf0bc952bf$var$_fs["default"].accessSync(path, $5c3f8fbf0bc952bf$var$_fs["default"].constants.R_OK);
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
 */ var $5c3f8fbf0bc952bf$var$findUndefined = function findUndefined1(v1) {
    if (v1 == undefined) return true;
    // For objects and arrays, we want to know the keys/indices
    // that contain undefined values
    if ($5c3f8fbf0bc952bf$var$_typeof(v1) === "object" || Array.isArray(v1)) {
        var undefinedValues = Object.keys(v1).map(function(key) {
            var undefinedProps = findUndefined1(v1[key]);
            if (!undefinedProps) return null;
            // This is the leaf node, just return the key
            if (typeof undefinedProps === "boolean") return key;
            // Undefined properties are deeper, include key and further branches
            return $5c3f8fbf0bc952bf$var$_defineProperty({}, key, undefinedProps);
        }).filter(function(v) {
            return !!v;
        });
        return undefinedValues.length ? undefinedValues : false;
    }
    return false;
};
/**
 * Check built layer for validity
 *
 * @param {object} layer - the layer to check
 * @returns {array} an array of validation messages
 */ var $5c3f8fbf0bc952bf$var$validateLayer = function validateLayer(layer) {
    var messages = [];
    var undefinedProps = $5c3f8fbf0bc952bf$var$findUndefined(layer);
    if (undefinedProps !== null && undefinedProps !== void 0 && undefinedProps.length) messages = [].concat($5c3f8fbf0bc952bf$var$_toConsumableArray(messages), $5c3f8fbf0bc952bf$var$_toConsumableArray(undefinedProps.map(function(undefinedProp) {
        return "Undefined property at ".concat(JSON.stringify(undefinedProp));
    })));
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
 */ var $5c3f8fbf0bc952bf$var$getLayerBuildErrorMessage = function getLayerBuildErrorMessage(error, name, path) {
    var stack = error.stack;
    // Get first "at" line of stack trace, split : to get line number
    var lineNumber = stack.split("\n")[1].split(":")[1];
    // Load file and get the line at the given lineNumber
    var layerFile = $5c3f8fbf0bc952bf$var$_fs["default"].readFileSync(path, "utf8");
    var layerLine = layerFile.split("\n")[lineNumber - 1];
    return "".concat($5c3f8fbf0bc952bf$var$_chalk["default"].red.bold("Error:"), " Couldn't build layer ").concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(name), ".\n\nDetails: ").concat(error.message, " in\n  ").concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(path), "\n\n").concat(lineNumber, ": ").concat(layerLine);
};
/**
 * Nicely format a file does not exist error message
 *
 * @param {string} fileType - 'layer' or 'style'
 * @param {string} name - the name of the file being loaded
 * @param {string} path - the file path being loaded
 * @returns {string}
 */ var $5c3f8fbf0bc952bf$var$getFileDoesNotExistMessage = function getFileDoesNotExistMessage(fileType, name, path) {
    return "\n".concat($5c3f8fbf0bc952bf$var$_chalk["default"].red.bold("Error:"), " Couldn't load ").concat(fileType, " ").concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(name), ", does it exist? Attempted to load from\n  ").concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(path), "\n");
};
/**
 * Nicely format a file error message
 *
 * @param {string} fileType - 'layer' or 'style'
 * @param {string} name - the name of the file being loaded
 * @param {string} path - the file path being loaded
 * @param {string} error - the error message
 * @returns {string}
 */ var $5c3f8fbf0bc952bf$var$getFileErrorMessage = function getFileErrorMessage(fileType, name, path, error) {
    return "\n".concat($5c3f8fbf0bc952bf$var$_chalk["default"].red.bold("Error:"), " Couldn't load ").concat(fileType, " ").concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(name), ". Received this error:\n\n").concat($5c3f8fbf0bc952bf$var$_chalk["default"].red(error.stack), "\n");
};
/**
 * Nicely format and log validation messages for style layers
 *
 * @param {object} validationMessages - the validation messages, keyed by layer name
 * @returns {Void}
 */ var $5c3f8fbf0bc952bf$var$logLayerValidationMessages = function logLayerValidationMessages(validationMessages) {
    Object.keys(validationMessages).forEach(function(layer) {
        console.warn("  Layer ".concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(layer), ":"));
        validationMessages[layer].forEach(function(message) {
            console.warn("    ".concat(message));
        });
    });
    console.warn("");
};
/**
 * Load the function that will build the layer.
 *
 * @param {string} name - the layer name
 * @param {string} path - the file path to the layer
 * @returns {function} the layer builder
 */ var $5c3f8fbf0bc952bf$var$loadLayerBuilder = function loadLayerBuilder(name, path) {
    if (!$5c3f8fbf0bc952bf$var$fileExists(path)) throw new Error($5c3f8fbf0bc952bf$var$getFileDoesNotExistMessage("layer", name, path));
    try {
        return require(path)["default"];
    } catch (error) {
        throw new Error($5c3f8fbf0bc952bf$var$getFileErrorMessage("layer", name, path, error));
    }
};
/**
 * Load a style, wrapped here to catch and format errors.
 *
 * @param {string} path - the file path to the style
 * @param {string} name - the style name
 * @returns {object}
 */ var $5c3f8fbf0bc952bf$var$loadStyle = function loadStyle(name, path) {
    if (!$5c3f8fbf0bc952bf$var$fileExists(path)) throw new Error($5c3f8fbf0bc952bf$var$getFileDoesNotExistMessage("style", name, path));
    try {
        return require(path);
    } catch (error) {
        throw new Error($5c3f8fbf0bc952bf$var$getFileErrorMessage("style", name, path, error));
    }
};
/**
 * Build a layer
 *
 * @param {object} context - the context, which contains variables for the layer
 * @param {string} name - the layer name
 * @param {string} path - the file path to the layer
 * @returns {object}
 */ var $5c3f8fbf0bc952bf$var$buildLayer = function buildLayer(context, name, path) {
    var builder = $5c3f8fbf0bc952bf$var$loadLayerBuilder(name, path);
    var layer;
    try {
        layer = builder(context);
    } catch (error) {
        throw new Error($5c3f8fbf0bc952bf$var$getLayerBuildErrorMessage(error, name, path));
    }
    return {
        layer: (0, $6f6b0a3fd84dd156$exports.mergeOverrides)(layer.baseStyle, layer.overrides)
    };
};
/**
 * Build style
 *
 * @param {string} name - the name of the style being built
 * @param {string} absoluteStylePath - the input directory that contains styles
 * @param {string} layerDir - the input directory that contains layers
 * @returns {Object}
 */ var $5c3f8fbf0bc952bf$var$buildStyle = function buildStyle(name, absoluteStylePath, layerDir) {
    var _options$verbose;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!absoluteStylePath) throw new Error("Must provide absoluteStylePath.");
    if (!layerDir) throw new Error("Must provide layerDir.");
    var verbose = (_options$verbose = options === null || options === void 0 ? void 0 : options.verbose) !== null && _options$verbose !== void 0 ? _options$verbose : false;
    var _loadStyle = $5c3f8fbf0bc952bf$var$loadStyle(name, $5c3f8fbf0bc952bf$var$_path["default"].resolve(absoluteStylePath)), context = _loadStyle.context, template = _loadStyle.template;
    var styleJson = JSON.parse(JSON.stringify(template));
    var validationMessages = {};
    if (verbose) console.log("Building style ".concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(name)));
    styleJson.layers = template.layers.map(function(layerName) {
        if (verbose) console.log("  Adding layer ".concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(layerName)));
        var layerPath = $5c3f8fbf0bc952bf$var$_path["default"].resolve(layerDir, "".concat(layerName, ".js"));
        var _buildLayer = $5c3f8fbf0bc952bf$var$buildLayer(context, layerName, layerPath), layer = _buildLayer.layer;
        // Collect validation messages for each layer
        var layerValidationMessages = $5c3f8fbf0bc952bf$var$validateLayer(layer);
        if (layerValidationMessages.length) validationMessages[layerName] = layerValidationMessages;
        return layer;
    });
    if (Object.keys(validationMessages).length > 0) {
        console.warn("Found issues in style ".concat($5c3f8fbf0bc952bf$var$_chalk["default"].blue(name), ":"));
        $5c3f8fbf0bc952bf$var$logLayerValidationMessages(validationMessages);
    }
    // Flattens nested object to be one level with keys using periods to represent nesting
    var flattenObject1 = function flattenObject(obj) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        return Object.keys(obj).reduce(function(acc, k) {
            var pre = prefix.length ? prefix + "." : "";
            if ((0, $5c3f8fbf0bc952bf$var$_lodash2["default"])(obj[k])) Object.assign(acc, flattenObject(obj[k], pre + k));
            else acc[pre + k] = obj[k];
            return acc;
        }, {});
    };
    return {
        styleJson: styleJson
    };
};
$5c3f8fbf0bc952bf$exports.buildStyle = $5c3f8fbf0bc952bf$var$buildStyle;



var $810f112ff77b3238$exports = {};
"use strict";
Object.defineProperty($810f112ff77b3238$exports, "__esModule", {
    value: true
});
$810f112ff77b3238$exports.mergeVariables = void 0;
function $810f112ff77b3238$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $810f112ff77b3238$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $810f112ff77b3238$var$_typeof(obj1);
}
var $810f112ff77b3238$var$isObject = function isObject(v) {
    return $810f112ff77b3238$var$_typeof(v) === "object" && !Array.isArray(v) && !!v;
};
/**
 * Merge the current object of variables with an extender object. Variables
 * defined in extender will override variables defined in the current variables,
 * if there is overlap. Nested variables are taken into account.
 * @param {Object} current - the original variable object
 * @param {Object} extender - the extender variable object, containing overrides
 * @returns {Object} - the merged variables
 */ var $810f112ff77b3238$var$merge = function merge1(current, extender) {
    var merged = JSON.parse(JSON.stringify(current));
    Object.keys(extender).forEach(function(k) {
        // Handle nested variables
        if ($810f112ff77b3238$var$isObject(current[k]) && $810f112ff77b3238$var$isObject(extender[k])) merged[k] = merge1(current[k], extender[k]);
        else merged[k] = JSON.parse(JSON.stringify(extender[k]));
    });
    return merged;
};
/**
 * Merge any number of variable objects
 * @param {...Object} variableGroups - one or many variable objects, each 
 * passed as a separate parameter
 * @returns {Object} the merged variable object
 */ var $810f112ff77b3238$var$mergeVariables = function mergeVariables() {
    for(var _len = arguments.length, variableGroups = new Array(_len), _key = 0; _key < _len; _key++)variableGroups[_key] = arguments[_key];
    return variableGroups.reduce(function(acc, cur) {
        return $810f112ff77b3238$var$merge(acc, cur);
    }, {});
};
$810f112ff77b3238$exports.mergeVariables = $810f112ff77b3238$var$mergeVariables;


var $a28de5cf82661a69$exports = {};
"use strict";
Object.defineProperty($a28de5cf82661a69$exports, "__esModule", {
    value: true
});
$a28de5cf82661a69$exports.modifyNumberVariables = void 0;
function $a28de5cf82661a69$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $a28de5cf82661a69$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $a28de5cf82661a69$var$_typeof(obj1);
}
/**
 * Returns a new function that divides a number by the modifier passed here
 * @param {number} divisor - number to divide by in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $a28de5cf82661a69$var$getDivideFn = function getDivideFn(divisor) {
    return function(num) {
        return num / divisor;
    };
};
/**
 * Returns a new function that subtracts from a number by the modifier passed here
 * @param {number} toSubtract - number to subtract in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $a28de5cf82661a69$var$getSubtractFn = function getSubtractFn(toSubtract) {
    return function(num) {
        return num - toSubtract;
    };
};
/**
 * Returns a new function that adds to a number by the modifier passed here
 * @param {number} toAdd - number to add in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $a28de5cf82661a69$var$getAddFn = function getAddFn(toAdd) {
    return function(num) {
        return num + toAdd;
    };
};
/**
 * Returns a new function that multiplies a number by the modifier passed here
 * @param {number} multiplier - number to multiply by in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $a28de5cf82661a69$var$getMultiplyFn = function getMultiplyFn(multiplier) {
    return function(num) {
        return num * multiplier;
    };
};
/**
 * Modifies the property value after the transform function using options
 * @param {Array|number} value - property value of the variable
 * @param {Object} [options] - options object with keys: round?: boolean, floor?: boolean, ceil?: boolean, toFixed?: number
 * @returns {Array|number} - the modified property values from the options
 */ var $a28de5cf82661a69$var$handleOptions = function handleOptions(value, options) {
    var round = options.round, floor = options.floor, ceil = options.ceil, toFixed = options.toFixed;
    if (round) return Math.round(value);
    if (floor) return Math.floor(value);
    if (ceil) return Math.ceil(value);
    if (toFixed !== undefined) return Number(value.toFixed(toFixed));
    return value;
};
/**
 * Modifies the property value of the variable with the transform function
 * @param {Array|number} propertyValue - property value of the variable
 * @param {Function} fn - function to run the value or expression output values through
 * @param {Object} [options] - options object with keys: round?: boolean, floor?: boolean, ceil?: boolean, toFixed?: number
 * @returns {Array|number} - the modified property values
 */ var $a28de5cf82661a69$var$modifyValue = function modifyValue1(propertyValue, fn, options) {
    if (typeof propertyValue === "number") return $a28de5cf82661a69$var$handleOptions(fn(propertyValue), options);
    if (!Array.isArray(propertyValue)) return propertyValue;
    var expressionType = propertyValue[0];
    var sliceIndex;
    var outputCondition;
    var fallback;
    switch(expressionType){
        case "interpolate":
        case "interpolate-hcl":
        case "interpolate-lab":
            sliceIndex = 3;
            outputCondition = function outputCondition(i) {
                return i % 2 !== 0;
            };
            break;
        case "step":
            sliceIndex = 2;
            outputCondition = function outputCondition(i) {
                return i % 2 === 0;
            };
            break;
        case "case":
            sliceIndex = 1;
            outputCondition = function outputCondition(i) {
                return i % 2 !== 0;
            };
            fallback = propertyValue.pop();
            break;
        case "match":
            sliceIndex = 2;
            outputCondition = function outputCondition(i) {
                return i % 2 !== 0;
            };
            fallback = propertyValue.pop();
            break;
    }
    // Rebuild modified expression
    var nextValue = propertyValue.slice(0, sliceIndex);
    var inputOutputs = propertyValue.slice(sliceIndex);
    inputOutputs.forEach(function(val, i) {
        if (outputCondition(i)) nextValue.push(modifyValue1(val, fn, options));
        else nextValue.push(val);
    });
    if (fallback !== undefined) nextValue.push(modifyValue1(fallback, fn, options));
    return nextValue;
};
/**
 * Recurses the variables object to find the actual property values
 * @param {Object|Array|number} variables - the original variable object or variable
 * @param {Function} fn - function to run the value or expression output values through
 * @param {Object} [options] - options object with keys: round?: boolean, floor?: boolean, ceil?: boolean, toFixed?: number
 * @returns {Object} - the modified variables
 */ var $a28de5cf82661a69$var$replaceVariables = function replaceVariables1(variables, fn, options) {
    if ($a28de5cf82661a69$var$_typeof(variables) !== "object" || Array.isArray(variables)) return $a28de5cf82661a69$var$modifyValue(variables, fn, options);
    return Object.keys(variables).reduce(function(acc, key) {
        acc[key] = replaceVariables1(variables[key], fn, options);
        return acc;
    }, {});
};
/**
 * Modify number values in variables using a math operation
 * @param {Object|Array|number} variables - the original variable object or variable
 * @param {string} operator - Math operation, one of - '*', '/', '+', '-'
 * @param {number} modifier - number argument to modify value by
 * @param {Object} [options] - options object with keys: round?: boolean, floor?: boolean, ceil?: boolean, toFixed?: number
 * @returns {Object} - the modified variables
 */ var $a28de5cf82661a69$var$modifyNumberVariables = function modifyNumberVariables(variables, operator, modifier) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var nextVariables = JSON.parse(JSON.stringify(variables));
    var mathFn = function mathFn(num) {
        return num;
    };
    switch(operator){
        case "*":
            mathFn = $a28de5cf82661a69$var$getMultiplyFn(modifier);
            break;
        case "/":
            mathFn = $a28de5cf82661a69$var$getDivideFn(modifier);
            break;
        case "+":
            mathFn = $a28de5cf82661a69$var$getAddFn(modifier);
            break;
        case "-":
            mathFn = $a28de5cf82661a69$var$getSubtractFn(modifier);
            break;
        default:
            throw new Error("".concat(operator, " is not a valid operator."));
    }
    nextVariables = $a28de5cf82661a69$var$replaceVariables(variables, mathFn, options);
    return nextVariables;
};
$a28de5cf82661a69$exports.modifyNumberVariables = $a28de5cf82661a69$var$modifyNumberVariables;


var $3248a428367b7c32$exports = {};
"use strict";
function $3248a428367b7c32$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $3248a428367b7c32$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $3248a428367b7c32$var$_typeof(obj1);
}
Object.defineProperty($3248a428367b7c32$exports, "__esModule", {
    value: true
});
$3248a428367b7c32$exports.createVariantTemplate = $3248a428367b7c32$exports.createLayerTemplate = void 0;

var $3248a428367b7c32$var$_jsonStringifyPrettyCompact = $3248a428367b7c32$var$_interopRequireDefault($5OpyM$jsonstringifyprettycompact);

function $3248a428367b7c32$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $3248a428367b7c32$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $3248a428367b7c32$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $3248a428367b7c32$var$ownKeys(Object(source), !0).forEach(function(key) {
            $3248a428367b7c32$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $3248a428367b7c32$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $3248a428367b7c32$var$_defineProperty(obj, key, value) {
    key = $3248a428367b7c32$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $3248a428367b7c32$var$_toPropertyKey(arg) {
    var key = $3248a428367b7c32$var$_toPrimitive(arg, "string");
    return $3248a428367b7c32$var$_typeof(key) === "symbol" ? key : String(key);
}
function $3248a428367b7c32$var$_toPrimitive(input, hint) {
    if ($3248a428367b7c32$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($3248a428367b7c32$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $3248a428367b7c32$var$_slicedToArray(arr, i) {
    return $3248a428367b7c32$var$_arrayWithHoles(arr) || $3248a428367b7c32$var$_iterableToArrayLimit(arr, i) || $3248a428367b7c32$var$_unsupportedIterableToArray(arr, i) || $3248a428367b7c32$var$_nonIterableRest();
}
function $3248a428367b7c32$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $3248a428367b7c32$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $3248a428367b7c32$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $3248a428367b7c32$var$_arrayLikeToArray(o, minLen);
}
function $3248a428367b7c32$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $3248a428367b7c32$var$_iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for(; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
            _d = !0, _e = err;
        } finally{
            try {
                if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}
function $3248a428367b7c32$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
var $3248a428367b7c32$var$createLayerTemplate = function createLayerTemplate(baseLayer, variants) {
    var layer = baseLayer;
    if (!layer) layer = Object.values(variants)[0];
    var baseStyle = (0, $3248a428367b7c32$var$_jsonStringifyPrettyCompact["default"])(layer, {
        indent: 2
    }).split("\n").join("\n  ");
    var allOverrides = "";
    // TODO currently making the primary differentiator style id until we sort differences
    var _loop = function _loop() {
        var overrides = {};
        if (layer && Object.keys(variants).length) {
            var variantLayer = variants[styleName];
            Object.entries(variantLayer).forEach(function(_ref) {
                var _ref2 = $3248a428367b7c32$var$_slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
                if (k === "layout" || k === "paint") return;
                if (JSON.stringify(v) === JSON.stringify(layer[k])) return;
                overrides[k] = v;
            });
            if (variantLayer.layout) {
                // If a property does not exist on a variant, override with the default
                var defaultLayout = Object.keys(layer.layout || {}).reduce(function(acc, k) {
                    acc[k] = $5OpyM$latest["layout_".concat(layer.type)][k]["default"];
                    return acc;
                }, {});
                var fullLayout = $3248a428367b7c32$var$_objectSpread($3248a428367b7c32$var$_objectSpread({}, defaultLayout), variantLayer.layout);
                Object.entries(fullLayout).forEach(function(_ref3) {
                    var _layer, _layer$layout;
                    var _ref4 = $3248a428367b7c32$var$_slicedToArray(_ref3, 2), k = _ref4[0], v = _ref4[1];
                    if (JSON.stringify(v) === JSON.stringify((_layer = layer) === null || _layer === void 0 ? void 0 : (_layer$layout = _layer.layout) === null || _layer$layout === void 0 ? void 0 : _layer$layout[k])) return;
                    if (!overrides.layout) overrides.layout = {};
                    overrides.layout[k] = v;
                });
            }
            if (variantLayer.paint) {
                // If a property does not exist on a variant, override with the default
                var defaultPaint = Object.keys(layer.paint || {}).reduce(function(acc, k) {
                    acc[k] = $5OpyM$latest["paint_".concat(layer.type)][k]["default"];
                    return acc;
                }, {});
                var fullPaint = $3248a428367b7c32$var$_objectSpread($3248a428367b7c32$var$_objectSpread({}, defaultPaint), variantLayer.paint);
                Object.entries(fullPaint).forEach(function(_ref5) {
                    var _layer2, _layer2$paint;
                    var _ref6 = $3248a428367b7c32$var$_slicedToArray(_ref5, 2), k = _ref6[0], v = _ref6[1];
                    if (JSON.stringify(v) === JSON.stringify((_layer2 = layer) === null || _layer2 === void 0 ? void 0 : (_layer2$paint = _layer2.paint) === null || _layer2$paint === void 0 ? void 0 : _layer2$paint[k])) return;
                    if (!overrides.paint) overrides.paint = {};
                    overrides.paint[k] = v;
                });
            }
        }
        overrides = (0, $3248a428367b7c32$var$_jsonStringifyPrettyCompact["default"])(overrides, {
            indent: 2
        }).split("\n").join("\n    ");
        allOverrides += "".concat(!!allOverrides ? " else if" : "if", " (context.styleName === '").concat(styleName, "') {\n      overrides = ").concat(overrides, ";\n  }");
    };
    for(var styleName in variants)_loop();
    var fileContent = "module.exports.default = (context) => {\n  const baseStyle = ".concat(baseStyle, ";\n  let overrides = {};\n  ").concat(allOverrides, "\n  return {\n    baseStyle,\n    overrides\n  };\n};");
    return fileContent;
};
$3248a428367b7c32$exports.createLayerTemplate = $3248a428367b7c32$var$createLayerTemplate;
var $3248a428367b7c32$var$createVariantTemplate = function createVariantTemplate(style) {
    var templateStyle = $3248a428367b7c32$var$_objectSpread($3248a428367b7c32$var$_objectSpread({}, style), {}, {
        layers: style.layers.map(function(l) {
            return l.id;
        })
    });
    var fileContent = "module.exports.context = {\n  colors: {\n  },\n  styleName: '".concat(style.name, "'\n};\n\nmodule.exports.template = ").concat(JSON.stringify(templateStyle, null, 2), ";\n");
    return fileContent;
};
$3248a428367b7c32$exports.createVariantTemplate = $3248a428367b7c32$var$createVariantTemplate;




export {$cf838c15c8b009ba$exports as default};
//# sourceMappingURL=module.js.map
