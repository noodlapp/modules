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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
    var _this = this;

    // Function for quickly setting outputs
    this.setOutputs = function (o) {
      for (var key in o) {
        _outputs[key] = o[key];
        _this.flagOutputDirty(key);
      }
    };

    // Sending warnings
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

/***/ "./src/components/my-counter-button.js":
/*!*********************************************!*\
  !*** ./src/components/my-counter-button.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_my_counter_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/my-counter-context */ "./src/context/my-counter-context.js");



function CounterButton() {
  var _useCounterContext = Object(_context_my_counter_context__WEBPACK_IMPORTED_MODULE_2__["useCounterContext"])(),
    count = _useCounterContext.count,
    increment = _useCounterContext.increment;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: increment
  }, "Increment: ", count);
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__["defineReactNode"])({
  name: 'My Counter Button',
  allowChildren: true,
  getReactComponent: function getReactComponent() {
    return CounterButton;
  }
}));

/***/ }),

/***/ "./src/context/my-counter-context.js":
/*!*******************************************!*\
  !*** ./src/context/my-counter-context.js ***!
  \*******************************************/
/*! exports provided: CounterContext, CounterProvider, useCounterContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CounterContext", function() { return CounterContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CounterProvider", function() { return CounterProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCounterContext", function() { return useCounterContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var CounterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  count: 0,
  increment: null
});
function CounterProvider(_ref) {
  var children = _ref.children;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
    _useState2 = _slicedToArray(_useState, 2),
    count = _useState2[0],
    setCount = _useState2[1];
  var increment = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    setCount(function (prev) {
      return prev + 1;
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CounterContext.Provider, {
    value: {
      count: count,
      increment: increment
    }
  }, children);
}
function useCounterContext() {
  var context = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterContext must be a child of CounterProvider');
  }
  return context;
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__["defineReactNode"])({
  name: 'Counter Provider',
  allowChildren: true,
  getReactComponent: function getReactComponent() {
    return CounterProvider;
  }
}));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_my_counter_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context/my-counter-context */ "./src/context/my-counter-context.js");
/* harmony import */ var _components_my_counter_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/my-counter-button */ "./src/components/my-counter-button.js");



Object(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_0__["defineModule"])({
  reactNodes: [_context_my_counter_context__WEBPACK_IMPORTED_MODULE_1__["default"], _components_my_counter_button__WEBPACK_IMPORTED_MODULE_2__["default"]]
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