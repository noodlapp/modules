/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@noodl/noodl-sdk/index.js":
/*!************************************************!*\
  !*** ./node_modules/@noodl/noodl-sdk/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _colors = {
  "purple": "component",
  "green": "data",
  "default": "default",
  "grey": "default"
};

Noodl.defineNode = function (def) {
  var _def = {};
  _def.name = def.name;
  _def.displayNodeName = def.displayName;
  _def.usePortAsLabel = def.useInputAsLabel;
  _def.color = _colors[def.color || 'default'];
  _def.category = def.category || 'Modules';
  _def.getInspectInfo = def.getInspectInfo;
  _def.docs = def.docs;

  _def.initialize = function () {
    this.inputs = {};

    var _outputs = this.outputs = {};

    var _this = this; // Function for quickly setting outputs


    this.setOutputs = function (o) {
      for (var key in o) {
        _outputs[key] = o[key];

        _this.flagOutputDirty(key);
      }
    }; // Sending warnings


    this.clearWarnings = function () {
      if (this.context.editorConnection && this.nodeScope && this.nodeScope.componentOwner) this.context.editorConnection.clearWarnings(this.nodeScope.componentOwner.name, this.id);
    }.bind(this);

    this.sendWarning = function (name, message) {
      if (this.context.editorConnection && this.nodeScope && this.nodeScope.componentOwner) this.context.editorConnection.sendWarning(this.nodeScope.componentOwner.name, this.id, name, {
        message: message
      });
    }.bind(this);

    if (typeof def.initialize === 'function') def.initialize.apply(this);
  };

  _def.inputs = {};
  _def.outputs = {};

  for (var key in def.inputs) {
    _def.inputs[key] = {
      type: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].type : def.inputs[key],
      displayName: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].displayName : undefined,
      group: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].group : undefined,
      "default": _typeof(def.inputs[key]) === 'object' ? def.inputs[key]["default"] : undefined,
      set: function () {
        var _key = key;
        return function (value) {
          this.inputs[_key] = value;

          if (def.changed && typeof def.changed[_key] === 'function') {
            def.changed[_key].apply(this, [value]);
          }
        };
      }()
    };
  }

  for (var key in def.signals) {
    _def.inputs[key] = {
      type: 'signal',
      displayName: _typeof(def.signals[key]) === 'object' ? def.signals[key].displayName : undefined,
      group: _typeof(def.signals[key]) === 'object' ? def.signals[key].group : undefined,
      valueChangedToTrue: function () {
        var _key = key;
        return function () {
          var _this2 = this;

          var _fn = _typeof(def.signals[_key]) === 'object' ? def.signals[_key].signal : def.signals[_key];

          if (typeof _fn === 'function') {
            this.scheduleAfterInputsHaveUpdated(function () {
              _fn.apply(_this2);
            });
          }
        };
      }()
    };
  }

  for (var key in def.outputs) {
    if (def.outputs[key] === 'signal') {
      _def.outputs[key] = {
        type: 'signal'
      };
    } else {
      _def.outputs[key] = {
        type: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].type : def.outputs[key],
        displayName: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].displayName : undefined,
        group: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].group : undefined,
        getter: function () {
          var _key = key;
          return function () {
            return this.outputs[_key];
          };
        }()
      };
    }
  }

  _def.methods = _def.prototypeExtensions = {};

  for (var key in def.methods) {
    _def.prototypeExtensions[key] = def.methods[key];
  }

  if (_def.methods.onNodeDeleted) {
    // Override the onNodeDeleted if required
    _def.methods._onNodeDeleted = function () {
      this.__proto__.__proto__._onNodeDeleted.call(this);

      _def.methods.onNodeDeleted.value.call(this);
    };
  }

  return {
    node: _def,
    setup: def.setup
  };
};

Noodl.defineCollectionNode = function (def) {
  var _def = {
    name: def.name,
    category: def.category,
    color: 'data',
    inputs: def.inputs,
    outputs: Object.assign({
      Items: 'array',
      'Fetch Started': 'signal',
      'Fetch Completed': 'signal'
    }, def.outputs || {}),
    signals: Object.assign({
      Fetch: function Fetch() {
        var _this = this;

        this.sendSignalOnOutput('Fetch Started');
        var a = def.fetch.call(this, function () {
          _this.sendSignalOnOutput('Fetch Completed');
        });
        this.setOutputs({
          Items: a
        });
      }
    }, def.signals || {})
  };
  return Noodl.defineNode(_def);
};

Noodl.defineModelNode = function (def) {
  var _def = {
    name: def.name,
    category: def.category,
    color: 'data',
    inputs: {
      Id: 'string'
    },
    outputs: {
      Fetched: 'signal'
    },
    changed: {
      Id: function Id(value) {
        var _this3 = this;

        if (this._object && this._changeListener) this._object.off('change', this._changeListener);
        this._object = Noodl.Object.get(value);

        this._changeListener = function (name, value) {
          var _o = {};
          _o[name] = value;

          _this3.setOutputs(_o);
        };

        this._object.on('change', this._changeListener);

        this.setOutputs(this._object.data);
        this.sendSignalOnOutput('Fetched');
      }
    },
    initialize: function initialize() {}
  };

  for (var key in def.properties) {
    _def.inputs[key] = def.properties[key];
    _def.outputs[key] = def.properties[key];

    _def.changed[key] = function () {
      var _key = key;
      return function (value) {
        if (!this._object) return;

        this._object.set(_key, value);
      };
    }();
  }

  return Noodl.defineNode(_def);
};

Noodl.defineReactNode = function (def) {
  var _def = Noodl.defineNode(def);

  _def.node.getReactComponent = def.getReactComponent;
  _def.node.inputProps = def.inputProps;
  _def.node.inputCss = def.inputCss;
  _def.node.outputProps = def.outputProps;
  _def.node.setup = def.setup;
  _def.node.frame = def.frame;
  return _def.node;
};

module.exports = Noodl;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/datepicker.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/datepicker.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".datepicker {\n    display: none;\n}\n\n.datepicker.active {\n    display: block;\n}\n\n.datepicker-dropdown {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 20;\n    padding-top: 4px;\n}\n\n.datepicker-dropdown.datepicker-orient-top {\n    padding-top: 0;\n    padding-bottom: 4px;\n}\n\n.datepicker-picker {\n    display: inline-block;\n    border-radius: 4px;\n    background-color: white;\n}\n\n.datepicker-dropdown .datepicker-picker {\n    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n}\n\n.datepicker-picker span {\n    display: block;\n    flex: 1;\n    border: 0;\n    border-radius: 4px;\n    cursor: default;\n    text-align: center;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n\n.datepicker-main {\n    padding: 2px;\n}\n\n.datepicker-footer {\n    box-shadow: inset 0 1px 1px rgba(10, 10, 10, 0.1);\n    background-color: whitesmoke;\n}\n\n.datepicker-controls, .datepicker-view, .datepicker-view .days-of-week, .datepicker-grid {\n    display: flex;\n}\n\n.datepicker-grid {\n    flex-wrap: wrap;\n}\n\n.datepicker-view .dow, .datepicker-view .days .datepicker-cell {\n    flex-basis: 14.28571%;\n}\n\n.datepicker-view.datepicker-grid .datepicker-cell {\n    flex-basis: 25%;\n}\n\n.datepicker-view .week, .datepicker-cell {\n    height: 2.25rem;\n    line-height: 2.25rem;\n}\n\n.datepicker-title {\n    box-shadow: inset 0 -1px 1px rgba(10, 10, 10, 0.1);\n    background-color: whitesmoke;\n    padding: 0.375rem 0.75rem;\n    text-align: center;\n    font-weight: 700;\n}\n\n.datepicker-header .datepicker-controls {\n    padding: 2px 2px 0;\n}\n\n.datepicker-controls .button {\n    display: inline-flex;\n    position: relative;\n    align-items: center;\n    justify-content: center;\n    margin: 0;\n    border: 1px solid #dbdbdb;\n    border-radius: 4px;\n    box-shadow: none;\n    background-color: white;\n    cursor: pointer;\n    padding: calc(0.375em - 1px) 0.75em;\n    height: 2.25em;\n    vertical-align: top;\n    text-align: center;\n    line-height: 1.5;\n    white-space: nowrap;\n    color: #363636;\n    font-size: 1rem;\n}\n\n.datepicker-controls .button:focus, .datepicker-controls .button:active {\n    outline: none;\n}\n\n.datepicker-controls .button:hover {\n    border-color: #b5b5b5;\n    color: #363636;\n}\n\n.datepicker-controls .button:focus {\n    border-color: #3273dc;\n    color: #363636;\n}\n\n.datepicker-controls .button:focus:not(:active) {\n    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n\n.datepicker-controls .button:active {\n    border-color: #4a4a4a;\n    color: #363636;\n}\n\n.datepicker-controls .button[disabled] {\n    cursor: not-allowed;\n}\n\n.datepicker-header .datepicker-controls .button {\n    border-color: transparent;\n    font-weight: bold;\n}\n\n.datepicker-header .datepicker-controls .button:hover {\n    background-color: #f9f9f9;\n}\n\n.datepicker-header .datepicker-controls .button:focus:not(:active) {\n    box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n\n.datepicker-header .datepicker-controls .button:active {\n    background-color: #f2f2f2;\n}\n\n.datepicker-header .datepicker-controls .button[disabled] {\n    box-shadow: none;\n}\n\n.datepicker-footer .datepicker-controls .button {\n    margin: calc(0.375rem - 1px) 0.375rem;\n    border-radius: 2px;\n    width: 100%;\n    font-size: 0.75rem;\n}\n\n.datepicker-controls .view-switch {\n    flex: auto;\n}\n\n.datepicker-controls .prev-btn,\n.datepicker-controls .next-btn {\n    padding-right: 0.375rem;\n    padding-left: 0.375rem;\n    width: 2.25rem;\n}\n\n.datepicker-controls .prev-btn.disabled,\n.datepicker-controls .next-btn.disabled {\n    visibility: hidden;\n}\n\n.datepicker-view .dow {\n    height: 1.5rem;\n    line-height: 1.5rem;\n    font-size: 0.875rem;\n    font-weight: 700;\n}\n\n.datepicker-view .week {\n    width: 2.25rem;\n    color: #b5b5b5;\n    font-size: 0.75rem;\n}\n\n@media (max-width: 22.5rem) {\n    .datepicker-view .week {\n        width: 1.96875rem;\n    }\n}\n\n.datepicker-grid {\n    width: 15.75rem;\n}\n\n@media (max-width: 22.5rem) {\n    .calendar-weeks + .days .datepicker-grid {\n        width: 13.78125rem;\n    }\n}\n\n.datepicker-cell:not(.disabled):hover {\n    background-color: #f9f9f9;\n    cursor: pointer;\n}\n\n.datepicker-cell.focused:not(.selected) {\n    background-color: #e8e8e8;\n}\n\n.datepicker-cell.selected, .datepicker-cell.selected:hover {\n    background-color: #3273dc;\n    color: #fff;\n    font-weight: 600;\n}\n\n.datepicker-cell.disabled {\n    color: #dbdbdb;\n}\n\n.datepicker-cell.prev:not(.disabled), .datepicker-cell.next:not(.disabled) {\n    color: #7a7a7a;\n}\n\n.datepicker-cell.prev.selected, .datepicker-cell.next.selected {\n    color: #e6e6e6;\n}\n\n.datepicker-cell.highlighted:not(.selected):not(.range):not(.today) {\n    border-radius: 0;\n    background-color: whitesmoke;\n}\n\n.datepicker-cell.highlighted:not(.selected):not(.range):not(.today):not(.disabled):hover {\n    background-color: #eeeeee;\n}\n\n.datepicker-cell.highlighted:not(.selected):not(.range):not(.today).focused {\n    background-color: #e8e8e8;\n}\n\n.datepicker-cell.today:not(.selected) {\n    background-color: #00d1b2;\n}\n\n.datepicker-cell.today:not(.selected):not(.disabled) {\n    color: #fff;\n}\n\n.datepicker-cell.today.focused:not(.selected) {\n    background-color: #00c4a7;\n}\n\n.datepicker-cell.range-start:not(.selected), .datepicker-cell.range-end:not(.selected) {\n    background-color: #b5b5b5;\n    color: #fff;\n}\n\n.datepicker-cell.range-start.focused:not(.selected), .datepicker-cell.range-end.focused:not(.selected) {\n    background-color: #afafaf;\n}\n\n.datepicker-cell.range-start {\n    border-radius: 4px 0 0 4px;\n}\n\n.datepicker-cell.range-end {\n    border-radius: 0 4px 4px 0;\n}\n\n.datepicker-cell.range {\n    border-radius: 0;\n    background-color: #dbdbdb;\n}\n\n.datepicker-cell.range:not(.disabled):not(.focused):not(.today):hover {\n    background-color: #d5d5d5;\n}\n\n.datepicker-cell.range.disabled {\n    color: #c2c2c2;\n}\n\n.datepicker-cell.range.focused {\n    background-color: #cfcfcf;\n}\n\n.datepicker-view.datepicker-grid .datepicker-cell {\n    height: 4.5rem;\n    line-height: 4.5rem;\n}\n\n.datepicker-input.in-edit {\n    border-color: #2366d1;\n}\n\n.datepicker-input.in-edit:focus, .datepicker-input.in-edit:active {\n    box-shadow: 0 0 0.25em 0.25em rgba(35, 102, 209, 0.2);\n}\n\n.datepicker-native-input {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n    box-sizing: border-box;\n}\n.datepicker-native-input::-webkit-calendar-picker-indicator {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    cursor: pointer;\n}\n\n.ndl-datepicker-button {\n    position:relative;\n    background-color:black;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    width: 32px;\n    height: 32px;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/react-device-detect/main.js":
/*!**************************************************!*\
  !*** ./node_modules/react-device-detect/main.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && _typeof2(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = __webpack_require__(/*! react */ "react");

var React__default = _interopDefault(React);

var UAParser = __webpack_require__(/*! ua-parser-js/dist/ua-parser.min */ "./node_modules/ua-parser-js/dist/ua-parser.min.js");

var UA = new UAParser();
var browser = UA.getBrowser();
var cpu = UA.getCPU();
var device = UA.getDevice();
var engine = UA.getEngine();
var os = UA.getOS();
var ua = UA.getUA();

var setDefaults = function setDefaults(p) {
  var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  return p ? p : d;
};

var getNavigatorInstance = function getNavigatorInstance() {
  if (typeof window !== 'undefined') {
    if (window.navigator || navigator) {
      return window.navigator || navigator;
    }
  }

  return false;
};

var isIOS13Check = function isIOS13Check(type) {
  var nav = getNavigatorInstance();
  return nav && nav.platform && (nav.platform.indexOf(type) !== -1 || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream);
};

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof2(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  SMART_TV: 'smarttv',
  CONSOLE: 'console',
  WEARABLE: 'wearable',
  BROWSER: undefined
};
var BROWSER_TYPES = {
  CHROME: 'Chrome',
  FIREFOX: "Firefox",
  OPERA: "Opera",
  YANDEX: "Yandex",
  SAFARI: "Safari",
  INTERNET_EXPLORER: "Internet Explorer",
  EDGE: "Edge",
  CHROMIUM: "Chromium",
  IE: 'IE',
  MOBILE_SAFARI: "Mobile Safari",
  EDGE_CHROMIUM: "Edge Chromium",
  MIUI: "MIUI Browser"
};
var OS_TYPES = {
  IOS: 'iOS',
  ANDROID: "Android",
  WINDOWS_PHONE: "Windows Phone",
  WINDOWS: 'Windows',
  MAC_OS: 'Mac OS'
};
var initialData = {
  isMobile: false,
  isTablet: false,
  isBrowser: false,
  isSmartTV: false,
  isConsole: false,
  isWearable: false
};

var checkType = function checkType(type) {
  switch (type) {
    case DEVICE_TYPES.MOBILE:
      return {
        isMobile: true
      };

    case DEVICE_TYPES.TABLET:
      return {
        isTablet: true
      };

    case DEVICE_TYPES.SMART_TV:
      return {
        isSmartTV: true
      };

    case DEVICE_TYPES.CONSOLE:
      return {
        isConsole: true
      };

    case DEVICE_TYPES.WEARABLE:
      return {
        isWearable: true
      };

    case DEVICE_TYPES.BROWSER:
      return {
        isBrowser: true
      };

    default:
      return initialData;
  }
};

var broPayload = function broPayload(isBrowser, browser, engine, os, ua) {
  return {
    isBrowser: isBrowser,
    browserMajorVersion: setDefaults(browser.major),
    browserFullVersion: setDefaults(browser.version),
    browserName: setDefaults(browser.name),
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};

var mobilePayload = function mobilePayload(type, device, os, ua) {
  return _objectSpread2({}, type, {
    vendor: setDefaults(device.vendor),
    model: setDefaults(device.model),
    os: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    ua: setDefaults(ua)
  });
};

var stvPayload = function stvPayload(isSmartTV, engine, os, ua) {
  return {
    isSmartTV: isSmartTV,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};

var consolePayload = function consolePayload(isConsole, engine, os, ua) {
  return {
    isConsole: isConsole,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};

var wearPayload = function wearPayload(isWearable, engine, os, ua) {
  return {
    isWearable: isWearable,
    engineName: setDefaults(engine.name),
    engineVersion: setDefaults(engine.version),
    osName: setDefaults(os.name),
    osVersion: setDefaults(os.version),
    userAgent: setDefaults(ua)
  };
};

var type = checkType(device.type);

function deviceDetect() {
  var isBrowser = type.isBrowser,
      isMobile = type.isMobile,
      isTablet = type.isTablet,
      isSmartTV = type.isSmartTV,
      isConsole = type.isConsole,
      isWearable = type.isWearable;

  if (isBrowser) {
    return broPayload(isBrowser, browser, engine, os, ua);
  }

  if (isSmartTV) {
    return stvPayload(isSmartTV, engine, os, ua);
  }

  if (isConsole) {
    return consolePayload(isConsole, engine, os, ua);
  }

  if (isMobile) {
    return mobilePayload(type, device, os, ua);
  }

  if (isTablet) {
    return mobilePayload(type, device, os, ua);
  }

  if (isWearable) {
    return wearPayload(isWearable, engine, os, ua);
  }
}

var isMobileType = function isMobileType() {
  return device.type === DEVICE_TYPES.MOBILE;
};

var isTabletType = function isTabletType() {
  return device.type === DEVICE_TYPES.TABLET;
};

var isMobileAndTabletType = function isMobileAndTabletType() {
  switch (device.type) {
    case DEVICE_TYPES.MOBILE:
    case DEVICE_TYPES.TABLET:
      return true;

    default:
      return false;
  }
};

var isEdgeChromiumType = function isEdgeChromiumType() {
  return typeof ua === 'string' && ua.indexOf('Edg/') !== -1;
};

var isSmartTVType = function isSmartTVType() {
  return device.type === DEVICE_TYPES.SMART_TV;
};

var isBrowserType = function isBrowserType() {
  return device.type === DEVICE_TYPES.BROWSER;
};

var isWearableType = function isWearableType() {
  return device.type === DEVICE_TYPES.WEARABLE;
};

var isConsoleType = function isConsoleType() {
  return device.type === DEVICE_TYPES.CONSOLE;
};

var isAndroidType = function isAndroidType() {
  return os.name === OS_TYPES.ANDROID;
};

var isWindowsType = function isWindowsType() {
  return os.name === OS_TYPES.WINDOWS;
};

var isMacOsType = function isMacOsType() {
  return os.name === OS_TYPES.MAC_OS;
};

var isWinPhoneType = function isWinPhoneType() {
  return os.name === OS_TYPES.WINDOWS_PHONE;
};

var isIOSType = function isIOSType() {
  return os.name === OS_TYPES.IOS;
};

var isChromeType = function isChromeType() {
  return browser.name === BROWSER_TYPES.CHROME;
};

var isFirefoxType = function isFirefoxType() {
  return browser.name === BROWSER_TYPES.FIREFOX;
};

var isChromiumType = function isChromiumType() {
  return browser.name === BROWSER_TYPES.CHROMIUM;
};

var isEdgeType = function isEdgeType() {
  return browser.name === BROWSER_TYPES.EDGE;
};

var isYandexType = function isYandexType() {
  return browser.name === BROWSER_TYPES.YANDEX;
};

var isSafariType = function isSafariType() {
  return browser.name === BROWSER_TYPES.SAFARI || browser.name === BROWSER_TYPES.MOBILE_SAFARI;
};

var isMobileSafariType = function isMobileSafariType() {
  return browser.name === BROWSER_TYPES.MOBILE_SAFARI;
};

var isOperaType = function isOperaType() {
  return browser.name === BROWSER_TYPES.OPERA;
};

var isIEType = function isIEType() {
  return browser.name === BROWSER_TYPES.INTERNET_EXPLORER || browser.name === BROWSER_TYPES.IE;
};

var isMIUIType = function isMIUIType() {
  return browser.name === BROWSER_TYPES.MIUI;
};

var isElectronType = function isElectronType() {
  var nav = getNavigatorInstance();
  var ua = nav && nav.userAgent.toLowerCase();
  return typeof ua === 'string' ? /electron/.test(ua) : false;
};

var getIOS13 = function getIOS13() {
  var nav = getNavigatorInstance();
  return nav && (/iPad|iPhone|iPod/.test(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1) && !window.MSStream;
};

var getIPad13 = function getIPad13() {
  return isIOS13Check('iPad');
};

var getIphone13 = function getIphone13() {
  return isIOS13Check('iPhone');
};

var getIPod13 = function getIPod13() {
  return isIOS13Check('iPod');
};

var getBrowserFullVersion = function getBrowserFullVersion() {
  return setDefaults(browser.version);
};

var getBrowserVersion = function getBrowserVersion() {
  return setDefaults(browser.major);
};

var getOsVersion = function getOsVersion() {
  return setDefaults(os.version);
};

var getOsName = function getOsName() {
  return setDefaults(os.name);
};

var getBrowserName = function getBrowserName() {
  return setDefaults(browser.name);
};

var getMobileVendor = function getMobileVendor() {
  return setDefaults(device.vendor);
};

var getMobileModel = function getMobileModel() {
  return setDefaults(device.model);
};

var getEngineName = function getEngineName() {
  return setDefaults(engine.name);
};

var getEngineVersion = function getEngineVersion() {
  return setDefaults(engine.version);
};

var getUseragent = function getUseragent() {
  return setDefaults(ua);
};

var getDeviceType = function getDeviceType() {
  return setDefaults(device.type, 'browser');
};

var isSmartTV = isSmartTVType();
var isConsole = isConsoleType();
var isWearable = isWearableType();
var isMobileSafari = isMobileSafariType() || getIPad13();
var isChromium = isChromiumType();
var isMobile = isMobileAndTabletType() || getIPad13();
var isMobileOnly = isMobileType();
var isTablet = isTabletType() || getIPad13();
var isBrowser = isBrowserType();
var isAndroid = isAndroidType();
var isWinPhone = isWinPhoneType();
var isIOS = isIOSType() || getIPad13();
var isChrome = isChromeType();
var isFirefox = isFirefoxType();
var isSafari = isSafariType();
var isOpera = isOperaType();
var isIE = isIEType();
var osVersion = getOsVersion();
var osName = getOsName();
var fullBrowserVersion = getBrowserFullVersion();
var browserVersion = getBrowserVersion();
var browserName = getBrowserName();
var mobileVendor = getMobileVendor();
var mobileModel = getMobileModel();
var engineName = getEngineName();
var engineVersion = getEngineVersion();
var getUA = getUseragent();
var isEdge = isEdgeType() || isEdgeChromiumType();
var isYandex = isYandexType();
var deviceType = getDeviceType();
var isIOS13 = getIOS13();
var isIPad13 = getIPad13();
var isIPhone13 = getIphone13();
var isIPod13 = getIPod13();
var isElectron = isElectronType();
var isEdgeChromium = isEdgeChromiumType();
var isLegacyEdge = isEdgeType() && !isEdgeChromiumType();
var isWindows = isWindowsType();
var isMacOs = isMacOsType();
var isMIUI = isMIUIType();

var AndroidView = function AndroidView(_ref) {
  var renderWithFragment = _ref.renderWithFragment,
      children = _ref.children,
      viewClassName = _ref.viewClassName,
      style = _ref.style;
  return isAndroid ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var BrowserView = function BrowserView(_ref2) {
  var renderWithFragment = _ref2.renderWithFragment,
      children = _ref2.children,
      viewClassName = _ref2.viewClassName,
      style = _ref2.style;
  return isBrowser ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var IEView = function IEView(_ref3) {
  var renderWithFragment = _ref3.renderWithFragment,
      children = _ref3.children,
      viewClassName = _ref3.viewClassName,
      style = _ref3.style;
  return isIE ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var IOSView = function IOSView(_ref4) {
  var renderWithFragment = _ref4.renderWithFragment,
      children = _ref4.children,
      viewClassName = _ref4.viewClassName,
      style = _ref4.style;
  return isIOS ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var MobileView = function MobileView(_ref5) {
  var renderWithFragment = _ref5.renderWithFragment,
      children = _ref5.children,
      viewClassName = _ref5.viewClassName,
      style = _ref5.style;
  return isMobile ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var TabletView = function TabletView(_ref6) {
  var renderWithFragment = _ref6.renderWithFragment,
      children = _ref6.children,
      viewClassName = _ref6.viewClassName,
      style = _ref6.style;
  return isTablet ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var WinPhoneView = function WinPhoneView(_ref7) {
  var renderWithFragment = _ref7.renderWithFragment,
      children = _ref7.children,
      viewClassName = _ref7.viewClassName,
      style = _ref7.style;
  return isWinPhone ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var MobileOnlyView = function MobileOnlyView(_ref8) {
  var renderWithFragment = _ref8.renderWithFragment,
      children = _ref8.children,
      viewClassName = _ref8.viewClassName,
      style = _ref8.style;
  return isMobileOnly ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var SmartTVView = function SmartTVView(_ref9) {
  var renderWithFragment = _ref9.renderWithFragment,
      children = _ref9.children,
      viewClassName = _ref9.viewClassName,
      style = _ref9.style;
  return isSmartTV ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var ConsoleView = function ConsoleView(_ref10) {
  var renderWithFragment = _ref10.renderWithFragment,
      children = _ref10.children,
      viewClassName = _ref10.viewClassName,
      style = _ref10.style;
  return isConsole ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var WearableView = function WearableView(_ref11) {
  var renderWithFragment = _ref11.renderWithFragment,
      children = _ref11.children,
      viewClassName = _ref11.viewClassName,
      style = _ref11.style;
  return isWearable ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

var CustomView = function CustomView(_ref12) {
  var renderWithFragment = _ref12.renderWithFragment,
      children = _ref12.children,
      viewClassName = _ref12.viewClassName,
      style = _ref12.style,
      condition = _ref12.condition;
  return condition ? renderWithFragment ? React__default.createElement(React.Fragment, null, children) : React__default.createElement("div", {
    className: viewClassName,
    style: style
  }, children) : null;
};

function withOrientationChange(WrappedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
      _this.isEventListenerAdded = false;
      _this.handleOrientationChange = _this.handleOrientationChange.bind(_assertThisInitialized(_this));
      _this.onOrientationChange = _this.onOrientationChange.bind(_assertThisInitialized(_this));
      _this.onPageLoad = _this.onPageLoad.bind(_assertThisInitialized(_this));
      _this.state = {
        isLandscape: false,
        isPortrait: false
      };
      return _this;
    }

    _createClass(_class, [{
      key: "handleOrientationChange",
      value: function handleOrientationChange() {
        if (!this.isEventListenerAdded) {
          this.isEventListenerAdded = true;
        }

        var orientation = window.innerWidth > window.innerHeight ? 90 : 0;
        this.setState({
          isPortrait: orientation === 0,
          isLandscape: orientation === 90
        });
      }
    }, {
      key: "onOrientationChange",
      value: function onOrientationChange() {
        this.handleOrientationChange();
      }
    }, {
      key: "onPageLoad",
      value: function onPageLoad() {
        this.handleOrientationChange();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== undefined && isMobile) {
          if (!this.isEventListenerAdded) {
            this.handleOrientationChange();
            window.addEventListener("load", this.onPageLoad, false);
          } else {
            window.removeEventListener("load", this.onPageLoad, false);
          }

          window.addEventListener("resize", this.onOrientationChange, false);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener("resize", this.onOrientationChange, false);
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(WrappedComponent, _extends({}, this.props, {
          isLandscape: this.state.isLandscape,
          isPortrait: this.state.isPortrait
        }));
      }
    }]);

    return _class;
  }(React__default.Component);
}

exports.AndroidView = AndroidView;
exports.BrowserView = BrowserView;
exports.ConsoleView = ConsoleView;
exports.CustomView = CustomView;
exports.IEView = IEView;
exports.IOSView = IOSView;
exports.MobileOnlyView = MobileOnlyView;
exports.MobileView = MobileView;
exports.SmartTVView = SmartTVView;
exports.TabletView = TabletView;
exports.WearableView = WearableView;
exports.WinPhoneView = WinPhoneView;
exports.browserName = browserName;
exports.browserVersion = browserVersion;
exports.deviceDetect = deviceDetect;
exports.deviceType = deviceType;
exports.engineName = engineName;
exports.engineVersion = engineVersion;
exports.fullBrowserVersion = fullBrowserVersion;
exports.getUA = getUA;
exports.isAndroid = isAndroid;
exports.isBrowser = isBrowser;
exports.isChrome = isChrome;
exports.isChromium = isChromium;
exports.isConsole = isConsole;
exports.isEdge = isEdge;
exports.isEdgeChromium = isEdgeChromium;
exports.isElectron = isElectron;
exports.isFirefox = isFirefox;
exports.isIE = isIE;
exports.isIOS = isIOS;
exports.isIOS13 = isIOS13;
exports.isIPad13 = isIPad13;
exports.isIPhone13 = isIPhone13;
exports.isIPod13 = isIPod13;
exports.isLegacyEdge = isLegacyEdge;
exports.isMIUI = isMIUI;
exports.isMacOs = isMacOs;
exports.isMobile = isMobile;
exports.isMobileOnly = isMobileOnly;
exports.isMobileSafari = isMobileSafari;
exports.isOpera = isOpera;
exports.isSafari = isSafari;
exports.isSmartTV = isSmartTV;
exports.isTablet = isTablet;
exports.isWearable = isWearable;
exports.isWinPhone = isWinPhone;
exports.isWindows = isWindows;
exports.isYandex = isYandex;
exports.mobileModel = mobileModel;
exports.mobileVendor = mobileVendor;
exports.osName = osName;
exports.osVersion = osVersion;
exports.withOrientationChange = withOrientationChange;

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),

/***/ "./node_modules/ua-parser-js/dist/ua-parser.min.js":
/*!*********************************************************!*\
  !*** ./node_modules/ua-parser-js/dist/ua-parser.min.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * UAParser.js v0.7.24
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */
(function (window, undefined) {
  "use strict";

  var LIBVERSION = "0.7.24",
      EMPTY = "",
      UNKNOWN = "?",
      FUNC_TYPE = "function",
      UNDEF_TYPE = "undefined",
      OBJ_TYPE = "object",
      STR_TYPE = "string",
      MAJOR = "major",
      MODEL = "model",
      NAME = "name",
      TYPE = "type",
      VENDOR = "vendor",
      VERSION = "version",
      ARCHITECTURE = "architecture",
      CONSOLE = "console",
      MOBILE = "mobile",
      TABLET = "tablet",
      SMARTTV = "smarttv",
      WEARABLE = "wearable",
      EMBEDDED = "embedded";
  var util = {
    extend: function extend(regexes, extensions) {
      var mergedRegexes = {};

      for (var i in regexes) {
        if (extensions[i] && extensions[i].length % 2 === 0) {
          mergedRegexes[i] = extensions[i].concat(regexes[i]);
        } else {
          mergedRegexes[i] = regexes[i];
        }
      }

      return mergedRegexes;
    },
    has: function has(str1, str2) {
      if (typeof str1 === "string") {
        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
      } else {
        return false;
      }
    },
    lowerize: function lowerize(str) {
      return str.toLowerCase();
    },
    major: function major(version) {
      return _typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, "").split(".")[0] : undefined;
    },
    trim: function trim(str) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
  };
  var mapper = {
    rgx: function rgx(ua, arrays) {
      var i = 0,
          j,
          k,
          p,
          q,
          matches,
          match;

      while (i < arrays.length && !matches) {
        var regex = arrays[i],
            props = arrays[i + 1];
        j = k = 0;

        while (j < regex.length && !matches) {
          matches = regex[j++].exec(ua);

          if (!!matches) {
            for (p = 0; p < props.length; p++) {
              match = matches[++k];
              q = props[p];

              if (_typeof(q) === OBJ_TYPE && q.length > 0) {
                if (q.length == 2) {
                  if (_typeof(q[1]) == FUNC_TYPE) {
                    this[q[0]] = q[1].call(this, match);
                  } else {
                    this[q[0]] = q[1];
                  }
                } else if (q.length == 3) {
                  if (_typeof(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                  } else {
                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                  }
                } else if (q.length == 4) {
                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                }
              } else {
                this[q] = match ? match : undefined;
              }
            }
          }
        }

        i += 2;
      }
    },
    str: function str(_str, map) {
      for (var i in map) {
        if (_typeof(map[i]) === OBJ_TYPE && map[i].length > 0) {
          for (var j = 0; j < map[i].length; j++) {
            if (util.has(map[i][j], _str)) {
              return i === UNKNOWN ? undefined : i;
            }
          }
        } else if (util.has(map[i], _str)) {
          return i === UNKNOWN ? undefined : i;
        }
      }

      return _str;
    }
  };
  var maps = {
    browser: {
      oldsafari: {
        version: {
          "1.0": "/8",
          1.2: "/1",
          1.3: "/3",
          "2.0": "/412",
          "2.0.2": "/416",
          "2.0.3": "/417",
          "2.0.4": "/419",
          "?": "/"
        }
      }
    },
    device: {
      amazon: {
        model: {
          "Fire Phone": ["SD", "KF"]
        }
      },
      sprint: {
        model: {
          "Evo Shift 4G": "7373KT"
        },
        vendor: {
          HTC: "APA",
          Sprint: "Sprint"
        }
      }
    },
    os: {
      windows: {
        version: {
          ME: "4.90",
          "NT 3.11": "NT3.51",
          "NT 4.0": "NT4.0",
          2000: "NT 5.0",
          XP: ["NT 5.1", "NT 5.2"],
          Vista: "NT 6.0",
          7: "NT 6.1",
          8: "NT 6.2",
          8.1: "NT 6.3",
          10: ["NT 6.4", "NT 10.0"],
          RT: "ARM"
        }
      }
    }
  };
  var regexes = {
    browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]{3,6}).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i], [[NAME, "Opera Mini"], VERSION], [/\s(opr)\/([\w\.]+)/i], [[NAME, "Opera"], VERSION], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i], [NAME, VERSION], [/(konqueror)\/([\w\.]+)/i], [[NAME, "Konqueror"], VERSION], [/(trident).+rv[:\s]([\w\.]{1,9}).+like\sgecko/i], [[NAME, "IE"], VERSION], [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i], [[NAME, "Edge"], VERSION], [/(yabrowser)\/([\w\.]+)/i], [[NAME, "Yandex"], VERSION], [/(Avast)\/([\w\.]+)/i], [[NAME, "Avast Secure Browser"], VERSION], [/(AVG)\/([\w\.]+)/i], [[NAME, "AVG Secure Browser"], VERSION], [/(puffin)\/([\w\.]+)/i], [[NAME, "Puffin"], VERSION], [/(focus)\/([\w\.]+)/i], [[NAME, "Firefox Focus"], VERSION], [/(opt)\/([\w\.]+)/i], [[NAME, "Opera Touch"], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[NAME, "UCBrowser"], VERSION], [/(comodo_dragon)\/([\w\.]+)/i], [[NAME, /_/g, " "], VERSION], [/(windowswechat qbcore)\/([\w\.]+)/i], [[NAME, "WeChat(Win) Desktop"], VERSION], [/(micromessenger)\/([\w\.]+)/i], [[NAME, "WeChat"], VERSION], [/(brave)\/([\w\.]+)/i], [[NAME, "Brave"], VERSION], [/(whale)\/([\w\.]+)/i], [[NAME, "Whale"], VERSION], [/(qqbrowserlite)\/([\w\.]+)/i], [NAME, VERSION], [/(QQ)\/([\d\.]+)/i], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/(baiduboxapp)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/(2345Explorer)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/(MetaSr)[\/\s]?([\w\.]+)/i], [NAME], [/(LBBROWSER)/i], [NAME], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [VERSION, [NAME, "MIUI Browser"]], [/;fbav\/([\w\.]+);/i], [VERSION, [NAME, "Facebook"]], [/FBAN\/FBIOS|FB_IAB\/FB4A/i], [[NAME, "Facebook"]], [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i], [NAME, VERSION], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [VERSION, [NAME, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[NAME, /(.+)/, "$1 WebView"], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, "$1 $2"], VERSION], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [VERSION, [NAME, "Android Browser"]], [/(coc_coc_browser)\/([\w\.]+)/i], [[NAME, "Coc Coc"], VERSION], [/(sailfishbrowser)\/([\w\.]+)/i], [[NAME, "Sailfish Browser"], VERSION], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i], [[NAME, "Dolphin"], VERSION], [/(qihu|qhbrowser|qihoobrowser|360browser)/i], [[NAME, "360 Browser"]], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[NAME, "Chrome"], VERSION], [/(coast)\/([\w\.]+)/i], [[NAME, "Opera Coast"], VERSION], [/fxios\/([\w\.-]+)/i], [VERSION, [NAME, "Firefox"]], [/version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i], [VERSION, [NAME, "Mobile Safari"]], [/version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+)\s.*(mobile\s?safari|safari)(\/[\w\.]+)/i], [[NAME, "GSA"], VERSION], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [/(navigator|netscape)\/([\w\.-]+)/i], [[NAME, "Netscape"], VERSION], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i, /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [NAME, VERSION]],
    cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[ARCHITECTURE, "amd64"]], [/(ia32(?=;))/i], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[ARCHITECTURE, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[ARCHITECTURE, /ower/, "", util.lowerize]], [/(sun4\w)[;\)]/i], [[ARCHITECTURE, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[ARCHITECTURE, util.lowerize]]],
    device: [[/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/], [MODEL, [VENDOR, "Apple"], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i], [[MODEL, "Apple TV"], [VENDOR, "Apple"], [TYPE, SMARTTV]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)(\sbuild\/|\)).+silk\//i], [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, "Amazon"], [TYPE, MOBILE]], [/android.+aft([\w])(\sbuild\/|\))/i], [MODEL, [VENDOR, "Amazon"], [TYPE, SMARTTV]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i], [MODEL, [VENDOR, "Apple"], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i], [MODEL, [VENDOR, "BlackBerry"], [TYPE, MOBILE]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i], [MODEL, [VENDOR, "Asus"], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, "Sony"], [MODEL, "Xperia Tablet"], [TYPE, TABLET]], [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [MODEL, [VENDOR, "Sony"], [TYPE, MOBILE]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i], [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i], [MODEL, [VENDOR, "Sony"], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]], [/(nexus\s9)/i], [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]], [/d\/huawei([\w\s-]+)[;\)]/i, /android.+\s(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?)/i], [MODEL, [VENDOR, "Huawei"], [TYPE, MOBILE]], [/android.+(bah2?-a?[lw]\d{2})/i], [MODEL, [VENDOR, "Huawei"], [TYPE, TABLET]], [/(microsoft);\s(lumia[\s\w]+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [MODEL, [VENDOR, "Microsoft"], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i], [[MODEL, /\./g, " "], [VENDOR, "Microsoft"], [TYPE, MOBILE]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [MODEL, [VENDOR, "Motorola"], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, "Motorola"], [TYPE, TABLET]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, "SmartTV"], [VENDOR, "Samsung"], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i], [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]], [/android.+((sch-i[89]0\d|shw-m380s|SM-P605|SM-P610|SM-P587|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, TABLET]], [/smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV], MODEL], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, MOBILE]], [/sie-(\w*)/i], [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i], [[VENDOR, "Nokia"], MODEL, [TYPE, MOBILE]], [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i], [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]], [/android.+([vl]k\-?\d{3})\s+build/i], [MODEL, [VENDOR, "LG"], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[VENDOR, "LG"], MODEL, [TYPE, TABLET]], [/linux;\snetcast.+smarttv/i, /lg\snetcast\.tv-201\d/i], [[VENDOR, "LG"], MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [MODEL, [VENDOR, "LG"], [TYPE, MOBILE]], [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]], [/(lenovo)[_\s-]?([\w-]+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/linux;.+((jolla));/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/crkey/i], [[MODEL, "Chromecast"], [VENDOR, "Google"], [TYPE, SMARTTV]], [/android.+;\s(glass)\s\d/i], [MODEL, [VENDOR, "Google"], [TYPE, WEARABLE]], [/android.+;\s(pixel c)[\s)]/i], [MODEL, [VENDOR, "Google"], [TYPE, TABLET]], [/android.+;\s(pixel( [2-9]a?)?( xl)?)[\s)]/i], [MODEL, [VENDOR, "Google"], [TYPE, MOBILE]], [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i, /android.+(redmi[\s\-_]?(?:note|k)?(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i, /android.+(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i], [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, MOBILE]], [/android.+(mi[\s\-_]?(?:pad)(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i], [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, TABLET]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]], [/(mz)-([\w-]{2,})/i], [[VENDOR, "Meizu"], MODEL, [TYPE, MOBILE]], [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})[\s)]/i], [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]], [/android.+[;\/\s](Venue[\d\s]{2,7})\s+build/i], [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(\S(?:.*\S)?)\s+build/i], [[VENDOR, "Barnes & Noble"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]], [/android.+;\s(k88)\sbuild/i], [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i], [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i], [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i], [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]], [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i], [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]], [/android.+;\s(PH-1)\s/i], [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(Trio[\s\w\-\.]+)\s+build/i], [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i], [MODEL, [TYPE, MOBILE]], [/android .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i], [MODEL, [TYPE, TABLET]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[TYPE, util.lowerize], VENDOR, MODEL], [/[\s\/\(](smart-?tv)[;\)]/i], [[TYPE, SMARTTV]], [/(android[\w\.\s\-]{0,9});.+build/i], [MODEL, [VENDOR, "Generic"]], [/(phone)/i], [[TYPE, MOBILE]]],
    engine: [[/windows.+\sedge\/([\w\.]+)/i], [VERSION, [NAME, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [VERSION, [NAME, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [NAME, VERSION], [/rv\:([\w\.]{1,9}).+(gecko)/i], [VERSION, NAME]],
    os: [[/(xbox);\s+xbox\s([^\);]+)/i, /microsoft\s(windows)\s(vista|xp)/i], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, "Windows"], [VERSION, mapper.str, maps.os.windows.version]], [/\((bb)(10);/i], [[NAME, "BlackBerry"], VERSION], [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen|kaios)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i], [[NAME, "Symbian"], VERSION], [/\((series40);/i], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[NAME, "Firefox OS"], VERSION], [/crkey\/([\d\.]+)/i], [VERSION, [NAME, "Chromecast"]], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[NAME, "Chromium OS"], VERSION], [/(sunos)\s?([\w\.\d]*)/i], [[NAME, "Solaris"], VERSION], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i], [NAME, VERSION], [/(haiku)\s(\w+)/i], [NAME, VERSION], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i], [[VERSION, /_/g, "."], [NAME, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i], [[NAME, "Mac OS"], [VERSION, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i], [NAME, VERSION]]
  };

  var UAParser = function UAParser(uastring, extensions) {
    if (_typeof(uastring) === "object") {
      extensions = uastring;
      uastring = undefined;
    }

    if (!(this instanceof UAParser)) {
      return new UAParser(uastring, extensions).getResult();
    }

    var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

    this.getBrowser = function () {
      var browser = {
        name: undefined,
        version: undefined
      };
      mapper.rgx.call(browser, ua, rgxmap.browser);
      browser.major = util.major(browser.version);
      return browser;
    };

    this.getCPU = function () {
      var cpu = {
        architecture: undefined
      };
      mapper.rgx.call(cpu, ua, rgxmap.cpu);
      return cpu;
    };

    this.getDevice = function () {
      var device = {
        vendor: undefined,
        model: undefined,
        type: undefined
      };
      mapper.rgx.call(device, ua, rgxmap.device);
      return device;
    };

    this.getEngine = function () {
      var engine = {
        name: undefined,
        version: undefined
      };
      mapper.rgx.call(engine, ua, rgxmap.engine);
      return engine;
    };

    this.getOS = function () {
      var os = {
        name: undefined,
        version: undefined
      };
      mapper.rgx.call(os, ua, rgxmap.os);
      return os;
    };

    this.getResult = function () {
      return {
        ua: this.getUA(),
        browser: this.getBrowser(),
        engine: this.getEngine(),
        os: this.getOS(),
        device: this.getDevice(),
        cpu: this.getCPU()
      };
    };

    this.getUA = function () {
      return ua;
    };

    this.setUA = function (uastring) {
      ua = uastring;
      return this;
    };

    return this;
  };

  UAParser.VERSION = LIBVERSION;
  UAParser.BROWSER = {
    NAME: NAME,
    MAJOR: MAJOR,
    VERSION: VERSION
  };
  UAParser.CPU = {
    ARCHITECTURE: ARCHITECTURE
  };
  UAParser.DEVICE = {
    MODEL: MODEL,
    VENDOR: VENDOR,
    TYPE: TYPE,
    CONSOLE: CONSOLE,
    MOBILE: MOBILE,
    SMARTTV: SMARTTV,
    TABLET: TABLET,
    WEARABLE: WEARABLE,
    EMBEDDED: EMBEDDED
  };
  UAParser.ENGINE = {
    NAME: NAME,
    VERSION: VERSION
  };
  UAParser.OS = {
    NAME: NAME,
    VERSION: VERSION
  };

  if (( false ? undefined : _typeof(exports)) !== UNDEF_TYPE) {
    if (( false ? undefined : _typeof(module)) !== UNDEF_TYPE && module.exports) {
      exports = module.exports = UAParser;
    }

    exports.UAParser = UAParser;
  } else {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return UAParser;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  }

  var $ = window && (window.jQuery || window.Zepto);

  if ($ && !$.ua) {
    var parser = new UAParser();
    $.ua = parser.getResult();

    $.ua.get = function () {
      return parser.getUA();
    };

    $.ua.set = function (uastring) {
      parser.setUA(uastring);
      var result = parser.getResult();

      for (var prop in result) {
        $.ua[prop] = result[prop];
      }
    };
  }
})((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/DateRangePicker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/DateRangePicker.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateRangePicker; });
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _Datepicker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Datepicker.js */ "./node_modules/vanillajs-datepicker/js/Datepicker.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



 // filter out the config options inapproprite to pass to Datepicker

function filterOptions(options) {
  var newOpts = Object.assign({}, options);
  delete newOpts.inputs;
  delete newOpts.allowOneSidedRange;
  delete newOpts.maxNumberOfDates; // to ensure each datepicker handles a single date

  return newOpts;
}

function setupDatepicker(rangepicker, changeDateListener, el, options) {
  Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_0__["registerListeners"])(rangepicker, [[el, 'changeDate', changeDateListener]]);
  new _Datepicker_js__WEBPACK_IMPORTED_MODULE_2__["default"](el, options, rangepicker);
}

function onChangeDate(rangepicker, ev) {
  // to prevent both datepickers trigger the other side's update each other
  if (rangepicker._updating) {
    return;
  }

  rangepicker._updating = true;
  var target = ev.target;

  if (target.datepicker === undefined) {
    return;
  }

  var datepickers = rangepicker.datepickers;
  var setDateOptions = {
    render: false
  };
  var changedSide = rangepicker.inputs.indexOf(target);
  var otherSide = changedSide === 0 ? 1 : 0;
  var changedDate = datepickers[changedSide].dates[0];
  var otherDate = datepickers[otherSide].dates[0];

  if (changedDate !== undefined && otherDate !== undefined) {
    // if the start of the range > the end, swap them
    if (changedSide === 0 && changedDate > otherDate) {
      datepickers[0].setDate(otherDate, setDateOptions);
      datepickers[1].setDate(changedDate, setDateOptions);
    } else if (changedSide === 1 && changedDate < otherDate) {
      datepickers[0].setDate(changedDate, setDateOptions);
      datepickers[1].setDate(otherDate, setDateOptions);
    }
  } else if (!rangepicker.allowOneSidedRange) {
    // to prevent the range from becoming one-sided, copy changed side's
    // selection (no matter if it's empty) to the other side
    if (changedDate !== undefined || otherDate !== undefined) {
      setDateOptions.clear = true;
      datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
    }
  }

  datepickers[0].picker.update().render();
  datepickers[1].picker.update().render();
  delete rangepicker._updating;
}
/**
 * Class representing a date range picker
 */


var DateRangePicker = /*#__PURE__*/function () {
  /**
   * Create a date range picker
   * @param  {Element} element - element to bind a date range picker
   * @param  {Object} [options] - config options
   */
  function DateRangePicker(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DateRangePicker);

    var inputs = Array.isArray(options.inputs) ? options.inputs : Array.from(element.querySelectorAll('input'));

    if (inputs.length < 2) {
      return;
    }

    element.rangepicker = this;
    this.element = element;
    this.inputs = inputs.slice(0, 2);
    this.allowOneSidedRange = !!options.allowOneSidedRange;
    var changeDateListener = onChangeDate.bind(null, this);
    var cleanOptions = filterOptions(options); // in order for initial date setup to work right when pcicLvel > 0,
    // let Datepicker constructor add the instance to the rangepicker

    var datepickers = [];
    Object.defineProperty(this, 'datepickers', {
      get: function get() {
        return datepickers;
      }
    });
    setupDatepicker(this, changeDateListener, this.inputs[0], cleanOptions);
    setupDatepicker(this, changeDateListener, this.inputs[1], cleanOptions);
    Object.freeze(datepickers); // normalize the range if inital dates are given

    if (datepickers[0].dates.length > 0) {
      onChangeDate(this, {
        target: this.inputs[0]
      });
    } else if (datepickers[1].dates.length > 0) {
      onChangeDate(this, {
        target: this.inputs[1]
      });
    }
  }
  /**
   * @type {Array} - selected date of the linked date pickers
   */


  _createClass(DateRangePicker, [{
    key: "dates",
    get: function get() {
      return this.datepickers.length === 2 ? [this.datepickers[0].dates[0], this.datepickers[1].dates[0]] : undefined;
    }
    /**
     * Set new values to the config options
     * @param {Object} options - config options to update
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.allowOneSidedRange = !!options.allowOneSidedRange;
      var cleanOptions = filterOptions(options);
      this.datepickers[0].setOptions(cleanOptions);
      this.datepickers[1].setOptions(cleanOptions);
    }
    /**
     * Destroy the DateRangePicker instance
     * @return {DateRangePicker} - the instance destroyed
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.datepickers[0].destroy();
      this.datepickers[1].destroy();
      Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_0__["unregisterListeners"])(this);
      delete this.element.rangepicker;
    }
    /**
     * Get the start and end dates of the date range
     *
     * The method returns Date objects by default. If format string is passed,
     * it returns date strings formatted in given format.
     * The result array always contains 2 items (start date/end date) and
     * undefined is used for unselected side. (e.g. If none is selected,
     * the result will be [undefined, undefined]. If only the end date is set
     * when allowOneSidedRange config option is true, [undefined, endDate] will
     * be returned.)
     *
     * @param  {String} [format] - Format string to stringify the dates
     * @return {Array} - Start and end dates
     */

  }, {
    key: "getDates",
    value: function getDates() {
      var _this = this;

      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var callback = format ? function (date) {
        return Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_1__["formatDate"])(date, format, _this.datepickers[0].config.locale);
      } : function (date) {
        return new Date(date);
      };
      return this.dates.map(function (date) {
        return date === undefined ? date : callback(date);
      });
    }
    /**
     * Set the start and end dates of the date range
     *
     * The method calls datepicker.setDate() internally using each of the
     * arguments in start→end order.
     *
     * When a clear: true option object is passed instead of a date, the method
     * clears the date.
     *
     * If an invalid date, the same date as the current one or an option object
     * without clear: true is passed, the method considers that argument as an
     * "ineffective" argument because calling datepicker.setDate() with those
     * values makes no changes to the date selection.
     *
     * When the allowOneSidedRange config option is false, passing {clear: true}
     * to clear the range works only when it is done to the last effective
     * argument (in other words, passed to rangeEnd or to rangeStart along with
     * ineffective rangeEnd). This is because when the date range is changed,
     * it gets normalized based on the last change at the end of the changing
     * process.
     *
     * @param {Date|Number|String|Object} rangeStart - Start date of the range
     * or {clear: true} to clear the date
     * @param {Date|Number|String|Object} rangeEnd - End date of the range
     * or {clear: true} to clear the date
     */

  }, {
    key: "setDates",
    value: function setDates(rangeStart, rangeEnd) {
      var _this$datepickers = _slicedToArray(this.datepickers, 2),
          datepicker0 = _this$datepickers[0],
          datepicker1 = _this$datepickers[1];

      var origDates = this.dates; // If range normalization runs on every change, we can't set a new range
      // that starts after the end of the current range correctly because the
      // normalization process swaps start↔︎end right after setting the new start
      // date. To prevent this, the normalization process needs to run once after
      // both of the new dates are set.

      this._updating = true;
      datepicker0.setDate(rangeStart);
      datepicker1.setDate(rangeEnd);
      delete this._updating;

      if (datepicker1.dates[0] !== origDates[1]) {
        onChangeDate(this, {
          target: this.inputs[1]
        });
      } else if (datepicker0.dates[0] !== origDates[0]) {
        onChangeDate(this, {
          target: this.inputs[0]
        });
      }
    }
  }]);

  return DateRangePicker;
}();



/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/Datepicker.js":
/*!************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/Datepicker.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Datepicker; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./i18n/base-locales.js */ "./node_modules/vanillajs-datepicker/js/i18n/base-locales.js");
/* harmony import */ var _options_defaultOptions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./options/defaultOptions.js */ "./node_modules/vanillajs-datepicker/js/options/defaultOptions.js");
/* harmony import */ var _options_processOptions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options/processOptions.js */ "./node_modules/vanillajs-datepicker/js/options/processOptions.js");
/* harmony import */ var _picker_Picker_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./picker/Picker.js */ "./node_modules/vanillajs-datepicker/js/picker/Picker.js");
/* harmony import */ var _events_functions_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events/functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");
/* harmony import */ var _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./events/inputFieldListeners.js */ "./node_modules/vanillajs-datepicker/js/events/inputFieldListeners.js");
/* harmony import */ var _events_otherListeners_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./events/otherListeners.js */ "./node_modules/vanillajs-datepicker/js/events/otherListeners.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }













function stringifyDates(dates, config) {
  return dates.map(function (dt) {
    return Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(dt, config.format, config.locale);
  }).join(config.dateDelimiter);
} // parse input dates and create an array of time values for selection
// returns undefined if there are no valid dates in inputDates
// when origDates (current selection) is passed, the function works to mix
// the input dates into the current selection


function processInputDates(datepicker, inputDates) {
  var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var config = datepicker.config,
      origDates = datepicker.dates,
      rangepicker = datepicker.rangepicker;

  if (inputDates.length === 0) {
    // empty input is considered valid unless origiDates is passed
    return clear ? [] : undefined;
  }

  var rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
  var newDates = inputDates.reduce(function (dates, dt) {
    var date = Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["parseDate"])(dt, config.format, config.locale);

    if (date === undefined) {
      return dates;
    }

    if (config.pickLevel > 0) {
      // adjust to 1st of the month/Jan 1st of the year
      // or to the last day of the monh/Dec 31st of the year if the datepicker
      // is the range-end picker of a rangepicker
      var _dt = new Date(date);

      if (config.pickLevel === 1) {
        date = rangeEnd ? _dt.setMonth(_dt.getMonth() + 1, 0) : _dt.setDate(1);
      } else {
        date = rangeEnd ? _dt.setFullYear(_dt.getFullYear() + 1, 0, 0) : _dt.setMonth(0, 1);
      }
    }

    if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"])(date, config.minDate, config.maxDate) && !dates.includes(date) && !config.datesDisabled.includes(date) && !config.daysOfWeekDisabled.includes(new Date(date).getDay())) {
      dates.push(date);
    }

    return dates;
  }, []);

  if (newDates.length === 0) {
    return;
  }

  if (config.multidate && !clear) {
    // get the synmetric difference between origDates and newDates
    newDates = newDates.reduce(function (dates, date) {
      if (!origDates.includes(date)) {
        dates.push(date);
      }

      return dates;
    }, origDates.filter(function (date) {
      return !newDates.includes(date);
    }));
  } // do length check always because user can input multiple dates regardless of the mode


  return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates ? newDates.slice(config.maxNumberOfDates * -1) : newDates;
} // refresh the UI elements
// modes: 1: input only, 2, picker only, 3 both


function refreshUI(datepicker) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var quickRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var config = datepicker.config,
      picker = datepicker.picker,
      inputField = datepicker.inputField;

  if (mode & 2) {
    var newView = picker.active ? config.pickLevel : config.startView;
    picker.update().changeView(newView).render(quickRender);
  }

  if (mode & 1 && inputField) {
    inputField.value = stringifyDates(datepicker.dates, config);
  }
}

function _setDate(datepicker, inputDates, options) {
  var clear = options.clear,
      render = options.render,
      autohide = options.autohide;

  if (render === undefined) {
    render = true;
  }

  if (!render) {
    autohide = false;
  } else if (autohide === undefined) {
    autohide = datepicker.config.autohide;
  }

  var newDates = processInputDates(datepicker, inputDates, clear);

  if (!newDates) {
    return;
  }

  if (newDates.toString() !== datepicker.dates.toString()) {
    datepicker.dates = newDates;
    refreshUI(datepicker, render ? 3 : 1);
    Object(_events_functions_js__WEBPACK_IMPORTED_MODULE_8__["triggerDatepickerEvent"])(datepicker, 'changeDate');
  } else {
    refreshUI(datepicker, 1);
  }

  if (autohide) {
    datepicker.hide();
  }
}
/**
 * Class representing a date picker
 */


var Datepicker = /*#__PURE__*/function () {
  /**
   * Create a date picker
   * @param  {Element} element - element to bind a date picker
   * @param  {Object} [options] - config options
   * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
   * date picker belongs to. Use this only when creating date picker as a part
   * of date range picker
   */
  function Datepicker(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rangepicker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, Datepicker);

    element.datepicker = this;
    this.element = element; // set up config

    var config = this.config = Object.assign({
      buttonClass: options.buttonClass && String(options.buttonClass) || 'button',
      container: document.body,
      defaultViewDate: Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["today"])(),
      maxDate: undefined,
      minDate: undefined
    }, Object(_options_processOptions_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_options_defaultOptions_js__WEBPACK_IMPORTED_MODULE_5__["default"], this));
    this._options = options;
    Object.assign(config, Object(_options_processOptions_js__WEBPACK_IMPORTED_MODULE_6__["default"])(options, this)); // configure by type

    var inline = this.inline = element.tagName !== 'INPUT';
    var inputField;
    var initialDates;

    if (inline) {
      config.container = element;
      initialDates = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["stringToArray"])(element.dataset.date, config.dateDelimiter);
      delete element.dataset.date;
    } else {
      var container = options.container ? document.querySelector(options.container) : null;

      if (container) {
        config.container = container;
      }

      inputField = this.inputField = element;
      inputField.classList.add('datepicker-input');
      initialDates = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["stringToArray"])(inputField.value, config.dateDelimiter);
    }

    if (rangepicker) {
      // check validiry
      var index = rangepicker.inputs.indexOf(inputField);
      var datepickers = rangepicker.datepickers;

      if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
        throw Error('Invalid rangepicker object.');
      } // attach itaelf to the rangepicker here so that processInputDates() can
      // determine if this is the range-end picker of the rangepicker while
      // setting inital values when pickLevel > 0


      datepickers[index] = this; // add getter for rangepicker

      Object.defineProperty(this, 'rangepicker', {
        get: function get() {
          return rangepicker;
        }
      });
    } // set initial value


    this.dates = processInputDates(this, initialDates) || [];

    if (inputField) {
      inputField.value = stringifyDates(this.dates, config);
    }

    var picker = this.picker = new _picker_Picker_js__WEBPACK_IMPORTED_MODULE_7__["default"](this);

    if (inline) {
      this.show();
    } else {
      // set up event listeners in other modes
      var onMousedownDocument = _events_otherListeners_js__WEBPACK_IMPORTED_MODULE_10__["onClickOutside"].bind(null, this);
      var listeners = [[inputField, 'keydown', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_9__["onKeydown"].bind(null, this)], [inputField, 'focus', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_9__["onFocus"].bind(null, this)], [inputField, 'mousedown', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_9__["onMousedown"].bind(null, this)], [inputField, 'click', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickInput"].bind(null, this)], [inputField, 'paste', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_9__["onPaste"].bind(null, this)], [document, 'mousedown', onMousedownDocument], [document, 'touchstart', onMousedownDocument], [window, 'resize', picker.place.bind(picker)]];
      Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_3__["registerListeners"])(this, listeners);
    }
  }
  /**
   * Format Date object or time value in given format and language
   * @param  {Date|Number} date - date or time value to format
   * @param  {String|Object} format - format string or object that contains
   * toDisplay() custom formatter, whose signature is
   * - args:
   *   - date: {Date} - Date instance of the date passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {String} formatted date
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {String} formatted date
   */


  _createClass(Datepicker, [{
    key: "active",
    get:
    /**
     * @type {Boolean} - Whether the picker element is shown. `true` whne shown
     */
    function get() {
      return !!(this.picker && this.picker.active);
    }
    /**
     * @type {HTMLDivElement} - DOM object of picker element
     */

  }, {
    key: "pickerElement",
    get: function get() {
      return this.picker ? this.picker.element : undefined;
    }
    /**
     * Set new values to the config options
     * @param {Object} options - config options to update
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var picker = this.picker;
      var newOptions = Object(_options_processOptions_js__WEBPACK_IMPORTED_MODULE_6__["default"])(options, this);
      Object.assign(this._options, options);
      Object.assign(this.config, newOptions);
      picker.setOptions(newOptions);
      refreshUI(this, 3);
    }
    /**
     * Show the picker element
     */

  }, {
    key: "show",
    value: function show() {
      if (this.inputField && this.inputField.disabled) {
        return;
      }

      this.picker.show();
    }
    /**
     * Hide the picker element
     * Not available on inline picker
     */

  }, {
    key: "hide",
    value: function hide() {
      if (this.inline) {
        return;
      }

      this.picker.hide();
      this.picker.update().changeView(this.config.startView).render();
    }
    /**
     * Destroy the Datepicker instance
     * @return {Detepicker} - the instance destroyed
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.hide();
      Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_3__["unregisterListeners"])(this);
      this.picker.detach();

      if (!this.inline) {
        this.inputField.classList.remove('datepicker-input');
      }

      delete this.element.datepicker;
      return this;
    }
    /**
     * Get the selected date(s)
     *
     * The method returns a Date object of selected date by default, and returns
     * an array of selected dates in multidate mode. If format string is passed,
     * it returns date string(s) formatted in given format.
     *
     * @param  {String} [format] - Format string to stringify the date(s)
     * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
     * selected, empty array in multidate mode and untitled in sigledate mode
     */

  }, {
    key: "getDate",
    value: function getDate() {
      var _this = this;

      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var callback = format ? function (date) {
        return Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(date, format, _this.config.locale);
      } : function (date) {
        return new Date(date);
      };

      if (this.config.multidate) {
        return this.dates.map(callback);
      }

      if (this.dates.length > 0) {
        return callback(this.dates[0]);
      }
    }
    /**
     * Set selected date(s)
     *
     * In multidate mode, you can pass multiple dates as a series of arguments
     * or an array. (Since each date is parsed individually, the type of the
     * dates doesn't have to be the same.)
     * The given dates are used to toggle the select status of each date. The
     * number of selected dates is kept from exceeding the length set to
     * maxNumberOfDates.
     *
     * With clear: true option, the method can be used to clear the selection
     * and to replace the selection instead of toggling in multidate mode.
     * If the option is passed with no date arguments or an empty dates array,
     * it works as "clear" (clear the selection then set nothing), and if the
     * option is passed with new dates to select, it works as "replace" (clear
     * the selection then set the given dates)
     *
     * When render: false option is used, the method omits re-rendering the
     * picker element. In this case, you need to call refresh() method later in
     * order for the picker element to reflect the changes. The input field is
     * refreshed always regardless of this option.
     *
     * When invalid (unparsable, repeated, disabled or out-of-range) dates are
     * passed, the method ignores them and applies only valid ones. In the case
     * that all the given dates are invalid, which is distinguished from passing
     * no dates, the method considers it as an error and leaves the selection
     * untouched.
     *
     * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
     * objects, time values or mix of those for new selection
     * @param {Object} [options] - function options
     * - clear: {boolean} - Whether to clear the existing selection
     *     defualt: false
     * - render: {boolean} - Whether to re-render the picker element
     *     default: true
     * - autohide: {boolean} - Whether to hide the picker element after re-render
     *     Ignored when used with render: false
     *     default: config.autohide
     */

  }, {
    key: "setDate",
    value: function setDate() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var dates = [].concat(args);
      var opts = {};
      var lastArg = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["lastItemOf"])(args);

      if (_typeof(lastArg) === 'object' && !Array.isArray(lastArg) && !(lastArg instanceof Date) && lastArg) {
        Object.assign(opts, dates.pop());
      }

      var inputDates = Array.isArray(dates[0]) ? dates[0] : dates;

      _setDate(this, inputDates, opts);
    }
    /**
     * Update the selected date(s) with input field's value
     * Not available on inline picker
     *
     * The input field will be refreshed with properly formatted date string.
     *
     * @param  {Object} [options] - function options
     * - autohide: {boolean} - whether to hide the picker element after refresh
     *     default: false
     */

  }, {
    key: "update",
    value: function update() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (this.inline) {
        return;
      }

      var opts = {
        clear: true,
        autohide: !!(options && options.autohide)
      };
      var inputDates = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["stringToArray"])(this.inputField.value, this.config.dateDelimiter);

      _setDate(this, inputDates, opts);
    }
    /**
     * Refresh the picker element and the associated input field
     * @param {String} [target] - target item when refreshing one item only
     * 'picker' or 'input'
     * @param {Boolean} [forceRender] - whether to re-render the picker element
     * regardless of its state instead of optimized refresh
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var forceRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (target && typeof target !== 'string') {
        forceRender = target;
        target = undefined;
      }

      var mode;

      if (target === 'picker') {
        mode = 2;
      } else if (target === 'input') {
        mode = 1;
      } else {
        mode = 3;
      }

      refreshUI(this, mode, !forceRender);
    }
    /**
     * Enter edit mode
     * Not available on inline picker or when the picker element is hidden
     */

  }, {
    key: "enterEditMode",
    value: function enterEditMode() {
      if (this.inline || !this.picker.active || this.editMode) {
        return;
      }

      this.editMode = true;
      this.inputField.classList.add('in-edit');
    }
    /**
     * Exit from edit mode
     * Not available on inline picker
     * @param  {Object} [options] - function options
     * - update: {boolean} - whether to call update() after exiting
     *     If false, input field is revert to the existing selection
     *     default: false
     */

  }, {
    key: "exitEditMode",
    value: function exitEditMode() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (this.inline || !this.editMode) {
        return;
      }

      var opts = Object.assign({
        update: false
      }, options);
      delete this.editMode;
      this.inputField.classList.remove('in-edit');

      if (opts.update) {
        this.update(opts);
      }
    }
  }], [{
    key: "formatDate",
    value: function formatDate(date, format, lang) {
      return Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(date, format, lang && _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_4__["locales"][lang] || _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_4__["locales"].en);
    }
    /**
     * Parse date string
     * @param  {String|Date|Number} dateStr - date string, Date object or time
     * value to parse
     * @param  {String|Object} format - format string or object that contains
     * toValue() custom parser, whose signature is
     * - args:
     *   - dateStr: {String|Date|Number} - the dateStr passed to the method
     *   - format: {Object} - the format object passed to the method
     *   - locale: {Object} - locale for the language specified by `lang`
     * - return:
     *     {Date|Number} parsed date or its time value
     * @param  {String} [lang=en] - language code for the locale to use
     * @return {Number} time value of parsed date
     */

  }, {
    key: "parseDate",
    value: function parseDate(dateStr, format, lang) {
      return Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["parseDate"])(dateStr, format, lang && _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_4__["locales"][lang] || _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_4__["locales"].en);
    }
    /**
     * @type {Object} - Installed locales in `[languageCode]: localeObject` format
     * en`:_English (US)_ is pre-installed.
     */

  }, {
    key: "locales",
    get: function get() {
      return _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_4__["locales"];
    }
  }]);

  return Datepicker;
}();



/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/functions.js":
/*!******************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/functions.js ***!
  \******************************************************************/
/*! exports provided: triggerDatepickerEvent, goToPrevOrNext, switchView, unfocus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerDatepickerEvent", function() { return triggerDatepickerEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goToPrevOrNext", function() { return goToPrevOrNext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchView", function() { return switchView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unfocus", function() { return unfocus; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");


function triggerDatepickerEvent(datepicker, type) {
  var detail = {
    date: datepicker.getDate(),
    viewDate: new Date(datepicker.picker.viewDate),
    viewId: datepicker.picker.currentView.id,
    datepicker: datepicker
  };
  datepicker.element.dispatchEvent(new CustomEvent(type, {
    detail: detail
  }));
} // direction: -1 (to previous), 1 (to next)

function goToPrevOrNext(datepicker, direction) {
  var _datepicker$config = datepicker.config,
      minDate = _datepicker$config.minDate,
      maxDate = _datepicker$config.maxDate;
  var _datepicker$picker = datepicker.picker,
      currentView = _datepicker$picker.currentView,
      viewDate = _datepicker$picker.viewDate;
  var newViewDate;

  switch (currentView.id) {
    case 0:
      newViewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addMonths"])(viewDate, direction);
      break;

    case 1:
      newViewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addYears"])(viewDate, direction);
      break;

    default:
      newViewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addYears"])(viewDate, direction * currentView.navStep);
  }

  newViewDate = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["limitToRange"])(newViewDate, minDate, maxDate);
  datepicker.picker.changeFocus(newViewDate).render();
}
function switchView(datepicker) {
  var viewId = datepicker.picker.currentView.id;

  if (viewId === datepicker.config.maxView) {
    return;
  }

  datepicker.picker.changeView(viewId + 1).render();
}
function unfocus(datepicker) {
  if (datepicker.config.updateOnBlur) {
    datepicker.update({
      autohide: true
    });
  } else {
    datepicker.refresh('input');
    datepicker.hide();
  }
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/inputFieldListeners.js":
/*!****************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/inputFieldListeners.js ***!
  \****************************************************************************/
/*! exports provided: onKeydown, onFocus, onMousedown, onClickInput, onPaste */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onKeydown", function() { return onKeydown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onFocus", function() { return onFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMousedown", function() { return onMousedown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickInput", function() { return onClickInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onPaste", function() { return onPaste; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");


 // Find the closest date that doesn't meet the condition for unavailable date
// Returns undefined if no available date is found
// addFn: function to calculate the next date
//   - args: time value, amount
// increase: amount to pass to addFn
// testFn: function to test the unavailablity of the date
//   - args: time value; retun: true if unavailable

function findNextAvailableOne(date, addFn, increase, testFn, min, max) {
  if (!Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"])(date, min, max)) {
    return;
  }

  if (testFn(date)) {
    var newDate = addFn(date, increase);
    return findNextAvailableOne(newDate, addFn, increase, testFn, min, max);
  }

  return date;
} // direction: -1 (left/up), 1 (right/down)
// vertical: true for up/down, false for left/right


function moveByArrowKey(datepicker, ev, direction, vertical) {
  var picker = datepicker.picker;
  var currentView = picker.currentView;
  var step = currentView.step || 1;
  var viewDate = picker.viewDate;
  var addFn;
  var testFn;

  switch (currentView.id) {
    case 0:
      if (vertical) {
        viewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addDays"])(viewDate, direction * 7);
      } else if (ev.ctrlKey || ev.metaKey) {
        viewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addYears"])(viewDate, direction);
      } else {
        viewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addDays"])(viewDate, direction);
      }

      addFn = _lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addDays"];

      testFn = function testFn(date) {
        return currentView.disabled.includes(date);
      };

      break;

    case 1:
      viewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addMonths"])(viewDate, vertical ? direction * 4 : direction);
      addFn = _lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addMonths"];

      testFn = function testFn(date) {
        var dt = new Date(date);
        var year = currentView.year,
            disabled = currentView.disabled;
        return dt.getFullYear() === year && disabled.includes(dt.getMonth());
      };

      break;

    default:
      viewDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addYears"])(viewDate, direction * (vertical ? 4 : 1) * step);
      addFn = _lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addYears"];

      testFn = function testFn(date) {
        return currentView.disabled.includes(Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(date, step));
      };

  }

  viewDate = findNextAvailableOne(viewDate, addFn, direction < 0 ? -step : step, testFn, currentView.minDate, currentView.maxDate);

  if (viewDate !== undefined) {
    picker.changeFocus(viewDate).render();
  }
}

function onKeydown(datepicker, ev) {
  if (ev.key === 'Tab') {
    Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["unfocus"])(datepicker);
    return;
  }

  var picker = datepicker.picker;
  var _picker$currentView = picker.currentView,
      id = _picker$currentView.id,
      isMinView = _picker$currentView.isMinView;

  if (!picker.active) {
    switch (ev.key) {
      case 'ArrowDown':
      case 'Escape':
        picker.show();
        break;

      case 'Enter':
        datepicker.update();
        break;

      default:
        return;
    }
  } else if (datepicker.editMode) {
    switch (ev.key) {
      case 'Escape':
        picker.hide();
        break;

      case 'Enter':
        datepicker.exitEditMode({
          update: true,
          autohide: datepicker.config.autohide
        });
        break;

      default:
        return;
    }
  } else {
    switch (ev.key) {
      case 'Escape':
        picker.hide();
        break;

      case 'ArrowLeft':
        if (ev.ctrlKey || ev.metaKey) {
          Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["goToPrevOrNext"])(datepicker, -1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, false);
        }

        break;

      case 'ArrowRight':
        if (ev.ctrlKey || ev.metaKey) {
          Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["goToPrevOrNext"])(datepicker, 1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, 1, false);
        }

        break;

      case 'ArrowUp':
        if (ev.ctrlKey || ev.metaKey) {
          Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["switchView"])(datepicker);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, true);
        }

        break;

      case 'ArrowDown':
        if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
          return;
        }

        moveByArrowKey(datepicker, ev, 1, true);
        break;

      case 'Enter':
        if (isMinView) {
          datepicker.setDate(picker.viewDate);
        } else {
          picker.changeView(id - 1).render();
        }

        break;

      case 'Backspace':
      case 'Delete':
        datepicker.enterEditMode();
        return;

      default:
        if (ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
        }

        return;
    }
  }

  ev.preventDefault();
  ev.stopPropagation();
}
function onFocus(datepicker) {
  if (datepicker.config.showOnFocus) {
    datepicker.show();
  }
} // for the prevention for entering edit mode while getting focus on click

function onMousedown(datepicker, ev) {
  var el = ev.target;

  if (datepicker.picker.active || datepicker.config.showOnClick) {
    el._active = el === document.activeElement;
    el._clicking = setTimeout(function () {
      delete el._active;
      delete el._clicking;
    }, 2000);
  }
}
function onClickInput(datepicker, ev) {
  var el = ev.target;

  if (!el._clicking) {
    return;
  }

  clearTimeout(el._clicking);
  delete el._clicking;

  if (el._active) {
    datepicker.enterEditMode();
  }

  delete el._active;

  if (datepicker.config.showOnClick) {
    datepicker.show();
  }
}
function onPaste(datepicker, ev) {
  if (ev.clipboardData.types.includes('text/plain')) {
    datepicker.enterEditMode();
  }
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/otherListeners.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/otherListeners.js ***!
  \***********************************************************************/
/*! exports provided: onClickOutside */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickOutside", function() { return onClickOutside; });
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");

 // for the `document` to delegate the events from outside the picker/input field

function onClickOutside(datepicker, ev) {
  var element = datepicker.element;

  if (element !== document.activeElement) {
    return;
  }

  var pickerElem = datepicker.picker.element;

  if (Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_0__["findElementInEventPath"])(ev, function (el) {
    return el === element || el === pickerElem;
  })) {
    return;
  }

  Object(_functions_js__WEBPACK_IMPORTED_MODULE_1__["unfocus"])(datepicker);
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/pickerListeners.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/pickerListeners.js ***!
  \************************************************************************/
/*! exports provided: onClickTodayBtn, onClickClearBtn, onClickViewSwitch, onClickPrevBtn, onClickNextBtn, onClickView, onClickPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickTodayBtn", function() { return onClickTodayBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickClearBtn", function() { return onClickClearBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickViewSwitch", function() { return onClickViewSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickPrevBtn", function() { return onClickPrevBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickNextBtn", function() { return onClickNextBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickView", function() { return onClickView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickPicker", function() { return onClickPicker; });
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");




function goToSelectedMonthOrYear(datepicker, selection) {
  var picker = datepicker.picker;
  var viewDate = new Date(picker.viewDate);
  var viewId = picker.currentView.id;
  var newDate = viewId === 1 ? Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_0__["addMonths"])(viewDate, selection - viewDate.getMonth()) : Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_0__["addYears"])(viewDate, selection - viewDate.getFullYear());
  picker.changeFocus(newDate).changeView(viewId - 1).render();
}

function onClickTodayBtn(datepicker) {
  var picker = datepicker.picker;
  var currentDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_0__["today"])();

  if (datepicker.config.todayBtnMode === 1) {
    if (datepicker.config.autohide) {
      datepicker.setDate(currentDate);
      return;
    }

    datepicker.setDate(currentDate, {
      render: false
    });
    picker.update();
  }

  if (picker.viewDate !== currentDate) {
    picker.changeFocus(currentDate);
  }

  picker.changeView(0).render();
}
function onClickClearBtn(datepicker) {
  datepicker.setDate({
    clear: true
  });
}
function onClickViewSwitch(datepicker) {
  Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["switchView"])(datepicker);
}
function onClickPrevBtn(datepicker) {
  Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["goToPrevOrNext"])(datepicker, -1);
}
function onClickNextBtn(datepicker) {
  Object(_functions_js__WEBPACK_IMPORTED_MODULE_2__["goToPrevOrNext"])(datepicker, 1);
} // For the picker's main block to delegete the events from `datepicker-cell`s

function onClickView(datepicker, ev) {
  var target = Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_1__["findElementInEventPath"])(ev, '.datepicker-cell');

  if (!target || target.classList.contains('disabled')) {
    return;
  }

  var _datepicker$picker$cu = datepicker.picker.currentView,
      id = _datepicker$picker$cu.id,
      isMinView = _datepicker$picker$cu.isMinView;

  if (isMinView) {
    datepicker.setDate(Number(target.dataset.date));
  } else if (id === 1) {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.month));
  } else {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.year));
  }
}
function onClickPicker(datepicker) {
  if (!datepicker.inline && !datepicker.config.disableTouchKeyboard) {
    datepicker.inputField.focus();
  }
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/i18n/base-locales.js":
/*!*******************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/i18n/base-locales.js ***!
  \*******************************************************************/
/*! exports provided: locales */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locales", function() { return locales; });
// default locales
var locales = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM y"
  }
};

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/date-format.js":
/*!*****************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/date-format.js ***!
  \*****************************************************************/
/*! exports provided: reFormatTokens, reNonDateParts, parseDate, formatDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reFormatTokens", function() { return reFormatTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reNonDateParts", function() { return reNonDateParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDate", function() { return parseDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");

 // pattern for format parts

var reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/; // pattern for non date parts

var reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/; // cache for persed formats

var knownFormats = {}; // parse funtions for date parts

var parseFns = {
  y: function y(date, year) {
    return new Date(date).setFullYear(parseInt(year, 10));
  },
  m: function m(date, month, locale) {
    var newDate = new Date(date);
    var monthIndex = parseInt(month, 10) - 1;

    if (isNaN(monthIndex)) {
      if (!month) {
        return NaN;
      }

      var monthName = month.toLowerCase();

      var compareNames = function compareNames(name) {
        return name.toLowerCase().startsWith(monthName);
      }; // compare with both short and full names because some locales have periods
      // in the short names (not equal to the first X letters of the full names)


      monthIndex = locale.monthsShort.findIndex(compareNames);

      if (monthIndex < 0) {
        monthIndex = locale.months.findIndex(compareNames);
      }

      if (monthIndex < 0) {
        return NaN;
      }
    }

    newDate.setMonth(monthIndex);
    return newDate.getMonth() !== normalizeMonth(monthIndex) ? newDate.setDate(0) : newDate.getTime();
  },
  d: function d(date, day) {
    return new Date(date).setDate(parseInt(day, 10));
  }
}; // format functions for date parts

var formatFns = {
  d: function d(date) {
    return date.getDate();
  },
  dd: function dd(date) {
    return padZero(date.getDate(), 2);
  },
  D: function D(date, locale) {
    return locale.daysShort[date.getDay()];
  },
  DD: function DD(date, locale) {
    return locale.days[date.getDay()];
  },
  m: function m(date) {
    return date.getMonth() + 1;
  },
  mm: function mm(date) {
    return padZero(date.getMonth() + 1, 2);
  },
  M: function M(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MM: function MM(date, locale) {
    return locale.months[date.getMonth()];
  },
  y: function y(date) {
    return date.getFullYear();
  },
  yy: function yy(date) {
    return padZero(date.getFullYear(), 2).slice(-2);
  },
  yyyy: function yyyy(date) {
    return padZero(date.getFullYear(), 4);
  }
}; // get month index in normal range (0 - 11) from any number

function normalizeMonth(monthIndex) {
  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}

function padZero(num, length) {
  return num.toString().padStart(length, '0');
}

function parseFormatString(format) {
  if (typeof format !== 'string') {
    throw new Error("Invalid date format.");
  }

  if (format in knownFormats) {
    return knownFormats[format];
  } // sprit the format string into parts and seprators


  var separators = format.split(reFormatTokens);
  var parts = format.match(new RegExp(reFormatTokens, 'g'));

  if (separators.length === 0 || !parts) {
    throw new Error("Invalid date format.");
  } // collect format functions used in the format


  var partFormatters = parts.map(function (token) {
    return formatFns[token];
  }); // collect parse function keys used in the format
  // iterate over parseFns' keys in order to keep the order of the keys.

  var partParserKeys = Object.keys(parseFns).reduce(function (keys, key) {
    var token = parts.find(function (part) {
      return part[0] !== 'D' && part[0].toLowerCase() === key;
    });

    if (token) {
      keys.push(key);
    }

    return keys;
  }, []);
  return knownFormats[format] = {
    parser: function parser(dateStr, locale) {
      var dateParts = dateStr.split(reNonDateParts).reduce(function (dtParts, part, index) {
        if (part.length > 0 && parts[index]) {
          var token = parts[index][0];

          if (token === 'M') {
            dtParts.m = part;
          } else if (token !== 'D') {
            dtParts[token] = part;
          }
        }

        return dtParts;
      }, {}); // iterate over partParserkeys so that the parsing is made in the oder
      // of year, month and day to prevent the day parser from correcting last
      // day of month wrongly

      return partParserKeys.reduce(function (origDate, key) {
        var newDate = parseFns[key](origDate, dateParts[key], locale); // ingnore the part failed to parse

        return isNaN(newDate) ? origDate : newDate;
      }, Object(_date_js__WEBPACK_IMPORTED_MODULE_0__["today"])());
    },
    formatter: function formatter(date, locale) {
      var dateStr = partFormatters.reduce(function (str, fn, index) {
        return str += "".concat(separators[index]).concat(fn(date, locale));
      }, ''); // separators' length is always parts' length + 1,

      return dateStr += Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["lastItemOf"])(separators);
    }
  };
}

function parseDate(dateStr, format, locale) {
  if (dateStr instanceof Date || typeof dateStr === 'number') {
    var date = Object(_date_js__WEBPACK_IMPORTED_MODULE_0__["stripTime"])(dateStr);
    return isNaN(date) ? undefined : date;
  }

  if (!dateStr) {
    return undefined;
  }

  if (dateStr === 'today') {
    return Object(_date_js__WEBPACK_IMPORTED_MODULE_0__["today"])();
  }

  if (format && format.toValue) {
    var _date = format.toValue(dateStr, format, locale);

    return isNaN(_date) ? undefined : Object(_date_js__WEBPACK_IMPORTED_MODULE_0__["stripTime"])(_date);
  }

  return parseFormatString(format).parser(dateStr, locale);
}
function formatDate(date, format, locale) {
  if (isNaN(date) || !date && date !== 0) {
    return '';
  }

  var dateObj = typeof date === 'number' ? new Date(date) : date;

  if (format.toDisplay) {
    return format.toDisplay(dateObj, format, locale);
  }

  return parseFormatString(format).formatter(dateObj, locale);
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/date.js":
/*!**********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/date.js ***!
  \**********************************************************/
/*! exports provided: stripTime, today, dateValue, addDays, addWeeks, addMonths, addYears, dayOfTheWeekOf, getWeek, startOfYearPeriod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripTime", function() { return stripTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "today", function() { return today; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateValue", function() { return dateValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDays", function() { return addDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addWeeks", function() { return addWeeks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMonths", function() { return addMonths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addYears", function() { return addYears; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dayOfTheWeekOf", function() { return dayOfTheWeekOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWeek", function() { return getWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startOfYearPeriod", function() { return startOfYearPeriod; });
function stripTime(timeValue) {
  return new Date(timeValue).setHours(0, 0, 0, 0);
}
function today() {
  return new Date().setHours(0, 0, 0, 0);
} // Get the time value of the start of given date or year, month and day

function dateValue() {
  switch (arguments.length) {
    case 0:
      return today();

    case 1:
      return stripTime(arguments.length <= 0 ? undefined : arguments[0]);
  } // use setFullYear() to keep 2-digit year from being mapped to 1900-1999


  var newDate = new Date(0);
  newDate.setFullYear.apply(newDate, arguments);
  return newDate.setHours(0, 0, 0, 0);
}
function addDays(date, amount) {
  var newDate = new Date(date);
  return newDate.setDate(newDate.getDate() + amount);
}
function addWeeks(date, amount) {
  return addDays(date, amount * 7);
}
function addMonths(date, amount) {
  // If the day of the date is not in the new month, the last day of the new
  // month will be returned. e.g. Jan 31 + 1 month → Feb 28 (not Mar 03)
  var newDate = new Date(date);
  var monthsToSet = newDate.getMonth() + amount;
  var expectedMonth = monthsToSet % 12;

  if (expectedMonth < 0) {
    expectedMonth += 12;
  }

  var time = newDate.setMonth(monthsToSet);
  return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
}
function addYears(date, amount) {
  // If the date is Feb 29 and the new year is not a leap year, Feb 28 of the
  // new year will be returned.
  var newDate = new Date(date);
  var expectedMonth = newDate.getMonth();
  var time = newDate.setFullYear(newDate.getFullYear() + amount);
  return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
} // Calculate the distance bettwen 2 days of the week

function dayDiff(day, from) {
  return (day - from + 7) % 7;
} // Get the date of the specified day of the week of given base date


function dayOfTheWeekOf(baseDate, dayOfWeek) {
  var weekStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var baseDay = new Date(baseDate).getDay();
  return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
} // Get the ISO week of a date

function getWeek(date) {
  // start of ISO week is Monday
  var thuOfTheWeek = dayOfTheWeekOf(date, 4, 1); // 1st week == the week where the 4th of January is in

  var firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
  return Math.round((thuOfTheWeek - firstThu) / 604800000) + 1;
} // Get the start year of the period of years that includes given date
// years: length of the year period

function startOfYearPeriod(date, years) {
  /* @see https://en.wikipedia.org/wiki/Year_zero#ISO_8601 */
  var year = new Date(date).getFullYear();
  return Math.floor(year / years) * years;
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/dom.js":
/*!*********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/dom.js ***!
  \*********************************************************/
/*! exports provided: parseHTML, isVisible, hideElement, showElement, emptyChildNodes, replaceChildNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTML", function() { return parseHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVisible", function() { return isVisible; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideElement", function() { return hideElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showElement", function() { return showElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyChildNodes", function() { return emptyChildNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceChildNodes", function() { return replaceChildNodes; });
var range = document.createRange();
function parseHTML(html) {
  return range.createContextualFragment(html);
} // equivalent to jQuery's :visble

function isVisible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
function hideElement(el) {
  if (el.style.display === 'none') {
    return;
  } // back up the existing display setting in data-style-display


  if (el.style.display) {
    el.dataset.styleDisplay = el.style.display;
  }

  el.style.display = 'none';
}
function showElement(el) {
  if (el.style.display !== 'none') {
    return;
  }

  if (el.dataset.styleDisplay) {
    // restore backed-up dispay property
    el.style.display = el.dataset.styleDisplay;
    delete el.dataset.styleDisplay;
  } else {
    el.style.display = '';
  }
}
function emptyChildNodes(el) {
  if (el.firstChild) {
    el.removeChild(el.firstChild);
    emptyChildNodes(el);
  }
}
function replaceChildNodes(el, newChildNodes) {
  emptyChildNodes(el);

  if (newChildNodes instanceof DocumentFragment) {
    el.appendChild(newChildNodes);
  } else if (typeof newChildNodes === 'string') {
    el.appendChild(parseHTML(newChildNodes));
  } else if (typeof newChildNodes.forEach === 'function') {
    newChildNodes.forEach(function (node) {
      el.appendChild(node);
    });
  }
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/event.js":
/*!***********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/event.js ***!
  \***********************************************************/
/*! exports provided: registerListeners, unregisterListeners, findElementInEventPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerListeners", function() { return registerListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregisterListeners", function() { return unregisterListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findElementInEventPath", function() { return findElementInEventPath; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var listenerRegistry = new WeakMap();
var _EventTarget$prototyp = EventTarget.prototype,
    addEventListener = _EventTarget$prototyp.addEventListener,
    removeEventListener = _EventTarget$prototyp.removeEventListener; // Register event listeners to a key object
// listeners: array of listener definitions;
//   - each definition must be a flat array of event target and the arguments
//     used to call addEventListener() on the target

function registerListeners(keyObj, listeners) {
  var registered = listenerRegistry.get(keyObj);

  if (!registered) {
    registered = [];
    listenerRegistry.set(keyObj, registered);
  }

  listeners.forEach(function (listener) {
    addEventListener.call.apply(addEventListener, _toConsumableArray(listener));
    registered.push(listener);
  });
}
function unregisterListeners(keyObj) {
  var listeners = listenerRegistry.get(keyObj);

  if (!listeners) {
    return;
  }

  listeners.forEach(function (listener) {
    removeEventListener.call.apply(removeEventListener, _toConsumableArray(listener));
  });
  listenerRegistry["delete"](keyObj);
} // Event.composedPath() polyfill for Edge
// based on https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec

if (!Event.prototype.composedPath) {
  var getComposedPath = function getComposedPath(node) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    path.push(node);
    var parent;

    if (node.parentNode) {
      parent = node.parentNode;
    } else if (node.host) {
      // ShadowRoot
      parent = node.host;
    } else if (node.defaultView) {
      // Document
      parent = node.defaultView;
    }

    return parent ? getComposedPath(parent, path) : path;
  };

  Event.prototype.composedPath = function () {
    return getComposedPath(this.target);
  };
}

function findFromPath(path, criteria, currentTarget) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var el = path[index];

  if (criteria(el)) {
    return el;
  } else if (el === currentTarget || !el.parentElement) {
    // stop when reaching currentTarget or <html>
    return;
  }

  return findFromPath(path, criteria, currentTarget, index + 1);
} // Search for the actual target of a delegated event


function findElementInEventPath(ev, selector) {
  var criteria = typeof selector === 'function' ? selector : function (el) {
    return el.matches(selector);
  };
  return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/utils.js ***!
  \***********************************************************/
/*! exports provided: hasProperty, lastItemOf, pushUnique, stringToArray, isInRange, limitToRange, createTagRepeat, optimizeTemplateHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasProperty", function() { return hasProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastItemOf", function() { return lastItemOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushUnique", function() { return pushUnique; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToArray", function() { return stringToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInRange", function() { return isInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitToRange", function() { return limitToRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTagRepeat", function() { return createTagRepeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optimizeTemplateHTML", function() { return optimizeTemplateHTML; });
function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function lastItemOf(arr) {
  return arr[arr.length - 1];
} // push only the items not included in the array

function pushUnique(arr) {
  for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    items[_key - 1] = arguments[_key];
  }

  items.forEach(function (item) {
    if (arr.includes(item)) {
      return;
    }

    arr.push(item);
  });
  return arr;
}
function stringToArray(str, separator) {
  // convert empty string to an empty array
  return str ? str.split(separator) : [];
}
function isInRange(testVal, min, max) {
  var minOK = min === undefined || testVal >= min;
  var maxOK = max === undefined || testVal <= max;
  return minOK && maxOK;
}
function limitToRange(val, min, max) {
  if (val < min) {
    return min;
  }

  if (val > max) {
    return max;
  }

  return val;
}
function createTagRepeat(tagName, repeat) {
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var html = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var openTagSrc = Object.keys(attributes).reduce(function (src, attr) {
    var val = attributes[attr];

    if (typeof val === 'function') {
      val = val(index);
    }

    return "".concat(src, " ").concat(attr, "=\"").concat(val, "\"");
  }, tagName);
  html += "<".concat(openTagSrc, "></").concat(tagName, ">");
  var next = index + 1;
  return next < repeat ? createTagRepeat(tagName, repeat, attributes, next, html) : html;
} // Remove the spacing surrounding tags for HTML parser not to create text nodes
// before/after elements

function optimizeTemplateHTML(html) {
  return html.replace(/>\s+/g, '>').replace(/\s+</, '<');
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/main.js":
/*!******************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/main.js ***!
  \******************************************************/
/*! exports provided: Datepicker, DateRangePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Datepicker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Datepicker.js */ "./node_modules/vanillajs-datepicker/js/Datepicker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datepicker", function() { return _Datepicker_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _DateRangePicker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateRangePicker.js */ "./node_modules/vanillajs-datepicker/js/DateRangePicker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateRangePicker", function() { return _DateRangePicker_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/options/defaultOptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/options/defaultOptions.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// config options updatable by setOptions() and their default values
var defaultOptions = {
  autohide: false,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  calendarWeeks: false,
  clearBtn: false,
  dateDelimiter: ',',
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: undefined,
  // placeholder, defaults to today() by the program
  disableTouchKeyboard: false,
  format: 'mm/dd/yyyy',
  language: 'en',
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  nextArrow: '»',
  orientation: 'auto',
  pickLevel: 0,
  prevArrow: '«',
  showDaysOfWeek: true,
  showOnClick: true,
  showOnFocus: true,
  startView: 0,
  title: '',
  todayBtn: false,
  todayBtnMode: 0,
  todayHighlight: false,
  updateOnBlur: true,
  weekStart: 0
};
/* harmony default export */ __webpack_exports__["default"] = (defaultOptions);

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/options/processOptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/options/processOptions.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return processOptions; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultOptions.js */ "./node_modules/vanillajs-datepicker/js/options/defaultOptions.js");





var defaultLang = _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"].language,
    defaultFormat = _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"].format,
    defaultWeekStart = _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"].weekStart; // Reducer function to filter out invalid day-of-week from the input

function sanitizeDOW(dow, day) {
  return dow.length < 6 && day >= 0 && day < 7 ? Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(dow, day) : dow;
}

function calcEndOfWeek(startOfWeek) {
  return (startOfWeek + 6) % 7;
} // validate input date. if invalid, fallback to the original value


function validateDate(value, format, locale, origValue) {
  var date = Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["parseDate"])(value, format, locale);
  return date !== undefined ? date : origValue;
} // Validate viewId. if invalid, fallback to the original value


function validateViewId(value, origValue) {
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  var viewId = parseInt(value, 10);
  return viewId >= 0 && viewId <= max ? viewId : origValue;
} // Create Datepicker configuration to set


function processOptions(options, datepicker) {
  var inOpts = Object.assign({}, options);
  var config = {};
  var locales = datepicker.constructor.locales;

  var _ref = datepicker.config || {},
      format = _ref.format,
      language = _ref.language,
      locale = _ref.locale,
      maxDate = _ref.maxDate,
      maxView = _ref.maxView,
      minDate = _ref.minDate,
      pickLevel = _ref.pickLevel,
      startView = _ref.startView,
      weekStart = _ref.weekStart;

  if (inOpts.language) {
    var lang;

    if (inOpts.language !== language) {
      if (locales[inOpts.language]) {
        lang = inOpts.language;
      } else {
        // Check if langauge + region tag can fallback to the one without
        // region (e.g. fr-CA → fr)
        lang = inOpts.language.split('-')[0];

        if (locales[lang] === undefined) {
          lang = false;
        }
      }
    }

    delete inOpts.language;

    if (lang) {
      language = config.language = lang; // update locale as well when updating language

      var origLocale = locale || locales[defaultLang]; // use default language's properties for the fallback

      locale = Object.assign({
        format: defaultFormat,
        weekStart: defaultWeekStart
      }, locales[defaultLang]);

      if (language !== defaultLang) {
        Object.assign(locale, locales[language]);
      }

      config.locale = locale; // if format and/or weekStart are the same as old locale's defaults,
      // update them to new locale's defaults

      if (format === origLocale.format) {
        format = config.format = locale.format;
      }

      if (weekStart === origLocale.weekStart) {
        weekStart = config.weekStart = locale.weekStart;
        config.weekEnd = calcEndOfWeek(locale.weekStart);
      }
    }
  }

  if (inOpts.format) {
    var hasToDisplay = typeof inOpts.format.toDisplay === 'function';
    var hasToValue = typeof inOpts.format.toValue === 'function';
    var validFormatString = _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["reFormatTokens"].test(inOpts.format);

    if (hasToDisplay && hasToValue || validFormatString) {
      format = config.format = inOpts.format;
    }

    delete inOpts.format;
  } //*** dates ***//
  // while min and maxDate for "no limit" in the options are better to be null
  // (especially when updating), the ones in the config have to be undefined
  // because null is treated as 0 (= unix epoch) when comparing with time value


  var minDt = minDate;
  var maxDt = maxDate;

  if (inOpts.minDate !== undefined) {
    minDt = inOpts.minDate === null ? Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(0, 0, 1) // set 0000-01-01 to prevent negative values for year
    : validateDate(inOpts.minDate, format, locale, minDt);
    delete inOpts.minDate;
  }

  if (inOpts.maxDate !== undefined) {
    maxDt = inOpts.maxDate === null ? undefined : validateDate(inOpts.maxDate, format, locale, maxDt);
    delete inOpts.maxDate;
  }

  if (maxDt < minDt) {
    minDate = config.minDate = maxDt;
    maxDate = config.maxDate = minDt;
  } else {
    if (minDate !== minDt) {
      minDate = config.minDate = minDt;
    }

    if (maxDate !== maxDt) {
      maxDate = config.maxDate = maxDt;
    }
  }

  if (inOpts.datesDisabled) {
    config.datesDisabled = inOpts.datesDisabled.reduce(function (dates, dt) {
      var date = Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["parseDate"])(dt, format, locale);
      return date !== undefined ? Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(dates, date) : dates;
    }, []);
    delete inOpts.datesDisabled;
  }

  if (inOpts.defaultViewDate !== undefined) {
    var viewDate = Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["parseDate"])(inOpts.defaultViewDate, format, locale);

    if (viewDate !== undefined) {
      config.defaultViewDate = viewDate;
    }

    delete inOpts.defaultViewDate;
  } //*** days of week ***//


  if (inOpts.weekStart !== undefined) {
    var wkStart = Number(inOpts.weekStart) % 7;

    if (!isNaN(wkStart)) {
      weekStart = config.weekStart = wkStart;
      config.weekEnd = calcEndOfWeek(wkStart);
    }

    delete inOpts.weekStart;
  }

  if (inOpts.daysOfWeekDisabled) {
    config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekDisabled;
  }

  if (inOpts.daysOfWeekHighlighted) {
    config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekHighlighted;
  } //*** multi date ***//


  if (inOpts.maxNumberOfDates !== undefined) {
    var maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);

    if (maxNumberOfDates >= 0) {
      config.maxNumberOfDates = maxNumberOfDates;
      config.multidate = maxNumberOfDates !== 1;
    }

    delete inOpts.maxNumberOfDates;
  }

  if (inOpts.dateDelimiter) {
    config.dateDelimiter = String(inOpts.dateDelimiter);
    delete inOpts.dateDelimiter;
  } //*** pick level & view ***//


  var newPickLevel = pickLevel;

  if (inOpts.pickLevel !== undefined) {
    newPickLevel = validateViewId(inOpts.pickLevel, 2);
    delete inOpts.pickLevel;
  }

  if (newPickLevel !== pickLevel) {
    pickLevel = config.pickLevel = newPickLevel;
  }

  var newMaxView = maxView;

  if (inOpts.maxView !== undefined) {
    newMaxView = validateViewId(inOpts.maxView, maxView);
    delete inOpts.maxView;
  } // ensure max view >= pick level


  newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;

  if (newMaxView !== maxView) {
    maxView = config.maxView = newMaxView;
  }

  var newStartView = startView;

  if (inOpts.startView !== undefined) {
    newStartView = validateViewId(inOpts.startView, newStartView);
    delete inOpts.startView;
  } // ensure pick level <= start view <= max view


  if (newStartView < pickLevel) {
    newStartView = pickLevel;
  } else if (newStartView > maxView) {
    newStartView = maxView;
  }

  if (newStartView !== startView) {
    config.startView = newStartView;
  } //*** template ***//


  if (inOpts.prevArrow) {
    var prevArrow = Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["parseHTML"])(inOpts.prevArrow);

    if (prevArrow.childNodes.length > 0) {
      config.prevArrow = prevArrow.childNodes;
    }

    delete inOpts.prevArrow;
  }

  if (inOpts.nextArrow) {
    var nextArrow = Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["parseHTML"])(inOpts.nextArrow);

    if (nextArrow.childNodes.length > 0) {
      config.nextArrow = nextArrow.childNodes;
    }

    delete inOpts.nextArrow;
  } //*** misc ***//


  if (inOpts.disableTouchKeyboard !== undefined) {
    config.disableTouchKeyboard = 'ontouchstart' in document && !!inOpts.disableTouchKeyboard;
    delete inOpts.disableTouchKeyboard;
  }

  if (inOpts.orientation) {
    var orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
    config.orientation = {
      x: orientation.find(function (x) {
        return x === 'left' || x === 'right';
      }) || 'auto',
      y: orientation.find(function (y) {
        return y === 'top' || y === 'bottom';
      }) || 'auto'
    };
    delete inOpts.orientation;
  }

  if (inOpts.todayBtnMode !== undefined) {
    switch (inOpts.todayBtnMode) {
      case 0:
      case 1:
        config.todayBtnMode = inOpts.todayBtnMode;
    }

    delete inOpts.todayBtnMode;
  } //*** copy the rest ***//


  Object.keys(inOpts).forEach(function (key) {
    if (inOpts[key] !== undefined && Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(_defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"], key)) {
      config[key] = inOpts[key];
    }
  });
  return config;
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/Picker.js":
/*!***************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/Picker.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Picker; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _templates_pickerTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/pickerTemplate.js */ "./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js");
/* harmony import */ var _views_DaysView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/DaysView.js */ "./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js");
/* harmony import */ var _views_MonthsView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/MonthsView.js */ "./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js");
/* harmony import */ var _views_YearsView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/YearsView.js */ "./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js");
/* harmony import */ var _events_functions_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../events/functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");
/* harmony import */ var _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../events/pickerListeners.js */ "./node_modules/vanillajs-datepicker/js/events/pickerListeners.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }












function processPickerOptions(picker, options) {
  if (options.title !== undefined) {
    if (options.title) {
      picker.controls.title.textContent = options.title;
      Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["showElement"])(picker.controls.title);
    } else {
      picker.controls.title.textContent = '';
      Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["hideElement"])(picker.controls.title);
    }
  }

  if (options.prevArrow) {
    var prevBtn = picker.controls.prevBtn;
    Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["emptyChildNodes"])(prevBtn);
    options.prevArrow.forEach(function (node) {
      prevBtn.appendChild(node.cloneNode(true));
    });
  }

  if (options.nextArrow) {
    var nextBtn = picker.controls.nextBtn;
    Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["emptyChildNodes"])(nextBtn);
    options.nextArrow.forEach(function (node) {
      nextBtn.appendChild(node.cloneNode(true));
    });
  }

  if (options.locale) {
    picker.controls.todayBtn.textContent = options.locale.today;
    picker.controls.clearBtn.textContent = options.locale.clear;
  }

  if (options.todayBtn !== undefined) {
    if (options.todayBtn) {
      Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["showElement"])(picker.controls.todayBtn);
    } else {
      Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["hideElement"])(picker.controls.todayBtn);
    }
  }

  if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'minDate') || Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'maxDate')) {
    var _picker$datepicker$co = picker.datepicker.config,
        minDate = _picker$datepicker$co.minDate,
        maxDate = _picker$datepicker$co.maxDate;
    picker.controls.todayBtn.disabled = !Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["isInRange"])(Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["today"])(), minDate, maxDate);
  }

  if (options.clearBtn !== undefined) {
    if (options.clearBtn) {
      Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["showElement"])(picker.controls.clearBtn);
    } else {
      Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["hideElement"])(picker.controls.clearBtn);
    }
  }
} // Compute view date to reset, which will be...
// - the last item of the selected dates or defaultViewDate if no selection
// - limitted to minDate or maxDate if it exceeds the range


function computeResetViewDate(datepicker) {
  var dates = datepicker.dates,
      config = datepicker.config;
  var viewDate = dates.length > 0 ? Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["lastItemOf"])(dates) : config.defaultViewDate;
  return Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["limitToRange"])(viewDate, config.minDate, config.maxDate);
} // Change current view's view date


function setViewDate(picker, newDate) {
  var oldViewDate = new Date(picker.viewDate);
  var newViewDate = new Date(newDate);
  var _picker$currentView = picker.currentView,
      id = _picker$currentView.id,
      year = _picker$currentView.year,
      first = _picker$currentView.first,
      last = _picker$currentView.last;
  var viewYear = newViewDate.getFullYear();
  picker.viewDate = newDate;

  if (viewYear !== oldViewDate.getFullYear()) {
    Object(_events_functions_js__WEBPACK_IMPORTED_MODULE_8__["triggerDatepickerEvent"])(picker.datepicker, 'changeYear');
  }

  if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
    Object(_events_functions_js__WEBPACK_IMPORTED_MODULE_8__["triggerDatepickerEvent"])(picker.datepicker, 'changeMonth');
  } // return whether the new date is in different period on time from the one
  // displayed in the current view
  // when true, the view needs to be re-rendered on the next UI refresh.


  switch (id) {
    case 0:
      return newDate < first || newDate > last;

    case 1:
      return viewYear !== year;

    default:
      return viewYear < first || viewYear > last;
  }
}

function getTextDirection(el) {
  return window.getComputedStyle(el).direction;
} // Class representing the picker UI


var Picker = /*#__PURE__*/function () {
  function Picker(datepicker) {
    _classCallCheck(this, Picker);

    this.datepicker = datepicker;
    var template = _templates_pickerTemplate_js__WEBPACK_IMPORTED_MODULE_4__["default"].replace(/%buttonClass%/g, datepicker.config.buttonClass);
    var element = this.element = Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["parseHTML"])(template).firstChild;

    var _element$firstChild$c = _slicedToArray(element.firstChild.children, 3),
        header = _element$firstChild$c[0],
        main = _element$firstChild$c[1],
        footer = _element$firstChild$c[2];

    var title = header.firstElementChild;

    var _header$lastElementCh = _slicedToArray(header.lastElementChild.children, 3),
        prevBtn = _header$lastElementCh[0],
        viewSwitch = _header$lastElementCh[1],
        nextBtn = _header$lastElementCh[2];

    var _footer$firstChild$ch = _slicedToArray(footer.firstChild.children, 2),
        todayBtn = _footer$firstChild$ch[0],
        clearBtn = _footer$firstChild$ch[1];

    var controls = {
      title: title,
      prevBtn: prevBtn,
      viewSwitch: viewSwitch,
      nextBtn: nextBtn,
      todayBtn: todayBtn,
      clearBtn: clearBtn
    };
    this.main = main;
    this.controls = controls;
    var elementClass = datepicker.inline ? 'inline' : 'dropdown';
    element.classList.add("datepicker-".concat(elementClass));
    processPickerOptions(this, datepicker.config);
    this.viewDate = computeResetViewDate(datepicker); // set up event listeners

    Object(_lib_event_js__WEBPACK_IMPORTED_MODULE_3__["registerListeners"])(datepicker, [[element, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickPicker"].bind(null, datepicker), {
      capture: true
    }], [main, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickView"].bind(null, datepicker)], [controls.viewSwitch, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickViewSwitch"].bind(null, datepicker)], [controls.prevBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickPrevBtn"].bind(null, datepicker)], [controls.nextBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickNextBtn"].bind(null, datepicker)], [controls.todayBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickTodayBtn"].bind(null, datepicker)], [controls.clearBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__["onClickClearBtn"].bind(null, datepicker)]]); // set up views

    this.views = [new _views_DaysView_js__WEBPACK_IMPORTED_MODULE_5__["default"](this), new _views_MonthsView_js__WEBPACK_IMPORTED_MODULE_6__["default"](this), new _views_YearsView_js__WEBPACK_IMPORTED_MODULE_7__["default"](this, {
      id: 2,
      name: 'years',
      cellClass: 'year',
      step: 1
    }), new _views_YearsView_js__WEBPACK_IMPORTED_MODULE_7__["default"](this, {
      id: 3,
      name: 'decades',
      cellClass: 'decade',
      step: 10
    })];
    this.currentView = this.views[datepicker.config.startView];
    this.currentView.render();
    this.main.appendChild(this.currentView.element);
    datepicker.config.container.appendChild(this.element);
  }

  _createClass(Picker, [{
    key: "setOptions",
    value: function setOptions(options) {
      processPickerOptions(this, options);
      this.views.forEach(function (view) {
        view.init(options, false);
      });
      this.currentView.render();
    }
  }, {
    key: "detach",
    value: function detach() {
      this.datepicker.config.container.removeChild(this.element);
    }
  }, {
    key: "show",
    value: function show() {
      if (this.active) {
        return;
      }

      this.element.classList.add('active');
      this.active = true;
      var datepicker = this.datepicker;

      if (!datepicker.inline) {
        // ensure picker's direction matches input's
        var inputDirection = getTextDirection(datepicker.inputField);

        if (inputDirection !== getTextDirection(datepicker.config.container)) {
          this.element.dir = inputDirection;
        } else if (this.element.dir) {
          this.element.removeAttribute('dir');
        }

        this.place();

        if (datepicker.config.disableTouchKeyboard) {
          datepicker.inputField.blur();
        }
      }

      Object(_events_functions_js__WEBPACK_IMPORTED_MODULE_8__["triggerDatepickerEvent"])(datepicker, 'show');
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.active) {
        return;
      }

      this.datepicker.exitEditMode();
      this.element.classList.remove('active');
      this.active = false;
      Object(_events_functions_js__WEBPACK_IMPORTED_MODULE_8__["triggerDatepickerEvent"])(this.datepicker, 'hide');
    }
  }, {
    key: "place",
    value: function place() {
      var _this$element = this.element,
          classList = _this$element.classList,
          style = _this$element.style;
      var _this$datepicker = this.datepicker,
          config = _this$datepicker.config,
          inputField = _this$datepicker.inputField;
      var container = config.container;

      var _this$element$getBoun = this.element.getBoundingClientRect(),
          calendarWidth = _this$element$getBoun.width,
          calendarHeight = _this$element$getBoun.height;

      var _container$getBoundin = container.getBoundingClientRect(),
          containerLeft = _container$getBoundin.left,
          containerTop = _container$getBoundin.top,
          containerWidth = _container$getBoundin.width;

      var _inputField$getBoundi = inputField.getBoundingClientRect(),
          inputLeft = _inputField$getBoundi.left,
          inputTop = _inputField$getBoundi.top,
          inputWidth = _inputField$getBoundi.width,
          inputHeight = _inputField$getBoundi.height;

      var _config$orientation = config.orientation,
          orientX = _config$orientation.x,
          orientY = _config$orientation.y;
      var scrollTop;
      var left;
      var top;

      if (container === document.body) {
        scrollTop = window.scrollY;
        left = inputLeft + window.scrollX;
        top = inputTop + scrollTop;
      } else {
        scrollTop = container.scrollTop;
        left = inputLeft - containerLeft;
        top = inputTop - containerTop + scrollTop;
      }

      if (orientX === 'auto') {
        if (left < 0) {
          // align to the left and move into visible area if input's left edge < window's
          orientX = 'left';
          left = 10;
        } else if (left + calendarWidth > containerWidth) {
          // align to the right if canlendar's right edge > container's
          orientX = 'right';
        } else {
          orientX = getTextDirection(inputField) === 'rtl' ? 'right' : 'left';
        }
      }

      if (orientX === 'right') {
        left -= calendarWidth - inputWidth;
      }

      if (orientY === 'auto') {
        orientY = top - calendarHeight < scrollTop ? 'bottom' : 'top';
      }

      if (orientY === 'top') {
        top -= calendarHeight;
      } else {
        top += inputHeight;
      }

      classList.remove('datepicker-orient-top', 'datepicker-orient-bottom', 'datepicker-orient-right', 'datepicker-orient-left');
      classList.add("datepicker-orient-".concat(orientY), "datepicker-orient-".concat(orientX));
      style.top = top ? "".concat(top, "px") : top;
      style.left = left ? "".concat(left, "px") : left;
    }
  }, {
    key: "setViewSwitchLabel",
    value: function setViewSwitchLabel(labelText) {
      this.controls.viewSwitch.textContent = labelText;
    }
  }, {
    key: "setPrevBtnDisabled",
    value: function setPrevBtnDisabled(disabled) {
      this.controls.prevBtn.disabled = disabled;
    }
  }, {
    key: "setNextBtnDisabled",
    value: function setNextBtnDisabled(disabled) {
      this.controls.nextBtn.disabled = disabled;
    }
  }, {
    key: "changeView",
    value: function changeView(viewId) {
      var oldView = this.currentView;
      var newView = this.views[viewId];

      if (newView.id !== oldView.id) {
        this.currentView = newView;
        this._renderMethod = 'render';
        Object(_events_functions_js__WEBPACK_IMPORTED_MODULE_8__["triggerDatepickerEvent"])(this.datepicker, 'changeView');
        this.main.replaceChild(newView.element, oldView.element);
      }

      return this;
    } // Change the focused date (view date)

  }, {
    key: "changeFocus",
    value: function changeFocus(newViewDate) {
      this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refreshFocus';
      this.views.forEach(function (view) {
        view.updateFocus();
      });
      return this;
    } // Apply the change of the selected dates

  }, {
    key: "update",
    value: function update() {
      var newViewDate = computeResetViewDate(this.datepicker);
      this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refresh';
      this.views.forEach(function (view) {
        view.updateFocus();
        view.updateSelection();
      });
      return this;
    } // Refresh the picker UI

  }, {
    key: "render",
    value: function render() {
      var quickRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var renderMethod = quickRender && this._renderMethod || 'render';
      delete this._renderMethod;
      this.currentView[renderMethod]();
    }
  }]);

  return Picker;
}();



/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/templates/calendarWeeksTemplate.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/templates/calendarWeeksTemplate.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");

var calendarWeeksTemplate = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["optimizeTemplateHTML"])("<div class=\"calendar-weeks\">\n  <div class=\"days-of-week\"><span class=\"dow\"></span></div>\n  <div class=\"weeks\">".concat(Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["createTagRepeat"])('span', 6, {
  "class": 'week'
}), "</div>\n</div>"));
/* harmony default export */ __webpack_exports__["default"] = (calendarWeeksTemplate);

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");

var daysTemplate = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["optimizeTemplateHTML"])("<div class=\"days\">\n  <div class=\"days-of-week\">".concat(Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["createTagRepeat"])('span', 7, {
  "class": 'dow'
}), "</div>\n  <div class=\"datepicker-grid\">").concat(Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["createTagRepeat"])('span', 42), "</div>\n</div>"));
/* harmony default export */ __webpack_exports__["default"] = (daysTemplate);

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");

var pickerTemplate = Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["optimizeTemplateHTML"])("<div class=\"datepicker\">\n  <div class=\"datepicker-picker\">\n    <div class=\"datepicker-header\">\n      <div class=\"datepicker-title\"></div>\n      <div class=\"datepicker-controls\">\n        <button type=\"button\" class=\"%buttonClass% prev-btn\"></button>\n        <button type=\"button\" class=\"%buttonClass% view-switch\"></button>\n        <button type=\"button\" class=\"%buttonClass% next-btn\"></button>\n      </div>\n    </div>\n    <div class=\"datepicker-main\"></div>\n    <div class=\"datepicker-footer\">\n      <div class=\"datepicker-controls\">\n        <button type=\"button\" class=\"%buttonClass% today-btn\"></button>\n        <button type=\"button\" class=\"%buttonClass% clear-btn\"></button>\n      </div>\n    </div>\n  </div>\n</div>");
/* harmony default export */ __webpack_exports__["default"] = (pickerTemplate);

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DaysView; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _templates_daysTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/daysTemplate.js */ "./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js");
/* harmony import */ var _templates_calendarWeeksTemplate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/calendarWeeksTemplate.js */ "./node_modules/vanillajs-datepicker/js/picker/templates/calendarWeeksTemplate.js");
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./View.js */ "./node_modules/vanillajs-datepicker/js/picker/views/View.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var DaysView = /*#__PURE__*/function (_View) {
  _inherits(DaysView, _View);

  var _super = _createSuper(DaysView);

  function DaysView(picker) {
    _classCallCheck(this, DaysView);

    return _super.call(this, picker, {
      id: 0,
      name: 'days',
      cellClass: 'day'
    });
  }

  _createClass(DaysView, [{
    key: "init",
    value: function init(options) {
      var onConstruction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (onConstruction) {
        var inner = Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["parseHTML"])(_templates_daysTemplate_js__WEBPACK_IMPORTED_MODULE_4__["default"]).firstChild;
        this.dow = inner.firstChild;
        this.grid = inner.lastChild;
        this.element.appendChild(inner);
      }

      _get(_getPrototypeOf(DaysView.prototype), "init", this).call(this, options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var _this = this;

      var updateDOW;

      if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'minDate')) {
        this.minDate = options.minDate;
      }

      if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'maxDate')) {
        this.maxDate = options.maxDate;
      }

      if (options.datesDisabled) {
        this.datesDisabled = options.datesDisabled;
      }

      if (options.daysOfWeekDisabled) {
        this.daysOfWeekDisabled = options.daysOfWeekDisabled;
        updateDOW = true;
      }

      if (options.daysOfWeekHighlighted) {
        this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
      }

      if (options.todayHighlight !== undefined) {
        this.todayHighlight = options.todayHighlight;
      }

      if (options.weekStart !== undefined) {
        this.weekStart = options.weekStart;
        this.weekEnd = options.weekEnd;
        updateDOW = true;
      }

      if (options.locale) {
        var locale = this.locale = options.locale;
        this.dayNames = locale.daysMin;
        this.switchLabelFormat = locale.titleFormat;
        updateDOW = true;
      }

      if (options.beforeShowDay !== undefined) {
        this.beforeShow = typeof options.beforeShowDay === 'function' ? options.beforeShowDay : undefined;
      }

      if (options.calendarWeeks !== undefined) {
        if (options.calendarWeeks && !this.calendarWeeks) {
          var weeksElem = Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["parseHTML"])(_templates_calendarWeeksTemplate_js__WEBPACK_IMPORTED_MODULE_5__["default"]).firstChild;
          this.calendarWeeks = {
            element: weeksElem,
            dow: weeksElem.firstChild,
            weeks: weeksElem.lastChild
          };
          this.element.insertBefore(weeksElem, this.element.firstChild);
        } else if (this.calendarWeeks && !options.calendarWeeks) {
          this.element.removeChild(this.calendarWeeks.element);
          this.calendarWeeks = null;
        }
      }

      if (options.showDaysOfWeek !== undefined) {
        if (options.showDaysOfWeek) {
          Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["showElement"])(this.dow);

          if (this.calendarWeeks) {
            Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["showElement"])(this.calendarWeeks.dow);
          }
        } else {
          Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["hideElement"])(this.dow);

          if (this.calendarWeeks) {
            Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["hideElement"])(this.calendarWeeks.dow);
          }
        }
      } // update days-of-week when locale, daysOfweekDisabled or weekStart is changed


      if (updateDOW) {
        Array.from(this.dow.children).forEach(function (el, index) {
          var dow = (_this.weekStart + index) % 7;
          el.textContent = _this.dayNames[dow];
          el.className = _this.daysOfWeekDisabled.includes(dow) ? 'dow disabled' : 'dow';
        });
      }
    } // Apply update on the focused date to view's settings

  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var viewDate = new Date(this.picker.viewDate);
      var viewYear = viewDate.getFullYear();
      var viewMonth = viewDate.getMonth();
      var firstOfMonth = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(viewYear, viewMonth, 1);
      var start = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dayOfTheWeekOf"])(firstOfMonth, this.weekStart, this.weekStart);
      this.first = firstOfMonth;
      this.last = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(viewYear, viewMonth + 1, 0);
      this.start = start;
      this.focused = this.picker.viewDate;
    } // Apply update on the selected dates to view's settings

  }, {
    key: "updateSelection",
    value: function updateSelection() {
      var _this$picker$datepick = this.picker.datepicker,
          dates = _this$picker$datepick.dates,
          rangepicker = _this$picker$datepick.rangepicker;
      this.selected = dates;

      if (rangepicker) {
        this.range = rangepicker.dates;
      }
    } // Update the entire view UI

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // update today marker on ever render
      this.today = this.todayHighlight ? Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["today"])() : undefined; // refresh disabled dates on every render in order to clear the ones added
      // by beforeShow hook at previous render

      this.disabled = _toConsumableArray(this.datesDisabled);
      var switchLabel = Object(_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__["formatDate"])(this.focused, this.switchLabelFormat, this.locale);
      this.picker.setViewSwitchLabel(switchLabel);
      this.picker.setPrevBtnDisabled(this.first <= this.minDate);
      this.picker.setNextBtnDisabled(this.last >= this.maxDate);

      if (this.calendarWeeks) {
        // start of the UTC week (Monday) of the 1st of the month
        var startOfWeek = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dayOfTheWeekOf"])(this.first, 1, 1);
        Array.from(this.calendarWeeks.weeks.children).forEach(function (el, index) {
          el.textContent = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["getWeek"])(Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addWeeks"])(startOfWeek, index));
        });
      }

      Array.from(this.grid.children).forEach(function (el, index) {
        var classList = el.classList;
        var current = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["addDays"])(_this2.start, index);
        var date = new Date(current);
        var day = date.getDay();
        el.className = "datepicker-cell ".concat(_this2.cellClass);
        el.dataset.date = current;
        el.textContent = date.getDate();

        if (current < _this2.first) {
          classList.add('prev');
        } else if (current > _this2.last) {
          classList.add('next');
        }

        if (_this2.today === current) {
          classList.add('today');
        }

        if (current < _this2.minDate || current > _this2.maxDate || _this2.disabled.includes(current)) {
          classList.add('disabled');
        }

        if (_this2.daysOfWeekDisabled.includes(day)) {
          classList.add('disabled');
          Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(_this2.disabled, current);
        }

        if (_this2.daysOfWeekHighlighted.includes(day)) {
          classList.add('highlighted');
        }

        if (_this2.range) {
          var _this2$range = _slicedToArray(_this2.range, 2),
              rangeStart = _this2$range[0],
              rangeEnd = _this2$range[1];

          if (current > rangeStart && current < rangeEnd) {
            classList.add('range');
          }

          if (current === rangeStart) {
            classList.add('range-start');
          }

          if (current === rangeEnd) {
            classList.add('range-end');
          }
        }

        if (_this2.selected.includes(current)) {
          classList.add('selected');
        }

        if (current === _this2.focused) {
          classList.add('focused');
        }

        if (_this2.beforeShow) {
          _this2.performBeforeHook(el, current, current);
        }
      });
    } // Update the view UI by applying the changes of selected and focused items

  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;

      var _ref = this.range || [],
          _ref2 = _slicedToArray(_ref, 2),
          rangeStart = _ref2[0],
          rangeEnd = _ref2[1];

      this.grid.querySelectorAll('.range, .range-start, .range-end, .selected, .focused').forEach(function (el) {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
      });
      Array.from(this.grid.children).forEach(function (el) {
        var current = Number(el.dataset.date);
        var classList = el.classList;

        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }

        if (current === rangeStart) {
          classList.add('range-start');
        }

        if (current === rangeEnd) {
          classList.add('range-end');
        }

        if (_this3.selected.includes(current)) {
          classList.add('selected');
        }

        if (current === _this3.focused) {
          classList.add('focused');
        }
      });
    } // Update the view UI by applying the change of focused item

  }, {
    key: "refreshFocus",
    value: function refreshFocus() {
      var index = Math.round((this.focused - this.start) / 86400000);
      this.grid.querySelectorAll('.focused').forEach(function (el) {
        el.classList.remove('focused');
      });
      this.grid.children[index].classList.add('focused');
    }
  }]);

  return DaysView;
}(_View_js__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js":
/*!*************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MonthsView; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./View.js */ "./node_modules/vanillajs-datepicker/js/picker/views/View.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function computeMonthRange(range, thisYear) {
  if (!range || !range[0] || !range[1]) {
    return;
  }

  var _range = _slicedToArray(range, 2),
      _range$ = _slicedToArray(_range[0], 2),
      startY = _range$[0],
      startM = _range$[1],
      _range$2 = _slicedToArray(_range[1], 2),
      endY = _range$2[0],
      endM = _range$2[1];

  if (startY > thisYear || endY < thisYear) {
    return;
  }

  return [startY === thisYear ? startM : -1, endY === thisYear ? endM : 12];
}

var MonthsView = /*#__PURE__*/function (_View) {
  _inherits(MonthsView, _View);

  var _super = _createSuper(MonthsView);

  function MonthsView(picker) {
    _classCallCheck(this, MonthsView);

    return _super.call(this, picker, {
      id: 1,
      name: 'months',
      cellClass: 'month'
    });
  }

  _createClass(MonthsView, [{
    key: "init",
    value: function init(options) {
      var onConstruction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (onConstruction) {
        this.grid = this.element;
        this.element.classList.add('months', 'datepicker-grid');
        this.grid.appendChild(Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["parseHTML"])(Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["createTagRepeat"])('span', 12, {
          'data-month': function dataMonth(ix) {
            return ix;
          }
        })));
      }

      _get(_getPrototypeOf(MonthsView.prototype), "init", this).call(this, options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options.locale) {
        this.monthNames = options.locale.monthsShort;
      }

      if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'minDate')) {
        if (options.minDate === undefined) {
          this.minYear = this.minMonth = this.minDate = undefined;
        } else {
          var minDateObj = new Date(options.minDate);
          this.minYear = minDateObj.getFullYear();
          this.minMonth = minDateObj.getMonth();
          this.minDate = minDateObj.setDate(1);
        }
      }

      if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'maxDate')) {
        if (options.maxDate === undefined) {
          this.maxYear = this.maxMonth = this.maxDate = undefined;
        } else {
          var maxDateObj = new Date(options.maxDate);
          this.maxYear = maxDateObj.getFullYear();
          this.maxMonth = maxDateObj.getMonth();
          this.maxDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(this.maxYear, this.maxMonth + 1, 0);
        }
      }

      if (options.beforeShowMonth !== undefined) {
        this.beforeShow = typeof options.beforeShowMonth === 'function' ? options.beforeShowMonth : undefined;
      }
    } // Update view's settings to reflect the viewDate set on the picker

  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var viewDate = new Date(this.picker.viewDate);
      this.year = viewDate.getFullYear();
      this.focused = viewDate.getMonth();
    } // Update view's settings to reflect the selected dates

  }, {
    key: "updateSelection",
    value: function updateSelection() {
      var _this$picker$datepick = this.picker.datepicker,
          dates = _this$picker$datepick.dates,
          rangepicker = _this$picker$datepick.rangepicker;
      this.selected = dates.reduce(function (selected, timeValue) {
        var date = new Date(timeValue);
        var year = date.getFullYear();
        var month = date.getMonth();

        if (selected[year] === undefined) {
          selected[year] = [month];
        } else {
          Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(selected[year], month);
        }

        return selected;
      }, {});

      if (rangepicker && rangepicker.dates) {
        this.range = rangepicker.dates.map(function (timeValue) {
          var date = new Date(timeValue);
          return isNaN(date) ? undefined : [date.getFullYear(), date.getMonth()];
        });
      }
    } // Update the entire view UI

  }, {
    key: "render",
    value: function render() {
      var _this = this;

      // refresh disabled months on every render in order to clear the ones added
      // by beforeShow hook at previous render
      this.disabled = [];
      this.picker.setViewSwitchLabel(this.year);
      this.picker.setPrevBtnDisabled(this.year <= this.minYear);
      this.picker.setNextBtnDisabled(this.year >= this.maxYear);
      var selected = this.selected[this.year] || [];
      var yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
      var isMinYear = this.year === this.minYear;
      var isMaxYear = this.year === this.maxYear;
      var range = computeMonthRange(this.range, this.year);
      Array.from(this.grid.children).forEach(function (el, index) {
        var classList = el.classList;
        var date = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(_this.year, index, 1);
        el.className = "datepicker-cell ".concat(_this.cellClass);

        if (_this.isMinView) {
          el.dataset.date = date;
        } // reset text on every render to clear the custom content set
        // by beforeShow hook at previous render


        el.textContent = _this.monthNames[index];

        if (yrOutOfRange || isMinYear && index < _this.minMonth || isMaxYear && index > _this.maxMonth) {
          classList.add('disabled');
        }

        if (range) {
          var _range2 = _slicedToArray(range, 2),
              rangeStart = _range2[0],
              rangeEnd = _range2[1];

          if (index > rangeStart && index < rangeEnd) {
            classList.add('range');
          }

          if (index === rangeStart) {
            classList.add('range-start');
          }

          if (index === rangeEnd) {
            classList.add('range-end');
          }
        }

        if (selected.includes(index)) {
          classList.add('selected');
        }

        if (index === _this.focused) {
          classList.add('focused');
        }

        if (_this.beforeShow) {
          _this.performBeforeHook(el, index, date);
        }
      });
    } // Update the view UI by applying the changes of selected and focused items

  }, {
    key: "refresh",
    value: function refresh() {
      var _this2 = this;

      var selected = this.selected[this.year] || [];

      var _ref = computeMonthRange(this.range, this.year) || [],
          _ref2 = _slicedToArray(_ref, 2),
          rangeStart = _ref2[0],
          rangeEnd = _ref2[1];

      this.grid.querySelectorAll('.range, .range-start, .range-end, .selected, .focused').forEach(function (el) {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
      });
      Array.from(this.grid.children).forEach(function (el, index) {
        var classList = el.classList;

        if (index > rangeStart && index < rangeEnd) {
          classList.add('range');
        }

        if (index === rangeStart) {
          classList.add('range-start');
        }

        if (index === rangeEnd) {
          classList.add('range-end');
        }

        if (selected.includes(index)) {
          classList.add('selected');
        }

        if (index === _this2.focused) {
          classList.add('focused');
        }
      });
    } // Update the view UI by applying the change of focused item

  }, {
    key: "refreshFocus",
    value: function refreshFocus() {
      this.grid.querySelectorAll('.focused').forEach(function (el) {
        el.classList.remove('focused');
      });
      this.grid.children[this.focused].classList.add('focused');
    }
  }]);

  return MonthsView;
}(_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/View.js":
/*!*******************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/View.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return View; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // Base class of the view classes

var View = /*#__PURE__*/function () {
  function View(picker, config) {
    _classCallCheck(this, View);

    Object.assign(this, config, {
      picker: picker,
      element: Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__["parseHTML"])("<div class=\"datepicker-view\"></div>").firstChild,
      selected: []
    });
    this.init(this.picker.datepicker.config);
  }

  _createClass(View, [{
    key: "init",
    value: function init(options) {
      if (options.pickLevel !== undefined) {
        this.isMinView = this.id === options.pickLevel;
      }

      this.setOptions(options);
      this.updateFocus();
      this.updateSelection();
    } // Execute beforeShow() callback and apply the result to the element
    // args:
    // - current - current value on the iteration on view rendering
    // - timeValue - time value of the date to pass to beforeShow()

  }, {
    key: "performBeforeHook",
    value: function performBeforeHook(el, current, timeValue) {
      var result = this.beforeShow(new Date(timeValue));

      switch (_typeof(result)) {
        case 'boolean':
          result = {
            enabled: result
          };
          break;

        case 'string':
          result = {
            classes: result
          };
      }

      if (result) {
        if (result.enabled === false) {
          el.classList.add('disabled');
          Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(this.disabled, current);
        }

        if (result.classes) {
          var _el$classList;

          var extraClasses = result.classes.split(/\s+/);

          (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(extraClasses));

          if (extraClasses.includes('disabled')) {
            Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(this.disabled, current);
          }
        }

        if (result.content) {
          Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__["replaceChildNodes"])(el, result.content);
        }
      }
    }
  }]);

  return View;
}();



/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return YearsView; });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./View.js */ "./node_modules/vanillajs-datepicker/js/picker/views/View.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






function toTitleCase(word) {
  return _toConsumableArray(word).reduce(function (str, ch, ix) {
    return str += ix ? ch : ch.toUpperCase();
  }, '');
} // Class representing the years and decades view elements


var YearsView = /*#__PURE__*/function (_View) {
  _inherits(YearsView, _View);

  var _super = _createSuper(YearsView);

  function YearsView(picker, config) {
    _classCallCheck(this, YearsView);

    return _super.call(this, picker, config);
  }

  _createClass(YearsView, [{
    key: "init",
    value: function init(options) {
      var onConstruction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (onConstruction) {
        this.navStep = this.step * 10;
        this.beforeShowOption = "beforeShow".concat(toTitleCase(this.cellClass));
        this.grid = this.element;
        this.element.classList.add(this.name, 'datepicker-grid');
        this.grid.appendChild(Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__["parseHTML"])(Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["createTagRepeat"])('span', 12)));
      }

      _get(_getPrototypeOf(YearsView.prototype), "init", this).call(this, options);
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'minDate')) {
        if (options.minDate === undefined) {
          this.minYear = this.minDate = undefined;
        } else {
          this.minYear = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(options.minDate, this.step);
          this.minDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(this.minYear, 0, 1);
        }
      }

      if (Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["hasProperty"])(options, 'maxDate')) {
        if (options.maxDate === undefined) {
          this.maxYear = this.maxDate = undefined;
        } else {
          this.maxYear = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(options.maxDate, this.step);
          this.maxDate = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(this.maxYear, 11, 31);
        }
      }

      if (options[this.beforeShowOption] !== undefined) {
        var beforeShow = options[this.beforeShowOption];
        this.beforeShow = typeof beforeShow === 'function' ? beforeShow : undefined;
      }
    } // Update view's settings to reflect the viewDate set on the picker

  }, {
    key: "updateFocus",
    value: function updateFocus() {
      var viewDate = new Date(this.picker.viewDate);
      var first = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(viewDate, this.navStep);
      var last = first + 9 * this.step;
      this.first = first;
      this.last = last;
      this.start = first - this.step;
      this.focused = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(viewDate, this.step);
    } // Update view's settings to reflect the selected dates

  }, {
    key: "updateSelection",
    value: function updateSelection() {
      var _this = this;

      var _this$picker$datepick = this.picker.datepicker,
          dates = _this$picker$datepick.dates,
          rangepicker = _this$picker$datepick.rangepicker;
      this.selected = dates.reduce(function (years, timeValue) {
        return Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__["pushUnique"])(years, Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(timeValue, _this.step));
      }, []);

      if (rangepicker && rangepicker.dates) {
        this.range = rangepicker.dates.map(function (timeValue) {
          if (timeValue !== undefined) {
            return Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["startOfYearPeriod"])(timeValue, _this.step);
          }
        });
      }
    } // Update the entire view UI

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // refresh disabled years on every render in order to clear the ones added
      // by beforeShow hook at previous render
      this.disabled = [];
      this.picker.setViewSwitchLabel("".concat(this.first, "-").concat(this.last));
      this.picker.setPrevBtnDisabled(this.first <= this.minYear);
      this.picker.setNextBtnDisabled(this.last >= this.maxYear);
      Array.from(this.grid.children).forEach(function (el, index) {
        var classList = el.classList;
        var current = _this2.start + index * _this2.step;
        var date = Object(_lib_date_js__WEBPACK_IMPORTED_MODULE_1__["dateValue"])(current, 0, 1);
        el.className = "datepicker-cell ".concat(_this2.cellClass);

        if (_this2.isMinView) {
          el.dataset.date = date;
        }

        el.textContent = el.dataset.year = current;

        if (index === 0) {
          classList.add('prev');
        } else if (index === 11) {
          classList.add('next');
        }

        if (current < _this2.minYear || current > _this2.maxYear) {
          classList.add('disabled');
        }

        if (_this2.range) {
          var _this2$range = _slicedToArray(_this2.range, 2),
              rangeStart = _this2$range[0],
              rangeEnd = _this2$range[1];

          if (current > rangeStart && current < rangeEnd) {
            classList.add('range');
          }

          if (current === rangeStart) {
            classList.add('range-start');
          }

          if (current === rangeEnd) {
            classList.add('range-end');
          }
        }

        if (_this2.selected.includes(current)) {
          classList.add('selected');
        }

        if (current === _this2.focused) {
          classList.add('focused');
        }

        if (_this2.beforeShow) {
          _this2.performBeforeHook(el, current, date);
        }
      });
    } // Update the view UI by applying the changes of selected and focused items

  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;

      var _ref = this.range || [],
          _ref2 = _slicedToArray(_ref, 2),
          rangeStart = _ref2[0],
          rangeEnd = _ref2[1];

      this.grid.querySelectorAll('.range, .range-start, .range-end, .selected, .focused').forEach(function (el) {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
      });
      Array.from(this.grid.children).forEach(function (el) {
        var current = Number(el.textContent);
        var classList = el.classList;

        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }

        if (current === rangeStart) {
          classList.add('range-start');
        }

        if (current === rangeEnd) {
          classList.add('range-end');
        }

        if (_this3.selected.includes(current)) {
          classList.add('selected');
        }

        if (current === _this3.focused) {
          classList.add('focused');
        }
      });
    } // Update the view UI by applying the change of focused item

  }, {
    key: "refreshFocus",
    value: function refreshFocus() {
      var index = Math.round((this.focused - this.start) / this.step);
      this.grid.querySelectorAll('.focused').forEach(function (el) {
        el.classList.remove('focused');
      });
      this.grid.children[index].classList.add('focused');
    }
  }]);

  return YearsView;
}(_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./src/datepicker.css":
/*!****************************!*\
  !*** ./src/datepicker.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./datepicker.css */ "./node_modules/css-loader/dist/cjs.js!./src/datepicker.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/datepicker.js":
/*!***************************!*\
  !*** ./src/datepicker.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vanillajs_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vanillajs-datepicker */ "./node_modules/vanillajs-datepicker/js/main.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-device-detect */ "./node_modules/react-device-detect/main.js");
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _datepicker_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datepicker.css */ "./src/datepicker.css");
/* harmony import */ var _datepicker_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_datepicker_css__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var DatePicker = /*#__PURE__*/function (_Component) {
  _inherits(DatePicker, _Component);

  var _super = _createSuper(DatePicker);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    return _super.call(this, props);
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (this.calendarRoot !== undefined) {
        this.datepicker = new vanillajs_datepicker__WEBPACK_IMPORTED_MODULE_2__["Datepicker"](this.calendarRoot, {});
        this.calendarRoot.addEventListener('changeDate', function () {
          _this.onDateChanged(_this.datepicker.getDate());
        });
      }
    }
  }, {
    key: "componentWillUnmout",
    value: function componentWillUnmout() {
      if (this.datepicker) {
        this.datepicker.destroy();
      }
    }
  }, {
    key: "onDateChanged",
    value: function onDateChanged(date) {
      if (typeof date === 'string') date = new Date(date);
      this.props.onDateChanged && this.props.onDateChanged(date);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var tagProps = {
        id: props.id,
        style: props.style
      };
      var events = {
        // Click
        onClick: function onClick(e) {
          props.enabled && props.onClick && props.onClick();
        },
        // Focus
        onFocus: function onFocus(e) {
          props.enabled && props.focusState && props.focusState(true);
          props.enabled && props.onFocus && props.onFocus();
        },
        onBlur: function onBlur(e) {
          props.enabled && props.focusState && props.focusState(false);
          props.enabled && props.onBlur && props.onBlur();
        },
        // Hover
        onMouseOver: function onMouseOver(e) {
          props.enabled && props.hoverState && props.hoverState(true);
          props.enabled && props.hoverStart && props.hoverStart();
        },
        onMouseLeave: function onMouseLeave(e) {
          props.enabled && props.hoverState && props.hoverState(false);
          props.enabled && props.hoverEnd && props.hoverEnd();
        },
        // Press
        onMouseDown: function onMouseDown(e) {
          props.enabled && props.pressedState && props.pressedState(true);
          props.enabled && props.pointerDown && props.pointerDown();
        },
        onMouseUp: function onMouseUp(e) {
          props.enabled && props.pressedState && props.pressedState(false);
          props.enabled && props.pointerUp && props.pointerUp();
        },
        onTouchStart: function onTouchStart(e) {
          props.enabled && props.pressedState && props.pressedState(true);
          props.enabled && props.pointerDown && props.pointerDown();
        },
        onTouchEnd: function onTouchEnd(e) {
          props.enabled && props.pressedState && props.pressedState(false);
          props.enabled && props.pointerUp && props.pointerUp();
        },
        onTouchCancel: function onTouchCancel(e) {
          props.enabled && props.pressedState && props.pressedState(false);
          props.enabled && props.pointerUp && props.pointerUp();
        }
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({}, tagProps, {
        className: "ndl-datepicker-button"
      }), this.props.showIcon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: props.iconColor,
        width: "24px",
        height: "24px"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        d: "M0 0h24v24H0V0z",
        fill: "none"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        d: "M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z"
      })) : null, react_device_detect__WEBPACK_IMPORTED_MODULE_3__["isMobile"] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
        type: "date",
        "class": "datepicker-native-input",
        onChange: function onChange(e) {
          _this2.onDateChanged(e.target.value);
        }
      }, events)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
        className: "datepicker-native-input",
        type: "text",
        ref: function ref(r) {
          _this2.calendarRoot = r;
        }
      }, events)));
    }
  }]);

  return DatePicker;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + s4() + s4() + s4() + s4();
}

var DatePickerNode = _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1___default.a.defineReactNode({
  name: 'Date Picker Button',
  category: 'Visuals',
  initialize: function initialize() {
    var _this3 = this;

    this.props.sizeMode = 'explicit';
    this.props.enabled = this.outputs.enabled = this.inputs.enabled === undefined ? true : this.inputs.enabled;
    this.props.id = this.outputs.controlId = 'input-' + guid();
    this.props._nodeId = this.id;

    this.props.onDateChanged = function (date) {
      _this3.outputs.value = date;

      _this3.flagOutputDirty('value');

      _this3.sendSignalOnOutput('onChange');
    };
  },
  frame: {
    margins: true,
    position: true,
    align: true
  },
  getReactComponent: function getReactComponent() {
    return DatePicker;
  },
  inputs: {
    enabled: {
      type: 'boolean',
      displayName: 'Enabled',
      group: 'General'
    },
    value: {
      type: 'date',
      displayName: 'Value',
      group: 'General'
    },
    visible: {
      index: 210,
      displayName: 'Visible',
      group: 'Style',
      "default": true,
      type: 'boolean'
    },
    zIndex: {
      index: 211,
      displayName: 'zIndex',
      group: 'Style',
      type: 'number'
    }
  },
  changed: {
    enabled: function enabled(value) {
      var changed = value !== this.props.enabled;
      this.props.enabled = value;

      if (changed) {
        this.setOutputs({
          enabled: value
        });
        this.forceUpdate();
      }
    },
    value: function value(newDate) {
      if (typeof newDate === 'string') newDate = new Date(newDate);
      var changed = newDate !== this.value;

      if (changed) {
        this.setOutputs({
          value: newDate
        });
        this.forceUpdate();
      }
    },
    visible: function visible(value) {
      if (value) {
        this.removeStyle(['visibility']);
      } else {
        this.setStyle({
          visibility: 'hidden'
        });
      }
    },
    zIndex: function zIndex(value) {
      if (value === undefined) {
        this.removeStyle(['zIndex']);
      } else {
        this.setStyle({
          zIndex: Number(value)
        });
      }
    }
  },
  outputs: {
    controlId: {
      type: 'string',
      displayName: 'Control Id',
      group: 'General'
    },
    enabled: {
      type: 'boolean',
      displayName: 'Enabled',
      group: 'States'
    },
    value: {
      type: 'date',
      displayName: 'Value',
      group: 'States'
    },
    onChange: {
      type: 'signal',
      displayName: 'Change',
      group: 'Events'
    }
  },
  inputCss: {
    opacity: {
      index: 200,
      group: 'Style',
      displayName: 'Opacity',
      type: 'number',
      "default": 1
    },
    backgroundColor: {
      index: 100,
      displayName: 'Background Color',
      group: 'Style',
      type: 'color',
      "default": '#000000'
    },
    // Border styles
    borderRadius: {
      index: 202,
      displayName: 'Border Radius',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px'],
        defaultUnit: 'px'
      },
      "default": 0,
      applyDefault: false
    },
    borderStyle: {
      index: 203,
      displayName: 'Border Style',
      group: 'Style',
      type: {
        name: 'enum',
        enums: [{
          label: 'None',
          value: 'none'
        }, {
          label: 'Solid',
          value: 'solid'
        }, {
          label: 'Dotted',
          value: 'dotted'
        }, {
          label: 'Dashed',
          value: 'dashed'
        }]
      },
      "default": 'none',
      applyDefault: false
    },
    borderWidth: {
      index: 204,
      displayName: 'Border Width',
      group: 'Style',
      type: {
        name: 'number',
        units: ['px'],
        defaultUnit: 'px'
      },
      "default": 0,
      applyDefault: false
    },
    borderColor: {
      index: 205,
      displayName: 'Border Color',
      group: 'Style',
      type: 'color',
      "default": '#000000'
    }
  },
  inputProps: {
    width: {
      index: 11,
      group: 'Dimensions',
      displayName: 'Width',
      type: {
        name: "number",
        units: ["%", "px", 'vw'],
        defaultUnit: "px"
      },
      "default": 32
    },
    height: {
      index: 12,
      group: 'Dimensions',
      displayName: 'Height',
      type: {
        name: "number",
        units: ["%", "px", 'vh'],
        defaultUnit: "px"
      },
      "default": 32
    },
    showIcon: {
      type: 'boolean',
      group: 'Style',
      displayName: 'Show Icon',
      "default": true
    },
    iconColor: {
      index: 24,
      group: 'Style',
      displayName: 'Icon Color',
      type: 'color',
      "default": '#FFFFFF'
    }
  },
  outputProps: {
    // Click
    onClick: {
      type: 'signal',
      group: 'Events',
      displayName: 'Click'
    },
    // Focus
    focusState: {
      type: 'boolean',
      group: 'States',
      displayName: 'Focused'
    },
    onFocus: {
      type: 'signal',
      group: 'Events',
      displayName: 'Focused'
    },
    onBlur: {
      type: 'signal',
      group: 'Events',
      displayName: 'Blurred'
    },
    // Hover
    hoverState: {
      type: 'boolean',
      group: 'States',
      displayName: 'Hover'
    },
    hoverStart: {
      type: 'signal',
      group: 'Events',
      displayName: 'Hover Start'
    },
    hoverEnd: {
      type: 'signal',
      group: 'Events',
      displayName: 'Hover End'
    },
    // Press
    pressedState: {
      type: 'boolean',
      group: 'States',
      displayName: 'Pressed'
    },
    pointerDown: {
      type: 'signal',
      group: 'Events',
      displayName: 'Pointer Down'
    },
    pointerUp: {
      type: 'signal',
      group: 'Events',
      displayName: 'Pointer Up'
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (DatePickerNode);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datepicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datepicker */ "./src/datepicker.js");

Noodl.defineModule({
  reactNodes: [_datepicker__WEBPACK_IMPORTED_MODULE_0__["default"]],
  nodes: [],
  setup: function setup() {//this is called once on startup
  }
});

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map