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

/***/ "./node_modules/react-fast-marquee/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-fast-marquee/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use client";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ___$insertStyle(css) {
  if (!css || typeof window === 'undefined') {
    return;
  }
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}
Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = __webpack_require__(/*! react */ "react");
function _interopDefaultLegacy(e) {
  return e && _typeof(e) === 'object' && 'default' in e ? e : {
    'default': e
  };
}
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
___$insertStyle(".marquee-container {\n  overflow-x: hidden !important;\n  display: flex !important;\n  flex-direction: row !important;\n  position: relative;\n  width: var(--width);\n  transform: var(--transform);\n}\n.marquee-container:hover div {\n  animation-play-state: var(--pause-on-hover);\n}\n.marquee-container:active div {\n  animation-play-state: var(--pause-on-click);\n}\n\n.overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.overlay::before, .overlay::after {\n  background: linear-gradient(to right, var(--gradient-color));\n  content: \"\";\n  height: 100%;\n  position: absolute;\n  width: var(--gradient-width);\n  z-index: 2;\n}\n.overlay::after {\n  right: 0;\n  top: 0;\n  transform: rotateZ(180deg);\n}\n.overlay::before {\n  left: 0;\n  top: 0;\n}\n\n.marquee {\n  flex: 0 0 auto;\n  min-width: var(--min-width);\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);\n  animation-play-state: var(--play);\n  animation-delay: var(--delay);\n  animation-direction: var(--direction);\n}\n@keyframes scroll {\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-100%);\n  }\n}\n\n.initial-child-container {\n  flex: 0 0 auto;\n  display: flex;\n  min-width: auto;\n  flex-direction: row;\n}\n\n.child {\n  transform: var(--transform);\n}");
var Marquee = React.forwardRef(function Marquee(_ref, ref) {
  var _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$autoFill = _ref.autoFill,
    autoFill = _ref$autoFill === void 0 ? false : _ref$autoFill,
    _ref$play = _ref.play,
    play = _ref$play === void 0 ? true : _ref$play,
    _ref$pauseOnHover = _ref.pauseOnHover,
    pauseOnHover = _ref$pauseOnHover === void 0 ? false : _ref$pauseOnHover,
    _ref$pauseOnClick = _ref.pauseOnClick,
    pauseOnClick = _ref$pauseOnClick === void 0 ? false : _ref$pauseOnClick,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? "left" : _ref$direction,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 50 : _ref$speed,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    _ref$loop = _ref.loop,
    loop = _ref$loop === void 0 ? 0 : _ref$loop,
    _ref$gradient = _ref.gradient,
    gradient = _ref$gradient === void 0 ? false : _ref$gradient,
    _ref$gradientColor = _ref.gradientColor,
    gradientColor = _ref$gradientColor === void 0 ? [255, 255, 255] : _ref$gradientColor,
    _ref$gradientWidth = _ref.gradientWidth,
    gradientWidth = _ref$gradientWidth === void 0 ? 200 : _ref$gradientWidth,
    onFinish = _ref.onFinish,
    onCycleComplete = _ref.onCycleComplete,
    onMount = _ref.onMount,
    children = _ref.children;
  // React Hooks
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    containerWidth = _React$useState2[0],
    setContainerWidth = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    marqueeWidth = _React$useState4[0],
    setMarqueeWidth = _React$useState4[1];
  var _React$useState5 = React.useState(1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    multiplier = _React$useState6[0],
    setMultiplier = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    isMounted = _React$useState8[0],
    setIsMounted = _React$useState8[1];
  var rootRef = React.useRef(null);
  var containerRef = ref || rootRef;
  var marqueeRef = React.useRef(null);
  // Calculate width of container and marquee and set multiplier
  var calculateWidth = React.useCallback(function () {
    if (marqueeRef.current && containerRef.current) {
      var containerRect = containerRef.current.getBoundingClientRect();
      var marqueeRect = marqueeRef.current.getBoundingClientRect();
      var _containerWidth = containerRect.width;
      var _marqueeWidth = marqueeRect.width;
      // Swap width and height if direction is up or down
      if (direction === "up" || direction === "down") {
        _containerWidth = containerRect.height;
        _marqueeWidth = marqueeRect.height;
      }
      if (autoFill && _containerWidth && _marqueeWidth) {
        setMultiplier(_marqueeWidth < _containerWidth ? Math.ceil(_containerWidth / _marqueeWidth) : 1);
      } else {
        setMultiplier(1);
      }
      setContainerWidth(_containerWidth);
      setMarqueeWidth(_marqueeWidth);
    }
  }, [autoFill, containerRef, direction]);
  // Calculate width and multiplier on mount and on window resize
  React.useEffect(function () {
    if (!isMounted) return;
    calculateWidth();
    if (marqueeRef.current && containerRef.current) {
      var resizeObserver = new ResizeObserver(function () {
        return calculateWidth();
      });
      resizeObserver.observe(containerRef.current);
      resizeObserver.observe(marqueeRef.current);
      return function () {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
      };
    }
  }, [calculateWidth, containerRef, isMounted]);
  // Recalculate width when children change
  React.useEffect(function () {
    calculateWidth();
  }, [calculateWidth, children]);
  React.useEffect(function () {
    setIsMounted(true);
  }, []);
  // Runs the onMount callback, if it is a function, when Marquee is mounted.
  React.useEffect(function () {
    if (typeof onMount === "function") {
      onMount();
    }
  }, []);
  // Animation duration
  var duration = React.useMemo(function () {
    if (autoFill) {
      return marqueeWidth * multiplier / speed;
    } else {
      return marqueeWidth < containerWidth ? containerWidth / speed : marqueeWidth / speed;
    }
  }, [autoFill, containerWidth, marqueeWidth, multiplier, speed]);
  // Gradient color in an unfinished rgba format
  var rgbaGradientColor = "rgba(".concat(gradientColor[0], ", ").concat(gradientColor[1], ", ").concat(gradientColor[2]);
  var containerStyle = React.useMemo(function () {
    var _Object$assign;
    return Object.assign(Object.assign({}, style), (_Object$assign = {}, _defineProperty(_Object$assign, "--pause-on-hover", !play || pauseOnHover ? "paused" : "running"), _defineProperty(_Object$assign, "--pause-on-click", !play || pauseOnHover && !pauseOnClick || pauseOnClick ? "paused" : "running"), _defineProperty(_Object$assign, "--width", direction === "up" || direction === "down" ? "100vh" : "100%"), _defineProperty(_Object$assign, "--transform", direction === "up" ? "rotate(-90deg)" : direction === "down" ? "rotate(90deg)" : "none"), _Object$assign));
  }, [style, play, pauseOnHover, pauseOnClick, direction]);
  var gradientStyle = React.useMemo(function () {
    var _ref2;
    return _ref2 = {}, _defineProperty(_ref2, "--gradient-color", "".concat(rgbaGradientColor, ", 1), ").concat(rgbaGradientColor, ", 0)")), _defineProperty(_ref2, "--gradient-width", typeof gradientWidth === "number" ? "".concat(gradientWidth, "px") : gradientWidth), _ref2;
  }, [rgbaGradientColor, gradientWidth]);
  var marqueeStyle = React.useMemo(function () {
    var _ref3;
    return _ref3 = {}, _defineProperty(_ref3, "--play", play ? "running" : "paused"), _defineProperty(_ref3, "--direction", direction === "left" ? "normal" : "reverse"), _defineProperty(_ref3, "--duration", "".concat(duration, "s")), _defineProperty(_ref3, "--delay", "".concat(delay, "s")), _defineProperty(_ref3, "--iteration-count", !!loop ? "".concat(loop) : "infinite"), _defineProperty(_ref3, "--min-width", autoFill ? "auto" : "100%"), _ref3;
  }, [play, direction, duration, delay, loop, autoFill]);
  var childStyle = React.useMemo(function () {
    return _defineProperty({}, "--transform", direction === "up" ? "rotate(90deg)" : direction === "down" ? "rotate(-90deg)" : "none");
  }, [direction]);
  // Render {multiplier} number of children
  var multiplyChildren = React.useCallback(function (multiplier) {
    return _toConsumableArray(Array(Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0)).map(function (_, i) {
      return React__default['default'].createElement(React.Fragment, {
        key: i
      }, React.Children.map(children, function (child) {
        return React__default['default'].createElement("div", {
          style: childStyle,
          className: "child"
        }, child);
      }));
    });
  }, [childStyle, children]);
  return !isMounted ? null : React__default['default'].createElement("div", {
    ref: containerRef,
    style: containerStyle,
    className: "marquee-container " + className
  }, gradient && React__default['default'].createElement("div", {
    style: gradientStyle,
    className: "overlay"
  }), React__default['default'].createElement("div", {
    className: "marquee",
    style: marqueeStyle,
    onAnimationIteration: onCycleComplete,
    onAnimationEnd: onFinish
  }, React__default['default'].createElement("div", {
    className: "initial-child-container",
    ref: marqueeRef
  }, React.Children.map(children, function (child) {
    return React__default['default'].createElement("div", {
      style: childStyle,
      className: "child"
    }, child);
  })), multiplyChildren(multiplier - 1)), React__default['default'].createElement("div", {
    className: "marquee",
    style: marqueeStyle
  }, multiplyChildren(multiplier)));
});
exports["default"] = Marquee;

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
/* harmony import */ var _nodes_marquee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodes/marquee */ "./src/nodes/marquee.jsx");


Object(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_0__["defineModule"])({
  reactNodes: [_nodes_marquee__WEBPACK_IMPORTED_MODULE_1__["default"]]
});

/***/ }),

/***/ "./src/nodes/marquee.jsx":
/*!*******************************!*\
  !*** ./src/nodes/marquee.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
/* harmony import */ var _noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fast_marquee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-fast-marquee */ "./node_modules/react-fast-marquee/dist/index.js");
/* harmony import */ var react_fast_marquee__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_marquee__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function hexToRgbArray(hex) {
  // Remove the '#' symbol if present
  hex = hex.replace('#', '');

  // Convert the hexadecimal value to decimal
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);

  // Return the RGB values as an array
  return [r, g, b];
}
function MarqueeComponent(_ref) {
  var eventHandler = _ref.eventHandler,
    speed = _ref.speed,
    delay = _ref.delay,
    loop = _ref.loop,
    direction = _ref.direction,
    gradientEnabled = _ref.gradientEnabled,
    gradientColor = _ref.gradientColor,
    gradientWidth = _ref.gradientWidth,
    children = _ref.children,
    styles = _ref.styles,
    className = _ref.className;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
    _useState2 = _slicedToArray(_useState, 2),
    isPlaying = _useState2[0],
    setIsPlaying = _useState2[1];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    function handlePlay() {
      setIsPlaying(true);
    }
    function handlePause() {
      setIsPlaying(false);
    }
    function handleToggle() {
      setIsPlaying(function (last) {
        return !last;
      });
    }
    eventHandler.addEventListener('play', handlePlay);
    eventHandler.addEventListener('pause', handlePause);
    eventHandler.addEventListener('toggle', handleToggle);
    return function () {
      eventHandler.removeEventListener('play', handlePlay);
      eventHandler.removeEventListener('pause', handlePause);
      eventHandler.removeEventListener('toggle', handleToggle);
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_fast_marquee__WEBPACK_IMPORTED_MODULE_2___default.a, {
    play: isPlaying,
    autoFill: true,
    direction: direction,
    speed: speed,
    delay: delay,
    loop: loop,
    gradient: gradientEnabled,
    gradientColor: hexToRgbArray(gradientColor),
    gradientWidth: gradientWidth,
    style: styles,
    className: className
  }, children);
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_noodl_noodl_sdk__WEBPACK_IMPORTED_MODULE_1__["defineReactNode"])({
  name: "noodl.marquee",
  displayName: "Marquee",
  getReactComponent: function getReactComponent() {
    return MarqueeComponent;
  },
  inputProps: {
    speed: {
      displayName: "Speed",
      group: "General",
      type: "number",
      "default": 30
    },
    delay: {
      displayName: "Delay",
      group: "General",
      type: "number",
      "default": 0
    },
    loop: {
      displayName: "Loop",
      group: "General",
      type: {
        name: "number"
      },
      "default": 0
    },
    direction: {
      displayName: "Direction",
      group: "General",
      type: {
        name: "enum",
        enums: [{
          label: "Left",
          value: "left"
        }, {
          label: "Right",
          value: "right"
        }, {
          label: "Up",
          value: "up"
        }, {
          label: "Down",
          value: "down"
        }]
      },
      "default": "left"
    },
    gradientEnabled: {
      displayName: "Enabled",
      group: "Gradient",
      type: "boolean",
      "default": true
    },
    gradientColor: {
      displayName: "Color",
      group: "Gradient",
      type: "color",
      "default": "#ffffff"
    },
    gradientWidth: {
      displayName: "Width",
      group: "Gradient",
      type: "number",
      "default": 200
    }
  },
  initialize: function initialize() {
    this.props.eventHandler = new EventTarget();
  },
  signals: {
    Pause: function Pause() {
      this.props.eventHandler.dispatchEvent(new Event("pause"));
    },
    Play: function Play() {
      this.props.eventHandler.dispatchEvent(new Event("play"));
    },
    Toggle: function Toggle() {
      this.props.eventHandler.dispatchEvent(new Event("toggle"));
    }
  }
}));

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