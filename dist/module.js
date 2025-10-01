import * as $5OpyM$fs from "fs";
import * as $5OpyM$path from "path";
import * as $5OpyM$chalk from "chalk";
import * as $5OpyM$lodashclonedeep from "lodash.clonedeep";
import * as $5OpyM$lodashisplainobject from "lodash.isplainobject";
import * as $5OpyM$lodashisempty from "lodash.isempty";
import {exit as $5OpyM$exit} from "process";
import * as $5OpyM$fastglob from "fast-glob";
import {format as $5OpyM$format} from "map-gl-style-format";
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
Object.defineProperty($cf838c15c8b009ba$exports, "buildStyles", {
    enumerable: true,
    get: function get() {
        return $7644158462f3e818$exports.buildStyles;
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


var $7644158462f3e818$exports = {};
"use strict";

function $7644158462f3e818$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $7644158462f3e818$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $7644158462f3e818$var$_typeof(obj1);
}
Object.defineProperty($7644158462f3e818$exports, "__esModule", {
    value: true
});
$7644158462f3e818$exports.buildStyles = void 0;
function $7644158462f3e818$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $7644158462f3e818$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    };
    var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err1) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value1 = result.value;
                return value1 && "object" == $7644158462f3e818$var$_typeof(value1) && hasOwn.call(value1, "__await") ? PromiseImpl.resolve(value1.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value1).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next1 = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next1.next = next1;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key1 in object)keys.push(key1);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports;
}
function $7644158462f3e818$var$_toConsumableArray(arr) {
    return $7644158462f3e818$var$_arrayWithoutHoles(arr) || $7644158462f3e818$var$_iterableToArray(arr) || $7644158462f3e818$var$_unsupportedIterableToArray(arr) || $7644158462f3e818$var$_nonIterableSpread();
}
function $7644158462f3e818$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $7644158462f3e818$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $7644158462f3e818$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $7644158462f3e818$var$_arrayLikeToArray(arr);
}
function $7644158462f3e818$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $7644158462f3e818$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function $7644158462f3e818$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $7644158462f3e818$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $7644158462f3e818$var$_arrayLikeToArray(o, minLen);
}
function $7644158462f3e818$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $7644158462f3e818$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $7644158462f3e818$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $7644158462f3e818$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $7644158462f3e818$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}




var $7644158462f3e818$var$format = $5OpyM$format;

var $7644158462f3e818$var$buildStyle = $5c3f8fbf0bc952bf$exports.buildStyle;
var $7644158462f3e818$var$buildStyles = /*#__PURE__*/ function() {
    var _ref = $7644158462f3e818$var$_asyncToGenerator(/*#__PURE__*/ $7644158462f3e818$var$_regeneratorRuntime().mark(function _callee(styleDir, layerDir, outputDir) {
        var options, includeExcludePaths, stylePaths, _iterator, _step, _loop1, _args2 = arguments;
        return $7644158462f3e818$var$_regeneratorRuntime().wrap(function _callee$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    options = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
                    includeExcludePaths = options.includeExcludePaths;
                    _context2.next = 4;
                    return $5OpyM$fastglob([
                        $5OpyM$resolve("".concat(styleDir, "/**/*.js"))
                    ]);
                case 4:
                    stylePaths = _context2.sent;
                    _iterator = $7644158462f3e818$var$_createForOfIteratorHelper(includeExcludePaths);
                    _context2.prev = 6;
                    _loop1 = /*#__PURE__*/ $7644158462f3e818$var$_regeneratorRuntime().mark(function _loop() {
                        var includeExcludePath, flag, pathPattern, excludePaths, includePaths;
                        return $7644158462f3e818$var$_regeneratorRuntime().wrap(function _loop$(_context) {
                            while(true)switch(_context.prev = _context.next){
                                case 0:
                                    includeExcludePath = _step.value;
                                    flag = includeExcludePath.flag, pathPattern = includeExcludePath.pathPattern;
                                    _context.t0 = flag;
                                    _context.next = _context.t0 === "exclude" ? 5 : _context.t0 === "include" ? 10 : 15;
                                    break;
                                case 5:
                                    _context.next = 7;
                                    return $5OpyM$fastglob([
                                        $5OpyM$resolve(pathPattern)
                                    ]);
                                case 7:
                                    excludePaths = _context.sent;
                                    stylePaths = stylePaths.filter(function(sp) {
                                        return !excludePaths.includes(sp);
                                    });
                                    return _context.abrupt("break", 15);
                                case 10:
                                    _context.next = 12;
                                    return $5OpyM$fastglob([
                                        $5OpyM$resolve(pathPattern)
                                    ]);
                                case 12:
                                    includePaths = _context.sent;
                                    stylePaths = $7644158462f3e818$var$_toConsumableArray(new Set(stylePaths.concat(includePaths)));
                                    return _context.abrupt("break", 15);
                                case 15:
                                case "end":
                                    return _context.stop();
                            }
                        }, _loop);
                    });
                    _iterator.s();
                case 9:
                    if ((_step = _iterator.n()).done) {
                        _context2.next = 13;
                        break;
                    }
                    return _context2.delegateYield(_loop1(), "t0", 11);
                case 11:
                    _context2.next = 9;
                    break;
                case 13:
                    _context2.next = 18;
                    break;
                case 15:
                    _context2.prev = 15;
                    _context2.t1 = _context2["catch"](6);
                    _iterator.e(_context2.t1);
                case 18:
                    _context2.prev = 18;
                    _iterator.f();
                    return _context2.finish(18);
                case 21:
                    stylePaths.forEach(function(absoluteStylePath) {
                        var relativePath = $5OpyM$relative(styleDir, absoluteStylePath);
                        var _path$parse = $5OpyM$parse(relativePath), dir = _path$parse.dir, name = _path$parse.name;
                        var styleOutputDir = $5OpyM$resolve(outputDir, dir, name);
                        if (!$5OpyM$existsSync(styleOutputDir)) $5OpyM$mkdirSync(styleOutputDir, {
                            recursive: true
                        });
                        try {
                            // Passing in the relativePath as the style name so users can easily find issues
                            var _buildStyle = $7644158462f3e818$var$buildStyle(relativePath, absoluteStylePath, layerDir, options), builtStyle = _buildStyle.styleJson;
                            builtStyle = $7644158462f3e818$var$format(builtStyle);
                            $5OpyM$writeFileSync($5OpyM$resolve(styleOutputDir, "style.json"), builtStyle);
                        } catch (e) {
                            // We catch errors here rather than the default, which
                            // prints stack traces
                            console.error(e.message);
                            $5OpyM$exit(1);
                        }
                    });
                    console.log("");
                case 23:
                case "end":
                    return _context2.stop();
            }
        }, _callee, null, [
            [
                6,
                15,
                18,
                21
            ]
        ]);
    }));
    return function buildStyles(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
$7644158462f3e818$exports.buildStyles = $7644158462f3e818$var$buildStyles;



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
