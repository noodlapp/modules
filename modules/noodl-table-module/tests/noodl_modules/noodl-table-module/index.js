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
  return _def.node;
};

module.exports = Noodl;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");

var TableNode = __webpack_require__(/*! ./nodes/table */ "./src/nodes/table.js");

var TableBodyNode = __webpack_require__(/*! ./nodes/table-body */ "./src/nodes/table-body.js");

var TableCellNode = __webpack_require__(/*! ./nodes/table-cell */ "./src/nodes/table-cell.js");

var TableHeadNode = __webpack_require__(/*! ./nodes/table-head */ "./src/nodes/table-head.js");

var TableRowNode = __webpack_require__(/*! ./nodes/table-row */ "./src/nodes/table-row.js");

Noodl.defineModule({
  reactNodes: [TableNode, TableHeadNode, TableBodyNode, TableRowNode, TableCellNode],
  nodes: [],
  setup: function setup() {}
});

/***/ }),

/***/ "./src/nodes/helper.js":
/*!*****************************!*\
  !*** ./src/nodes/helper.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function isPercentage(size) {
  return size && size[size.length - 1] === '%';
}

function getPercentage(size) {
  return Number(size.slice(0, -1));
}

function getSizeWithMargins(size, startMargin, endMargin) {
  if (!startMargin && !endMargin) {
    return size;
  }

  var css = "calc(".concat(size);

  if (startMargin) {
    css += " - ".concat(startMargin);
  }

  if (endMargin) {
    css += " - ".concat(endMargin);
  }

  css += ')';
  return css;
}

module.exports = {
  paddingCssProps: {
    paddingLeft: {
      index: 0,
      group: "Padding",
      "default": 0,
      applyDefault: false,
      displayName: "Pad Left",
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-left"
      },
      allowVisualStates: true
    },
    paddingRight: {
      index: 0,
      group: "Padding",
      "default": 0,
      applyDefault: false,
      displayName: "Pad Right",
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-right"
      },
      allowVisualStates: true
    },
    paddingTop: {
      index: 0,
      group: "Padding",
      displayName: "Pad Top",
      "default": 0,
      applyDefault: false,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-top"
      },
      allowVisualStates: true
    },
    paddingBottom: {
      index: 0,
      group: "Padding",
      displayName: "Pad Bottom",
      "default": 0,
      applyDefault: false,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-bottom"
      },
      allowVisualStates: true
    }
  },
  boxShadowProps: {
    boxShadowEnabled: {
      index: 250,
      group: "Box Shadow",
      displayName: "Shadow Enabled",
      type: "boolean",
      "default": false
    },
    boxShadowOffsetX: {
      index: 251,
      group: "Box Shadow",
      displayName: "Offset X",
      "default": 0,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px"
      }
    },
    boxShadowOffsetY: {
      index: 252,
      group: "Box Shadow",
      displayName: "Offset Y",
      "default": 0,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px"
      }
    },
    boxShadowBlurRadius: {
      index: 253,
      group: "Box Shadow",
      displayName: "Blur Radius",
      "default": 5,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px"
      }
    },
    boxShadowSpreadRadius: {
      index: 254,
      group: "Box Shadow",
      displayName: "Spread Radius",
      "default": 2,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px"
      }
    },
    boxShadowInset: {
      index: 255,
      group: "Box Shadow",
      displayName: "Inset",
      type: "boolean",
      "default": false
    },
    boxShadowColor: {
      index: 256,
      group: "Box Shadow",
      displayName: "Shadow Color",
      type: "color",
      "default": "rgba(0,0,0,0.2)"
    }
  },
  size: function size(style, props) {
    if (props.parentLayout === 'none') {
      style.position = 'absolute';
    }

    if (props.sizeMode === 'explicit') {
      style.width = props.width;
      style.height = props.height;
    } else if (props.sizeMode === 'contentHeight') {
      style.width = props.width;
    } else if (props.sizeMode === 'contentWidth') {
      style.height = props.height;
    }

    style.flexShrink = 0;

    if (props.parentLayout === 'row' && style.position === 'relative') {
      if (isPercentage(style.width) && !props.fixedWidth) {
        style.flexGrow = getPercentage(style.width);
        style.flexShrink = 1;
      }

      if (isPercentage(style.height) && !props.fixedHeight) {
        style.height = getSizeWithMargins(style.height, style.marginTop, style.marginBottom);
      }
    } else if (props.parentLayout === 'column' && style.position === 'relative') {
      if (isPercentage(style.width) && !props.fixedWidth) {
        style.width = getSizeWithMargins(style.width, style.marginLeft, style.marginRight);
      }

      if (isPercentage(style.height) && !props.fixedHeight) {
        style.flexGrow = getPercentage(style.height);
        style.flexShrink = 1;
      }
    } else if (style.position !== 'relative') {
      if (isPercentage(style.width)) {
        style.width = getSizeWithMargins(style.width, style.marginLeft, style.marginRight);
      }

      if (isPercentage(style.height)) {
        style.height = getSizeWithMargins(style.height, style.marginTop, style.marginBottom);
      }
    }
  }
};

/***/ }),

/***/ "./src/nodes/table-body.js":
/*!*********************************!*\
  !*** ./src/nodes/table-body.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TableBodyComponent(props) {
  var style = _objectSpread({
    position: "relative",
    backgroundColor: props.backgroundColor
  }, props.style || {});

  return /*#__PURE__*/React.createElement("tbody", {
    className: props.className,
    style: style,
    onClick: props.onClick
  }, props.children);
}

var TableBodyNode = Noodl.defineReactNode({
  name: "Table Body",
  category: "Table",
  getReactComponent: function getReactComponent() {
    return TableBodyComponent;
  },
  inputProps: {
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      "default": "table-body"
    }
  },
  inputCss: {
    backgroundColor: {
      index: 201,
      displayName: "Background Color",
      group: "Style",
      type: "color",
      allowVisualStates: true,
      "default": "transparent",
      applyDefault: false
    }
  },
  outputProps: {
    onClick: {
      type: "signal",
      displayName: "Click"
    }
  }
});
module.exports = TableBodyNode;

/***/ }),

/***/ "./src/nodes/table-cell.js":
/*!*********************************!*\
  !*** ./src/nodes/table-cell.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ./helper */ "./src/nodes/helper.js"),
    paddingCssProps = _require.paddingCssProps,
    boxShadowProps = _require.boxShadowProps;

function TableCellComponent(props) {
  var style = _objectSpread({
    position: "relative",
    verticalAlign: props.verticalAlign
  }, props.style || {});

  if (props.boxShadowEnabled) {
    style.boxShadow = "".concat(props.boxShadowInset ? "inset " : "").concat(props.boxShadowOffsetX, " ").concat(props.boxShadowOffsetY, " ").concat(props.boxShadowBlurRadius, " ").concat(props.boxShadowSpreadRadius, " ").concat(props.boxShadowColor);
  }

  if (props.visible === false) {
    style.visibility = "hidden";
  }

  var el = /*#__PURE__*/React.createElement("td", {
    className: props.cssClassName,
    style: style,
    onClick: props.onClick
  }, props.children);

  if (props.cellType === "th") {
    el = /*#__PURE__*/React.createElement("th", {
      className: props.cssClassName,
      style: style,
      onClick: props.onClick
    }, props.children);
  }

  return el;
}

var TableCellNode = Noodl.defineReactNode({
  name: "Table Cell",
  category: "Table",
  getReactComponent: function getReactComponent() {
    return TableCellComponent;
  },
  inputProps: _objectSpread({
    cellType: {
      group: "Element",
      displayName: "Cell type",
      type: {
        name: "enum",
        enums: [{
          label: "Data",
          value: "td"
        }, {
          label: "Header",
          value: "th"
        }]
      },
      "default": "td",
      tooltip: {
        standard: 'Data Table Cell Or Header Table Cell'
      }
    },
    visible: {
      index: 210,
      displayName: "Visible",
      group: "Style",
      "default": true,
      type: "boolean"
    },
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      "default": "table-header-cell"
    },
    verticalAlign: {
      index: 14,
      group: "Alignment",
      displayName: "Vertical Align",
      type: {
        name: "enum",
        enums: [{
          label: "Top",
          value: "top"
        }, {
          label: "Center",
          value: "middle"
        }, {
          label: "Bottom",
          value: "bottom"
        }, {
          label: "Baseline",
          value: "baseline"
        }]
      },
      "default": "middle"
    }
  }, boxShadowProps),
  inputCss: _objectSpread({
    opacity: {
      index: 200,
      group: "Style",
      displayName: "Opacity",
      type: "number",
      "default": 1,
      allowVisualStates: true
    },
    backgroundColor: {
      index: 201,
      displayName: "Background Color",
      group: "Style",
      type: "color",
      allowVisualStates: true,
      "default": "transparent",
      applyDefault: false
    }
  }, paddingCssProps),
  outputProps: {
    onClick: {
      type: "signal",
      displayName: "Click"
    }
  }
});
module.exports = TableCellNode;

/***/ }),

/***/ "./src/nodes/table-head.js":
/*!*********************************!*\
  !*** ./src/nodes/table-head.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TableHeadComponent(props) {
  var style = _objectSpread({
    position: "relative"
  }, props.style || {});

  return /*#__PURE__*/React.createElement("thead", {
    className: props.cssClassName,
    style: style,
    onClick: props.onClick
  }, props.children);
}

var TableHeadNode = Noodl.defineReactNode({
  name: "Table Head",
  category: "Table",
  getReactComponent: function getReactComponent() {
    return TableHeadComponent;
  },
  inputProps: {
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      "default": "table-head"
    }
  },
  outputProps: {
    onClick: {
      type: "signal",
      displayName: "Click"
    }
  }
});
module.exports = TableHeadNode;

/***/ }),

/***/ "./src/nodes/table-row.js":
/*!********************************!*\
  !*** ./src/nodes/table-row.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ./helper */ "./src/nodes/helper.js"),
    boxShadowProps = _require.boxShadowProps;

function TableRowComponent(props) {
  var style = _objectSpread({
    position: "relative",
    backgroundColor: props.backgroundColor
  }, props.style || {});

  if (props.boxShadowEnabled) {
    style.boxShadow = "".concat(props.boxShadowInset ? "inset " : "").concat(props.boxShadowOffsetX, " ").concat(props.boxShadowOffsetY, " ").concat(props.boxShadowBlurRadius, " ").concat(props.boxShadowSpreadRadius, " ").concat(props.boxShadowColor);
  }

  if (props.visible === false) {
    style.visibility = "hidden";
  }

  return /*#__PURE__*/React.createElement("tr", {
    className: props.cssClassName,
    style: style,
    onClick: props.onClick,
    onMouseEnter: props.hoverStart,
    onMouseLeave: props.hoverEnd
  }, props.children);
}

var TableRowNode = Noodl.defineReactNode({
  name: "Table Row",
  category: "Table",
  getReactComponent: function getReactComponent() {
    return TableRowComponent;
  },
  inputs: {},
  inputProps: _objectSpread({
    visible: {
      index: 210,
      displayName: "Visible",
      group: "Style",
      "default": true,
      type: "boolean"
    },
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      "default": "table-row"
    }
  }, boxShadowProps),
  inputCss: {
    height: {
      index: 101,
      group: "Dimensions",
      displayName: "Height",
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px"
      },
      "default": undefined,
      allowVisualStates: true
    },
    opacity: {
      index: 200,
      group: "Style",
      displayName: "Opacity",
      type: "number",
      "default": 1,
      allowVisualStates: true
    },
    backgroundColor: {
      index: 201,
      displayName: "Background Color",
      group: "Style",
      type: "color",
      allowVisualStates: true,
      "default": "transparent",
      applyDefault: false
    }
  },
  outputProps: {
    onClick: {
      type: "signal",
      displayName: "Click"
    },
    hoverStart: {
      type: "signal",
      displayName: "Hover Start"
    },
    hoverEnd: {
      type: "signal",
      displayName: "Hover End"
    }
  }
});
module.exports = TableRowNode;

/***/ }),

/***/ "./src/nodes/table.js":
/*!****************************!*\
  !*** ./src/nodes/table.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ./helper */ "./src/nodes/helper.js"),
    size = _require.size;

function TableComponent(props) {
  var style = _objectSpread({
    position: "relative",
    borderSpacing: props.borderSpacingVertical + " " + props.borderSpacingHorizontal,
    // borderSpacingVertical == 0 && borderSpacingHorizontal == 0 equals to borderSpacing collapse
    borderCollapse: "separate"
  }, props.style || {});

  size(style, props);
  return /*#__PURE__*/React.createElement("table", {
    className: props.cssClassName,
    style: style,
    onClick: props.onClick
  }, props.children);
}

var TableNode = Noodl.defineReactNode({
  name: "Table",
  category: "Table",
  getReactComponent: function getReactComponent() {
    return TableComponent;
  },
  inputProps: {
    sizeMode: {
      index: 10,
      type: {
        name: "enum",
        enums: [{
          value: 'explicit',
          label: 'Explicit'
        }, {
          value: 'contentWidth',
          label: 'Content Width'
        }, {
          value: 'contentHeight',
          label: 'Content Height'
        }, {
          value: 'contentSize',
          label: 'Content Size'
        }],
        allowEditOnly: true,
        sizeComp: 'mode'
      },
      group: "Dimensions",
      displayName: "Size Mode",
      "default": 'contentHeight'
    },
    width: {
      index: 11,
      group: 'Dimensions',
      displayName: 'Width',
      type: {
        name: "number",
        units: ["%", "px", 'vw'],
        defaultUnit: "%"
      },
      "default": 100
    },
    height: {
      index: 13,
      group: 'Dimensions',
      displayName: 'Height',
      type: {
        name: "number",
        units: ["%", "px", 'vh'],
        defaultUnit: "%"
      },
      "default": 100
    },
    borderSpacingHorizontal: {
      "default": 0,
      displayName: "Horizontal Gap",
      group: "Table Style",
      type: {
        name: "number",
        units: ["px", "rem", "em", "cm"],
        defaultUnit: "px"
      }
    },
    borderSpacingVertical: {
      "default": 0,
      displayName: "Vertical Gap",
      group: "Table Style",
      type: {
        name: "number",
        units: ["px", "rem", "em", "cm"],
        defaultUnit: "px"
      }
    },
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      "default": "table"
    }
  },
  inputCss: {
    opacity: {
      index: 200,
      group: "Style",
      displayName: "Opacity",
      type: "number",
      "default": 1,
      allowVisualStates: true
    },
    backgroundColor: {
      index: 201,
      displayName: "Background Color",
      group: "Style",
      type: "color",
      allowVisualStates: true,
      "default": "transparent",
      applyDefault: false
    }
  },
  outputProps: {
    onClick: {
      type: "signal",
      displayName: "Click"
    }
  }
});
module.exports = TableNode;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map