var $gXNCa$fs = require("fs");
var $gXNCa$path = require("path");
var $gXNCa$chalk = require("chalk");
var $gXNCa$lodashclonedeep = require("lodash.clonedeep");
var $gXNCa$lodashisplainobject = require("lodash.isplainobject");
var $gXNCa$lodashisempty = require("lodash.isempty");
var $gXNCa$jsonstringifyprettycompact = require("json-stringify-pretty-compact");
var $gXNCa$mapboxmapboxglstylespec = require("@mapbox/mapbox-gl-style-spec");

"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
Object.defineProperty(module.exports, "buildStyle", {
    enumerable: true,
    get: function get() {
        return $787eebfbd67e2373$exports.buildStyle;
    }
});
Object.defineProperty(module.exports, "createLayerTemplate", {
    enumerable: true,
    get: function get() {
        return $427613dabbfda056$exports.createLayerTemplate;
    }
});
Object.defineProperty(module.exports, "createVariantTemplate", {
    enumerable: true,
    get: function get() {
        return $427613dabbfda056$exports.createVariantTemplate;
    }
});
Object.defineProperty(module.exports, "mergeOverrides", {
    enumerable: true,
    get: function get() {
        return $7c018e715e9e5e4a$exports.mergeOverrides;
    }
});
Object.defineProperty(module.exports, "mergeVariables", {
    enumerable: true,
    get: function get() {
        return $5d86828d3cc45dbd$exports.mergeVariables;
    }
});
Object.defineProperty(module.exports, "modifyNumberVariables", {
    enumerable: true,
    get: function get() {
        return $420078f6f222ff92$exports.modifyNumberVariables;
    }
});
var $787eebfbd67e2373$exports = {};
"use strict";
Object.defineProperty($787eebfbd67e2373$exports, "__esModule", {
    value: true
});
$787eebfbd67e2373$exports.buildStyle = void 0;

var $787eebfbd67e2373$var$_fs = $787eebfbd67e2373$var$_interopRequireDefault($gXNCa$fs);

var $787eebfbd67e2373$var$_path = $787eebfbd67e2373$var$_interopRequireDefault($gXNCa$path);

var $787eebfbd67e2373$var$_chalk = $787eebfbd67e2373$var$_interopRequireDefault($gXNCa$chalk);

var $787eebfbd67e2373$var$_lodash = $787eebfbd67e2373$var$_interopRequireDefault($gXNCa$lodashclonedeep);

var $787eebfbd67e2373$var$_lodash2 = $787eebfbd67e2373$var$_interopRequireDefault($gXNCa$lodashisplainobject);
var $8e6a350f8ed2b618$exports = {};
"use strict";
Object.defineProperty($8e6a350f8ed2b618$exports, "__esModule", {
    value: true
});
$8e6a350f8ed2b618$exports.removeEmpty = $8e6a350f8ed2b618$exports.deleteProp = void 0;

var $8e6a350f8ed2b618$var$_lodash = $8e6a350f8ed2b618$var$_interopRequireDefault($gXNCa$lodashisplainobject);

var $8e6a350f8ed2b618$var$_lodash2 = $8e6a350f8ed2b618$var$_interopRequireDefault($gXNCa$lodashisempty);
function $8e6a350f8ed2b618$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
// Helper functions for unused context
var $8e6a350f8ed2b618$var$deleteProp = function deleteProp(object, path) {
    var last = path.pop();
    var next = JSON.parse(JSON.stringify(object));
    delete path.reduce(function(o, k) {
        return o[k] || {};
    }, next)[last];
    return next;
};
$8e6a350f8ed2b618$exports.deleteProp = $8e6a350f8ed2b618$var$deleteProp;
var $8e6a350f8ed2b618$var$removeEmpty = function removeEmpty1(o) {
    for(var k in o){
        if (!o[k] || !(0, $8e6a350f8ed2b618$var$_lodash["default"])(o[k])) continue;
        removeEmpty1(o[k]);
        if ((0, $8e6a350f8ed2b618$var$_lodash2["default"])(o[k])) delete o[k];
    }
    return o;
};
$8e6a350f8ed2b618$exports.removeEmpty = $8e6a350f8ed2b618$var$removeEmpty;


var $7c018e715e9e5e4a$exports = {};
"use strict";
function $7c018e715e9e5e4a$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $7c018e715e9e5e4a$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $7c018e715e9e5e4a$var$_typeof(obj1);
}
Object.defineProperty($7c018e715e9e5e4a$exports, "__esModule", {
    value: true
});
$7c018e715e9e5e4a$exports.mergeOverrides = void 0;

var $7c018e715e9e5e4a$var$_lodash = $7c018e715e9e5e4a$var$_interopRequireDefault($gXNCa$lodashclonedeep);
function $7c018e715e9e5e4a$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $7c018e715e9e5e4a$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $7c018e715e9e5e4a$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $7c018e715e9e5e4a$var$ownKeys(Object(source), !0).forEach(function(key) {
            $7c018e715e9e5e4a$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $7c018e715e9e5e4a$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $7c018e715e9e5e4a$var$_defineProperty(obj, key, value) {
    key = $7c018e715e9e5e4a$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $7c018e715e9e5e4a$var$_toPropertyKey(arg) {
    var key = $7c018e715e9e5e4a$var$_toPrimitive(arg, "string");
    return $7c018e715e9e5e4a$var$_typeof(key) === "symbol" ? key : String(key);
}
function $7c018e715e9e5e4a$var$_toPrimitive(input, hint) {
    if ($7c018e715e9e5e4a$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($7c018e715e9e5e4a$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $7c018e715e9e5e4a$var$_slicedToArray(arr, i) {
    return $7c018e715e9e5e4a$var$_arrayWithHoles(arr) || $7c018e715e9e5e4a$var$_iterableToArrayLimit(arr, i) || $7c018e715e9e5e4a$var$_unsupportedIterableToArray(arr, i) || $7c018e715e9e5e4a$var$_nonIterableRest();
}
function $7c018e715e9e5e4a$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $7c018e715e9e5e4a$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $7c018e715e9e5e4a$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $7c018e715e9e5e4a$var$_arrayLikeToArray(o, minLen);
}
function $7c018e715e9e5e4a$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $7c018e715e9e5e4a$var$_iterableToArrayLimit(arr, i) {
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
function $7c018e715e9e5e4a$var$_arrayWithHoles(arr) {
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
 */ var $7c018e715e9e5e4a$var$mergeOverrides = function mergeOverrides(baseStyle, overrides) {
    var extended = (0, $7c018e715e9e5e4a$var$_lodash["default"])(baseStyle);
    Object.entries(overrides).forEach(function(_ref) {
        var _ref2 = $7c018e715e9e5e4a$var$_slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
        if (k === "layout" || k === "paint") extended[k] = $7c018e715e9e5e4a$var$_objectSpread($7c018e715e9e5e4a$var$_objectSpread({}, extended[k]), v);
        else extended[k] = v;
    });
    return extended;
};
$7c018e715e9e5e4a$exports.mergeOverrides = $7c018e715e9e5e4a$var$mergeOverrides;


function $787eebfbd67e2373$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $787eebfbd67e2373$var$_toConsumableArray(arr) {
    return $787eebfbd67e2373$var$_arrayWithoutHoles(arr) || $787eebfbd67e2373$var$_iterableToArray(arr) || $787eebfbd67e2373$var$_unsupportedIterableToArray(arr) || $787eebfbd67e2373$var$_nonIterableSpread();
}
function $787eebfbd67e2373$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $787eebfbd67e2373$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $787eebfbd67e2373$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $787eebfbd67e2373$var$_arrayLikeToArray(o, minLen);
}
function $787eebfbd67e2373$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $787eebfbd67e2373$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $787eebfbd67e2373$var$_arrayLikeToArray(arr);
}
function $787eebfbd67e2373$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $787eebfbd67e2373$var$_defineProperty(obj, key, value) {
    key = $787eebfbd67e2373$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $787eebfbd67e2373$var$_toPropertyKey(arg) {
    var key = $787eebfbd67e2373$var$_toPrimitive(arg, "string");
    return $787eebfbd67e2373$var$_typeof(key) === "symbol" ? key : String(key);
}
function $787eebfbd67e2373$var$_toPrimitive(input, hint) {
    if ($787eebfbd67e2373$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($787eebfbd67e2373$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $787eebfbd67e2373$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $787eebfbd67e2373$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $787eebfbd67e2373$var$_typeof(obj1);
}
/**
 * Check if a file exists
 *
 * @param {string} path - the file path
 * @return {boolean} whether the file exists
 */ var $787eebfbd67e2373$var$fileExists = function fileExists(path) {
    try {
        $787eebfbd67e2373$var$_fs["default"].accessSync(path, $787eebfbd67e2373$var$_fs["default"].constants.R_OK);
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
 */ var $787eebfbd67e2373$var$findUndefined = function findUndefined1(v1) {
    if (v1 == undefined) return true;
    // For objects and arrays, we want to know the keys/indices
    // that contain undefined values
    if ($787eebfbd67e2373$var$_typeof(v1) === "object" || Array.isArray(v1)) {
        var undefinedValues = Object.keys(v1).map(function(key) {
            var undefinedProps = findUndefined1(v1[key]);
            if (!undefinedProps) return null;
            // This is the leaf node, just return the key
            if (typeof undefinedProps === "boolean") return key;
            // Undefined properties are deeper, include key and further branches
            return $787eebfbd67e2373$var$_defineProperty({}, key, undefinedProps);
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
 */ var $787eebfbd67e2373$var$validateLayer = function validateLayer(layer) {
    var messages = [];
    var undefinedProps = $787eebfbd67e2373$var$findUndefined(layer);
    if (undefinedProps !== null && undefinedProps !== void 0 && undefinedProps.length) messages = [].concat($787eebfbd67e2373$var$_toConsumableArray(messages), $787eebfbd67e2373$var$_toConsumableArray(undefinedProps.map(function(undefinedProp) {
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
 */ var $787eebfbd67e2373$var$getLayerBuildErrorMessage = function getLayerBuildErrorMessage(error, name, path) {
    var stack = error.stack;
    // Get first "at" line of stack trace, split : to get line number
    var lineNumber = stack.split("\n")[1].split(":")[1];
    // Load file and get the line at the given lineNumber
    var layerFile = $787eebfbd67e2373$var$_fs["default"].readFileSync(path, "utf8");
    var layerLine = layerFile.split("\n")[lineNumber - 1];
    return "".concat($787eebfbd67e2373$var$_chalk["default"].red.bold("Error:"), " Couldn't build layer ").concat($787eebfbd67e2373$var$_chalk["default"].blue(name), ".\n\nDetails: ").concat(error.message, " in\n  ").concat($787eebfbd67e2373$var$_chalk["default"].blue(path), "\n\n").concat(lineNumber, ": ").concat(layerLine);
};
/**
 * Nicely format a file does not exist error message
 *
 * @param {string} fileType - 'layer' or 'style'
 * @param {string} name - the name of the file being loaded
 * @param {string} path - the file path being loaded
 * @returns {string}
 */ var $787eebfbd67e2373$var$getFileDoesNotExistMessage = function getFileDoesNotExistMessage(fileType, name, path) {
    return "\n".concat($787eebfbd67e2373$var$_chalk["default"].red.bold("Error:"), " Couldn't load ").concat(fileType, " ").concat($787eebfbd67e2373$var$_chalk["default"].blue(name), ", does it exist? Attempted to load from\n  ").concat($787eebfbd67e2373$var$_chalk["default"].blue(path), "\n");
};
/**
 * Nicely format a file error message
 *
 * @param {string} fileType - 'layer' or 'style'
 * @param {string} name - the name of the file being loaded
 * @param {string} path - the file path being loaded
 * @param {string} error - the error message
 * @returns {string}
 */ var $787eebfbd67e2373$var$getFileErrorMessage = function getFileErrorMessage(fileType, name, path, error) {
    return "\n".concat($787eebfbd67e2373$var$_chalk["default"].red.bold("Error:"), " Couldn't load ").concat(fileType, " ").concat($787eebfbd67e2373$var$_chalk["default"].blue(name), ". Received this error:\n\n").concat($787eebfbd67e2373$var$_chalk["default"].red(error.stack), "\n");
};
/**
 * Nicely format and log validation messages for style layers
 *
 * @param {object} validationMessages - the validation messages, keyed by layer name
 * @returns {Void}
 */ var $787eebfbd67e2373$var$logLayerValidationMessages = function logLayerValidationMessages(validationMessages) {
    Object.keys(validationMessages).forEach(function(layer) {
        console.warn("  Layer ".concat($787eebfbd67e2373$var$_chalk["default"].blue(layer), ":"));
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
 */ var $787eebfbd67e2373$var$loadLayerBuilder = function loadLayerBuilder(name, path) {
    if (!$787eebfbd67e2373$var$fileExists(path)) throw new Error($787eebfbd67e2373$var$getFileDoesNotExistMessage("layer", name, path));
    try {
        return require(path)["default"];
    } catch (error) {
        throw new Error($787eebfbd67e2373$var$getFileErrorMessage("layer", name, path, error));
    }
};
/**
 * Load a style, wrapped here to catch and format errors.
 *
 * @param {string} path - the file path to the style
 * @param {string} name - the style name
 * @returns {object}
 */ var $787eebfbd67e2373$var$loadStyle = function loadStyle(name, path) {
    if (!$787eebfbd67e2373$var$fileExists(path)) throw new Error($787eebfbd67e2373$var$getFileDoesNotExistMessage("style", name, path));
    try {
        return require(path);
    } catch (error) {
        throw new Error($787eebfbd67e2373$var$getFileErrorMessage("style", name, path, error));
    }
};
/**
 * Build a layer
 *
 * @param {object} context - the context, which contains variables for the layer
 * @param {string} name - the layer name
 * @param {string} path - the file path to the layer
 * @returns {object}
 */ var $787eebfbd67e2373$var$buildLayer = function buildLayer(context, name, path) {
    var builder = $787eebfbd67e2373$var$loadLayerBuilder(name, path);
    var layer;
    try {
        layer = builder(context);
    } catch (error) {
        throw new Error($787eebfbd67e2373$var$getLayerBuildErrorMessage(error, name, path));
    }
    return {
        layer: (0, $7c018e715e9e5e4a$exports.mergeOverrides)(layer.baseStyle, layer.overrides)
    };
};
/**
 * Build style
 *
 * @param {string} name - the name of the style being built
 * @param {string} absoluteStylePath - the input directory that contains styles
 * @param {string} layerDir - the input directory that contains layers
 * @returns {Object}
 */ var $787eebfbd67e2373$var$buildStyle = function buildStyle(name, absoluteStylePath, layerDir) {
    var _options$verbose;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!absoluteStylePath) throw new Error("Must provide absoluteStylePath.");
    if (!layerDir) throw new Error("Must provide layerDir.");
    var verbose = (_options$verbose = options === null || options === void 0 ? void 0 : options.verbose) !== null && _options$verbose !== void 0 ? _options$verbose : false;
    var _loadStyle = $787eebfbd67e2373$var$loadStyle(name, $787eebfbd67e2373$var$_path["default"].resolve(absoluteStylePath)), context = _loadStyle.context, template = _loadStyle.template;
    var styleJson = JSON.parse(JSON.stringify(template));
    var validationMessages = {};
    if (verbose) console.log("Building style ".concat($787eebfbd67e2373$var$_chalk["default"].blue(name)));
    styleJson.layers = template.layers.map(function(layerName) {
        if (verbose) console.log("  Adding layer ".concat($787eebfbd67e2373$var$_chalk["default"].blue(layerName)));
        var layerPath = $787eebfbd67e2373$var$_path["default"].resolve(layerDir, "".concat(layerName, ".js"));
        var _buildLayer = $787eebfbd67e2373$var$buildLayer(context, layerName, layerPath), layer = _buildLayer.layer;
        // Collect validation messages for each layer
        var layerValidationMessages = $787eebfbd67e2373$var$validateLayer(layer);
        if (layerValidationMessages.length) validationMessages[layerName] = layerValidationMessages;
        return layer;
    });
    if (Object.keys(validationMessages).length > 0) {
        console.warn("Found issues in style ".concat($787eebfbd67e2373$var$_chalk["default"].blue(name), ":"));
        $787eebfbd67e2373$var$logLayerValidationMessages(validationMessages);
    }
    // Flattens nested object to be one level with keys using periods to represent nesting
    var flattenObject1 = function flattenObject(obj) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        return Object.keys(obj).reduce(function(acc, k) {
            var pre = prefix.length ? prefix + "." : "";
            if ((0, $787eebfbd67e2373$var$_lodash2["default"])(obj[k])) Object.assign(acc, flattenObject(obj[k], pre + k));
            else acc[pre + k] = obj[k];
            return acc;
        }, {});
    };
    return {
        styleJson: styleJson
    };
};
$787eebfbd67e2373$exports.buildStyle = $787eebfbd67e2373$var$buildStyle;



var $5d86828d3cc45dbd$exports = {};
"use strict";
Object.defineProperty($5d86828d3cc45dbd$exports, "__esModule", {
    value: true
});
$5d86828d3cc45dbd$exports.mergeVariables = void 0;
function $5d86828d3cc45dbd$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $5d86828d3cc45dbd$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $5d86828d3cc45dbd$var$_typeof(obj1);
}
var $5d86828d3cc45dbd$var$isObject = function isObject(v) {
    return $5d86828d3cc45dbd$var$_typeof(v) === "object" && !Array.isArray(v) && !!v;
};
/**
 * Merge the current object of variables with an extender object. Variables
 * defined in extender will override variables defined in the current variables,
 * if there is overlap. Nested variables are taken into account.
 * @param {Object} current - the original variable object
 * @param {Object} extender - the extender variable object, containing overrides
 * @returns {Object} - the merged variables
 */ var $5d86828d3cc45dbd$var$merge = function merge1(current, extender) {
    var merged = JSON.parse(JSON.stringify(current));
    Object.keys(extender).forEach(function(k) {
        // Handle nested variables
        if ($5d86828d3cc45dbd$var$isObject(current[k]) && $5d86828d3cc45dbd$var$isObject(extender[k])) merged[k] = merge1(current[k], extender[k]);
        else merged[k] = JSON.parse(JSON.stringify(extender[k]));
    });
    return merged;
};
/**
 * Merge any number of variable objects
 * @param {...Object} variableGroups - one or many variable objects, each 
 * passed as a separate parameter
 * @returns {Object} the merged variable object
 */ var $5d86828d3cc45dbd$var$mergeVariables = function mergeVariables() {
    for(var _len = arguments.length, variableGroups = new Array(_len), _key = 0; _key < _len; _key++)variableGroups[_key] = arguments[_key];
    return variableGroups.reduce(function(acc, cur) {
        return $5d86828d3cc45dbd$var$merge(acc, cur);
    }, {});
};
$5d86828d3cc45dbd$exports.mergeVariables = $5d86828d3cc45dbd$var$mergeVariables;


var $420078f6f222ff92$exports = {};
"use strict";
Object.defineProperty($420078f6f222ff92$exports, "__esModule", {
    value: true
});
$420078f6f222ff92$exports.modifyNumberVariables = void 0;
function $420078f6f222ff92$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $420078f6f222ff92$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $420078f6f222ff92$var$_typeof(obj1);
}
/**
 * Returns a new function that divides a number by the modifier passed here
 * @param {number} divisor - number to divide by in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $420078f6f222ff92$var$getDivideFn = function getDivideFn(divisor) {
    return function(num) {
        return num / divisor;
    };
};
/**
 * Returns a new function that subtracts from a number by the modifier passed here
 * @param {number} toSubtract - number to subtract in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $420078f6f222ff92$var$getSubtractFn = function getSubtractFn(toSubtract) {
    return function(num) {
        return num - toSubtract;
    };
};
/**
 * Returns a new function that adds to a number by the modifier passed here
 * @param {number} toAdd - number to add in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $420078f6f222ff92$var$getAddFn = function getAddFn(toAdd) {
    return function(num) {
        return num + toAdd;
    };
};
/**
 * Returns a new function that multiplies a number by the modifier passed here
 * @param {number} multiplier - number to multiply by in the output function
 * @returns {Function} - a function that multiplies a number by the modifier passed
 */ var $420078f6f222ff92$var$getMultiplyFn = function getMultiplyFn(multiplier) {
    return function(num) {
        return num * multiplier;
    };
};
/**
 * Modifies the property value after the transform function using options
 * @param {Array|number} value - property value of the variable
 * @param {Object} [options] - options object with keys: round?: boolean, floor?: boolean, ceil?: boolean, toFixed?: number
 * @returns {Array|number} - the modified property values from the options
 */ var $420078f6f222ff92$var$handleOptions = function handleOptions(value, options) {
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
 */ var $420078f6f222ff92$var$modifyValue = function modifyValue1(propertyValue, fn, options) {
    if (typeof propertyValue === "number") return $420078f6f222ff92$var$handleOptions(fn(propertyValue), options);
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
 */ var $420078f6f222ff92$var$replaceVariables = function replaceVariables1(variables, fn, options) {
    if ($420078f6f222ff92$var$_typeof(variables) !== "object" || Array.isArray(variables)) return $420078f6f222ff92$var$modifyValue(variables, fn, options);
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
 */ var $420078f6f222ff92$var$modifyNumberVariables = function modifyNumberVariables(variables, operator, modifier) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var nextVariables = JSON.parse(JSON.stringify(variables));
    var mathFn = function mathFn(num) {
        return num;
    };
    switch(operator){
        case "*":
            mathFn = $420078f6f222ff92$var$getMultiplyFn(modifier);
            break;
        case "/":
            mathFn = $420078f6f222ff92$var$getDivideFn(modifier);
            break;
        case "+":
            mathFn = $420078f6f222ff92$var$getAddFn(modifier);
            break;
        case "-":
            mathFn = $420078f6f222ff92$var$getSubtractFn(modifier);
            break;
        default:
            throw new Error("".concat(operator, " is not a valid operator."));
    }
    nextVariables = $420078f6f222ff92$var$replaceVariables(variables, mathFn, options);
    return nextVariables;
};
$420078f6f222ff92$exports.modifyNumberVariables = $420078f6f222ff92$var$modifyNumberVariables;


var $427613dabbfda056$exports = {};
"use strict";
function $427613dabbfda056$var$_typeof(obj1) {
    "@babel/helpers - typeof";
    return $427613dabbfda056$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $427613dabbfda056$var$_typeof(obj1);
}
Object.defineProperty($427613dabbfda056$exports, "__esModule", {
    value: true
});
$427613dabbfda056$exports.createVariantTemplate = $427613dabbfda056$exports.createLayerTemplate = void 0;

var $427613dabbfda056$var$_jsonStringifyPrettyCompact = $427613dabbfda056$var$_interopRequireDefault($gXNCa$jsonstringifyprettycompact);

function $427613dabbfda056$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $427613dabbfda056$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $427613dabbfda056$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $427613dabbfda056$var$ownKeys(Object(source), !0).forEach(function(key) {
            $427613dabbfda056$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $427613dabbfda056$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $427613dabbfda056$var$_defineProperty(obj, key, value) {
    key = $427613dabbfda056$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $427613dabbfda056$var$_toPropertyKey(arg) {
    var key = $427613dabbfda056$var$_toPrimitive(arg, "string");
    return $427613dabbfda056$var$_typeof(key) === "symbol" ? key : String(key);
}
function $427613dabbfda056$var$_toPrimitive(input, hint) {
    if ($427613dabbfda056$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($427613dabbfda056$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $427613dabbfda056$var$_slicedToArray(arr, i) {
    return $427613dabbfda056$var$_arrayWithHoles(arr) || $427613dabbfda056$var$_iterableToArrayLimit(arr, i) || $427613dabbfda056$var$_unsupportedIterableToArray(arr, i) || $427613dabbfda056$var$_nonIterableRest();
}
function $427613dabbfda056$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $427613dabbfda056$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $427613dabbfda056$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $427613dabbfda056$var$_arrayLikeToArray(o, minLen);
}
function $427613dabbfda056$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $427613dabbfda056$var$_iterableToArrayLimit(arr, i) {
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
function $427613dabbfda056$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
var $427613dabbfda056$var$createLayerTemplate = function createLayerTemplate(baseLayer, variants) {
    var layer = baseLayer;
    if (!layer) layer = Object.values(variants)[0];
    var baseStyle = (0, $427613dabbfda056$var$_jsonStringifyPrettyCompact["default"])(layer, {
        indent: 2
    }).split("\n").join("\n  ");
    var allOverrides = "";
    // TODO currently making the primary differentiator style id until we sort differences
    var _loop = function _loop() {
        var overrides = {};
        if (layer && Object.keys(variants).length) {
            var variantLayer = variants[styleName];
            Object.entries(variantLayer).forEach(function(_ref) {
                var _ref2 = $427613dabbfda056$var$_slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
                if (k === "layout" || k === "paint") return;
                if (JSON.stringify(v) === JSON.stringify(layer[k])) return;
                overrides[k] = v;
            });
            if (variantLayer.layout) {
                // If a property does not exist on a variant, override with the default
                var defaultLayout = Object.keys(layer.layout || {}).reduce(function(acc, k) {
                    acc[k] = $gXNCa$mapboxmapboxglstylespec.latest["layout_".concat(layer.type)][k]["default"];
                    return acc;
                }, {});
                var fullLayout = $427613dabbfda056$var$_objectSpread($427613dabbfda056$var$_objectSpread({}, defaultLayout), variantLayer.layout);
                Object.entries(fullLayout).forEach(function(_ref3) {
                    var _layer, _layer$layout;
                    var _ref4 = $427613dabbfda056$var$_slicedToArray(_ref3, 2), k = _ref4[0], v = _ref4[1];
                    if (JSON.stringify(v) === JSON.stringify((_layer = layer) === null || _layer === void 0 ? void 0 : (_layer$layout = _layer.layout) === null || _layer$layout === void 0 ? void 0 : _layer$layout[k])) return;
                    if (!overrides.layout) overrides.layout = {};
                    overrides.layout[k] = v;
                });
            }
            if (variantLayer.paint) {
                // If a property does not exist on a variant, override with the default
                var defaultPaint = Object.keys(layer.paint || {}).reduce(function(acc, k) {
                    acc[k] = $gXNCa$mapboxmapboxglstylespec.latest["paint_".concat(layer.type)][k]["default"];
                    return acc;
                }, {});
                var fullPaint = $427613dabbfda056$var$_objectSpread($427613dabbfda056$var$_objectSpread({}, defaultPaint), variantLayer.paint);
                Object.entries(fullPaint).forEach(function(_ref5) {
                    var _layer2, _layer2$paint;
                    var _ref6 = $427613dabbfda056$var$_slicedToArray(_ref5, 2), k = _ref6[0], v = _ref6[1];
                    if (JSON.stringify(v) === JSON.stringify((_layer2 = layer) === null || _layer2 === void 0 ? void 0 : (_layer2$paint = _layer2.paint) === null || _layer2$paint === void 0 ? void 0 : _layer2$paint[k])) return;
                    if (!overrides.paint) overrides.paint = {};
                    overrides.paint[k] = v;
                });
            }
        }
        overrides = (0, $427613dabbfda056$var$_jsonStringifyPrettyCompact["default"])(overrides, {
            indent: 2
        }).split("\n").join("\n    ");
        allOverrides += "".concat(!!allOverrides ? " else if" : "if", " (context.styleName === '").concat(styleName, "') {\n      overrides = ").concat(overrides, ";\n  }");
    };
    for(var styleName in variants)_loop();
    var fileContent = "module.exports.default = (context) => {\n  const baseStyle = ".concat(baseStyle, ";\n  let overrides = {};\n  ").concat(allOverrides, "\n  return {\n    baseStyle,\n    overrides\n  };\n};");
    return fileContent;
};
$427613dabbfda056$exports.createLayerTemplate = $427613dabbfda056$var$createLayerTemplate;
var $427613dabbfda056$var$createVariantTemplate = function createVariantTemplate(style) {
    var templateStyle = $427613dabbfda056$var$_objectSpread($427613dabbfda056$var$_objectSpread({}, style), {}, {
        layers: style.layers.map(function(l) {
            return l.id;
        })
    });
    var fileContent = "module.exports.context = {\n  colors: {\n  },\n  styleName: '".concat(style.name, "'\n};\n\nmodule.exports.template = ").concat(JSON.stringify(templateStyle, null, 2), ";\n");
    return fileContent;
};
$427613dabbfda056$exports.createVariantTemplate = $427613dabbfda056$var$createVariantTemplate;




//# sourceMappingURL=main.js.map
