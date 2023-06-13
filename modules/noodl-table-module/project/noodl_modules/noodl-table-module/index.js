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

function TableComponent(props) {
  var style = {
    position: "relative",
    borderSpacing: (props.onlyVertical ? "0 " : "") + props.borderSpacingV + "px",
    borderCollapse: props.borderCollapse,
    backgroundColor: props.backgroundColor
  };
  return /*#__PURE__*/React.createElement("table", {
    className: props.className,
    style: style,
    onClick: props.onClick
  }, props.children);
}

var TableNode = Noodl.defineReactNode({
  name: 'Table',
  category: 'Table',
  getReactComponent: function getReactComponent() {
    return TableComponent;
  },
  inputProps: {
    className: {
      type: 'string',
      "default": 'table',
      displayName: 'Class name',
      group: 'Config'
    },
    backgroundColor: {
      type: "color",
      displayName: "Background Color"
    },
    onlyVertical: {
      type: 'boolean',
      "default": true,
      displayName: 'Spacing Vertical Only',
      group: 'Style'
    },
    borderSpacingV: {
      type: 'string',
      "default": '0',
      displayName: 'Border Spacing Vertical',
      group: 'Style'
    },
    borderCollapse: {
      type: {
        name: 'enum',
        enums: [{
          label: "Collapse",
          value: "collapse"
        }, {
          label: "Separate",
          value: "separate"
        }]
      },
      "default": "separate",
      displayName: 'Border collapse',
      group: 'Style'
    }
  },
  outputProps: {
    onClick: {
      type: 'signal',
      displayName: 'Click'
    }
  }
});

function TableHeadComponent(props) {
  var style = {
    position: "relative",
    backgroundColor: props.backgroundColor
  };
  return /*#__PURE__*/React.createElement("thead", {
    className: props.className,
    style: style,
    onClick: props.onClick
  }, props.children);
}

var TableHeadNode = Noodl.defineReactNode({
  name: 'Table Head',
  category: 'Table',
  getReactComponent: function getReactComponent() {
    return TableHeadComponent;
  },
  inputProps: {
    className: {
      type: 'string',
      "default": 'table-head',
      displayName: 'Class name',
      group: 'Config'
    },
    backgroundColor: {
      type: "color",
      displayName: "Background Color"
    }
  },
  outputProps: {
    onClick: {
      type: 'signal',
      displayName: 'Click'
    }
  }
});

function TableBodyComponent(props) {
  var style = {
    position: "relative",
    backgroundColor: props.backgroundColor
  };
  return /*#__PURE__*/React.createElement("tbody", {
    className: props.className,
    style: style,
    onClick: props.onClick
  }, props.children);
}

var TableBodyNode = Noodl.defineReactNode({
  name: 'Table Body',
  category: 'Table',
  getReactComponent: function getReactComponent() {
    return TableBodyComponent;
  },
  inputProps: {
    className: {
      type: 'string',
      "default": 'table-body',
      displayName: 'Class name',
      group: 'Config'
    },
    backgroundColor: {
      type: "color",
      displayName: "Background Color"
    }
  },
  outputProps: {
    onClick: {
      type: 'signal',
      displayName: 'Click'
    }
  }
});

function TableRowComponent(props) {
  var style = {
    position: "relative",
    backgroundColor: props.backgroundColor
  };
  return /*#__PURE__*/React.createElement("tr", {
    className: props.className,
    style: style,
    onClick: props.onClick,
    onMouseEnter: props.hoverStart,
    onMouseLeave: props.hoverEnd
  }, props.children);
}

var TableRowNode = Noodl.defineReactNode({
  name: 'Table Row',
  category: 'Table',
  getReactComponent: function getReactComponent() {
    return TableRowComponent;
  },
  inputProps: {
    className: {
      type: 'string',
      "default": 'table-row',
      displayName: 'Class name',
      group: 'Config'
    },
    backgroundColor: {
      type: "color",
      displayName: "Background Color"
    }
  },
  outputProps: {
    onClick: {
      type: 'signal',
      displayName: 'Click'
    },
    hoverStart: {
      type: 'signal',
      displayName: 'Hover Start'
    },
    hoverEnd: {
      type: 'signal',
      displayName: 'Hover End'
    }
  }
});

function TableCellComponent(props) {
  var style = {
    position: "relative",
    backgroundColor: props.backgroundColor,
    paddingTop: props.paddingTop + "px",
    paddingRight: props.paddingRight + "px",
    paddingBottom: props.paddingBottom + "px",
    paddingLeft: props.paddingLeft + "px"
  };
  var el = /*#__PURE__*/React.createElement("td", {
    className: props.className,
    style: style,
    onClick: props.onClick
  }, props.children);

  if (props.cellType === "th") {
    el = /*#__PURE__*/React.createElement("th", {
      className: props.className,
      style: style,
      onClick: props.onClick
    }, props.children);
  }

  return el;
}

var TableCellNode = Noodl.defineReactNode({
  name: 'Table Cell',
  category: 'Table',
  getReactComponent: function getReactComponent() {
    return TableCellComponent;
  },
  inputProps: {
    cellType: {
      group: 'Element',
      displayName: 'Cell type',
      type: {
        name: 'enum',
        enums: [{
          label: 'Data',
          value: 'td'
        }, {
          label: 'Header',
          value: 'th'
        }]
      },
      "default": 'td'
    },
    paddingTop: {
      type: "number",
      "default": 0,
      displayName: "Padding Top"
    },
    paddingLeft: {
      type: "number",
      "default": 0,
      displayName: "Padding Left"
    },
    paddingBottom: {
      type: "number",
      "default": 0,
      displayName: "Padding Bottom"
    },
    paddingRight: {
      type: "number",
      "default": 0,
      displayName: "Padding Right"
    },
    backgroundColor: {
      type: "color",
      displayName: "Background Color"
    },
    className: {
      type: 'string',
      "default": 'table-header-cell',
      displayName: 'Class name',
      group: 'Config'
    }
  },
  outputProps: {
    onClick: {
      type: 'signal',
      displayName: 'Click'
    }
  }
});
Noodl.defineModule({
  reactNodes: [TableNode, TableHeadNode, TableBodyNode, TableRowNode, TableCellNode],
  nodes: [],
  setup: function setup() {}
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map