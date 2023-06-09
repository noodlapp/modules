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

Noodl.defineNode = function (def) {
  var _def = {};
  var _outputs = {};
  _def.name = def.name;
  _def.displayNodeName = def.displayName;
  _def.color = def.color || 'default';
  _def.category = def.category || 'Modules';

  _def.initialize = function () {
    this.inputs = {};

    var _this = this;

    this.setOutputs = function (o) {
      for (var key in o) {
        _outputs[key] = o[key];

        _this.flagOutputDirty(key);
      }
    };

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
      valueChangedToTrue: function () {
        var _key = key;
        return function () {
          var _this2 = this;

          if (typeof def.signals[_key] === 'function') {
            this.scheduleAfterInputsHaveUpdated(function () {
              def.signals[_key].apply(_this2);
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
        type: def.outputs[key],
        getter: function (_key) {
          return _outputs[_key];
        }.bind(this, key)
      };
    }
  }

  _def.methods = _def.prototypeExtensions = {};

  for (var key in def.methods) {
    _def.prototypeExtensions[key] = def.methods[key];
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

var WebRouter = __webpack_require__(/*! ./webrouter */ "./src/webrouter.js");

Noodl.defineModule({
  reactNodes: [WebRouter.RouterNode],
  nodes: [WebRouter.NavigateNode, WebRouter.ClosePopupNode, WebRouter.ShowPopupNode],
  setup: function setup() {}
});

/***/ }),

/***/ "./src/webrouter.js":
/*!**************************!*\
  !*** ./src/webrouter.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + s4() + s4() + s4() + s4();
}

var _routers = {};
var RouterNode = {
  name: 'Web Router',
  category: 'Visual',
  initialize: function initialize() {
    var _this2 = this;

    var internal = this._internal;
    internal.pageInfo = {};
    window.addEventListener('hashchange', function () {
      _this2.refresh();
    });
  },
  inputs: {
    name: {
      type: {
        name: 'string',
        identifierOf: 'WebRouterName',
        identifierDisplayName: 'Web Router Names'
      },
      "default": 'Main',
      displayName: 'Name',
      group: 'General',
      set: function set(value) {
        this._internal.name = value;
        this.scheduleRefresh();
      }
    },
    pages: {
      type: 'stringlist',
      group: 'Pages',
      set: function set(value) {
        this._internal.pages = value;
      }
    }
  },
  outputs: {},
  methods: {
    setPageComponent: function setPageComponent(page, component) {
      var internal = this._internal;
      if (!internal.pageInfo[page]) internal.pageInfo[page] = {};
      internal.pageInfo[page].component = component;
      this.scheduleRefresh();
    },
    setPagePath: function setPagePath(page, path) {
      var internal = this._internal;
      if (!internal.pageInfo[page]) internal.pageInfo[page] = {};
      internal.pageInfo[page].path = path;
      this.scheduleRefresh();
    },
    setDefaultPage: function setDefaultPage(page) {
      this._internal.defaultPage = page;
      this.scheduleRefresh();
    },
    scheduleRefresh: function scheduleRefresh() {
      var _this = this;

      var internal = this._internal;

      if (!internal.hasScheduledRefresh) {
        internal.hasScheduledRefresh = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          internal.hasScheduledRefresh = false;

          _this.refresh();
        });
      }
    },
    switchToPage: function switchToPage(page, params) {
      var internal = this._internal;

      if (internal.currentPage === page) {
        // This is the page we are showing just push params and return
        for (var inputKey in params) {
          internal.currentPageNode.setInputValue(inputKey, decodeURIComponent(params[inputKey]));
        }

        return;
      } // Clear


      var children = this.getChildren();

      for (var i in children) {
        var c = children[i];
        this.removeChild(c);
      }

      var pageInfo = internal.pageInfo[page];
      var pageNode = this.nodeScope.createNode(pageInfo.component, guid());

      for (var inputKey in params) {
        console.log(inputKey, decodeURIComponent(params[inputKey]));
        pageNode.setInputValue(inputKey, decodeURIComponent(params[inputKey]));
      }

      this.addChild(pageNode);
      internal.currentPage = page;
      internal.currentPageNode = pageNode;
    },
    showPopup: function showPopup(popupComponent, params, cb) {
      var _this3 = this;

      var popupNode = this.nodeScope.createNode(popupComponent, guid());

      for (var inputKey in params) {
        popupNode.setInputValue(inputKey, params[inputKey]);
      }

      var closePopupNodes = popupNode.nodeScope.getNodesWithType('WebRouterClosePopup');

      if (closePopupNodes && closePopupNodes.length > 0) {
        for (var j = 0; j < closePopupNodes.length; j++) {
          closePopupNodes[j]._setCloseCallback(function (action, results) {
            _this3.removeChild(popupNode);

            cb && cb.onClosePopup && cb.onClosePopup(action, results);
          });
        }
      }

      this.addChild(popupNode);
    },
    refresh: function refresh() {
      var _this4 = this;

      var internal = this._internal;
      _routers[internal.name || 'Main'] = this;
      if (!this._internal.pages) return; // Match with hash and switch to page

      var hash = location.hash;
      var hasSwitched = false;

      if (hash) {
        if (hash[0] === '#') hash = hash.substring(1);
        if (hash[0] === '/') hash = hash.substring(1);
        var pathComponents = hash.split('/');
        internal.pages.split(',').some(function (p) {
          var path = internal.pageInfo[p].path;
          if (!path) return;
          if (path[0] === '/') path = path.substring(1);
          var params = {};
          var pagePathComponents = path.split('/'); // Must be equal length, or wildcard

          if (pagePathComponents.length !== pathComponents.length && !(pagePathComponents[pagePathComponents.length - 1] === '*' && pathComponents.length >= pagePathComponents.length)) return;

          for (var i = 0; i < pagePathComponents.length; i++) {
            if (i >= pathComponents.length) break;
            var ppc = pagePathComponents[i];
            var pc = pathComponents[i];

            if (ppc === '*') {// Match all
            } else if (ppc.startsWith('{') && ppc.endsWith('}')) {
              // This is a parameter, skip
              params[ppc.substring(1, ppc.length - 1)] = pc;
            } else if (pc.toLowerCase() !== ppc.toLowerCase()) {
              // Not matching
              return;
            }
          } // This page matches the path


          _this4.switchToPage(p, params);

          hasSwitched = true;
          return true;
        });
      }

      if (!hasSwitched) {
        var pages = this._internal.pages.split(',');

        this.switchToPage(this._internal.defaultPage || pages[0]);
      }
    },
    registerInputIfNeeded: function registerInputIfNeeded(name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith('pageComponent-')) return this.registerInput(name, {
        set: this.setPageComponent.bind(this, name.substring('pageComponent-'.length))
      });
      if (name.startsWith('pagePath-')) return this.registerInput(name, {
        set: this.setPagePath.bind(this, name.substring('pagePath-'.length))
      });
      if (name === 'defaultPage') return this.registerInput(name, {
        set: this.setDefaultPage.bind(this)
      });
    }
  },
  getReactComponent: function getReactComponent() {
    return function (props) {
      var style = {
        width: '100%',
        height: '100%',
        position: 'relative'
      };
      return /*#__PURE__*/React.createElement("div", {
        style: style
      }, props.children);
    };
  },
  setup: function setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("nodeAdded.Web Router", function (node) {
      function _updatePorts() {
        var ports = [];
        var pages = node.parameters['pages'];

        if (pages) {
          var _pages = pages.split(',');

          _pages.forEach(function (p) {
            // Component for page
            ports.push({
              name: 'pageComponent-' + p,
              displayName: 'Component',
              plug: 'input',
              type: 'component',
              group: p + ' Page'
            }); // Path for page

            ports.push({
              name: 'pagePath-' + p,
              displayName: 'Path',
              plug: 'input',
              type: 'string',
              group: p + ' Page'
            });
          });

          ports.push({
            plug: 'input',
            type: {
              name: 'enum',
              enums: _pages,
              allowEditOnly: true
            },
            group: 'Pages',
            displayName: 'Default',
            name: 'defaultPage',
            "default": _pages[0]
          });
        }

        context.editorConnection.sendDynamicPorts(node.id, ports);
      }

      _updatePorts();

      node.on('parameterUpdated', function (event) {
        if (event.name === 'pages') _updatePorts();
      });
    });
  }
};
var NavigateNode = Noodl.defineNode({
  name: 'WebRouterNavigate',
  category: 'Web Router',
  initialize: function initialize() {
    this._internal.pageParams = {};
  },
  inputs: {},
  signals: {
    'Navigate': function Navigate() {
      this.scheduleNavigate();
    }
  },
  methods: {
    setRouter: function setRouter(router) {
      this._internal.router = router;
    },
    setPage: function setPage(page) {
      this._internal.page = page;
    },
    setPageParam: function setPageParam(param, value) {
      this._internal.pageParams[param] = value;
    },
    scheduleNavigate: function scheduleNavigate() {
      var _this = this;

      var internal = this._internal;

      if (!internal.hasScheduledNavigate) {
        internal.hasScheduledNavigate = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          internal.hasScheduledNavigate = false;

          _this.navigate();
        });
      }
    },
    navigate: function navigate() {
      if (this._internal.page == undefined) return;
      var routerName = this._internal.router || 'Main';
      var router = _routers[routerName];
      if (!router) return;
      var pageInfo = router._internal.pageInfo[this._internal.page];
      if (!pageInfo) return;
      var path = pageInfo.path;

      for (var key in this._internal.pageParams) {
        path = path.replace('{' + key + '}', this._internal.pageParams[key]);
      }

      location.hash = path;
    },
    registerInputIfNeeded: function registerInputIfNeeded(name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith('pageParam-')) return this.registerInput(name, {
        set: this.setPageParam.bind(this, name.substring('pageParam-'.length))
      });
      if (name === 'router') return this.registerInput(name, {
        set: this.setRouter.bind(this)
      });
      if (name === 'page') return this.registerInput(name, {
        set: this.setPage.bind(this)
      });
    }
  },
  setup: function setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("nodeAdded.WebRouterNavigate", function (node) {
      function _updatePorts() {
        var ports = [];
        var routers = graphModel.getNodesWithType('Web Router');
        var _routers = {};
        routers.forEach(function (r) {
          return _routers[r.parameters['name'] || 'Main'] = true;
        });
        _routers = Object.keys(_routers);
        ports.push({
          plug: 'input',
          type: {
            name: 'enum',
            enums: _routers,
            allowEditOnly: true
          },
          group: 'General',
          displayName: 'Router',
          name: 'router',
          "default": _routers[0]
        }); // Collect pages

        var selectedRouter = node.parameters['router'] || 'Main';
        var _pageInfo = {};
        routers.forEach(function (r) {
          if ((r.parameters['name'] || 'Main') === selectedRouter) {
            var pages = r.parameters['pages'];

            if (pages) {
              pages.split(',').forEach(function (p) {
                _pageInfo[p] = {
                  path: r.parameters['pagePath-' + p]
                };
              });
            }
          }
        });

        var _pages = Object.keys(_pageInfo);

        if (_pages.length > 0) {
          ports.push({
            plug: 'input',
            type: {
              name: 'enum',
              enums: _pages,
              allowEditOnly: true
            },
            group: 'General',
            displayName: 'Page',
            name: 'page',
            "default": _pages[0]
          });
          var selectedPage = node.parameters['page'] || _pages[0];

          if (selectedPage && _pageInfo[selectedPage]) {
            // Collect page parameters
            var path = _pageInfo[selectedPage].path;
            var pathParams = [];
            path.split('/').forEach(function (p) {
              if (p.startsWith('{') && p.endsWith('}')) pathParams.push(p.substring(1, p.length - 1));
            });
            pathParams.forEach(function (param) {
              ports.push({
                plug: 'input',
                type: '*',
                group: 'Parameters',
                displayName: param,
                name: 'pageParam-' + param
              });
            });
          }
        }

        context.editorConnection.sendDynamicPorts(node.id, ports);
      }

      _updatePorts();

      node.on('parameterUpdated', function (event) {
        if (event.name === 'router') _updatePorts();
      }); // Web router added or changed

      graphModel.on("nodeAdded.Web Router", function (node) {
        _updatePorts();

        node.on('parameterUpdated', function (event) {
          if (event.name === 'pages' || event.name === 'name') _updatePorts();
        });
      });
    });
  }
});
var ShowPopupNode = Noodl.defineNode({
  name: 'WebRouterShowPopup',
  displayNodeName: 'Show Popup',
  "package": 'Web Router',
  initialize: function initialize() {
    this._internal.popupParams = {};
  },
  inputs: {
    Target: 'component'
  },
  outputs: {
    Closed: 'signal'
  },
  signals: {
    'Show': function Show() {
      this.scheduleShow();
    }
  },
  changed: {
    Target: function Target(value) {
      this._internal.target = value;
    }
  },
  methods: {
    setRouter: function setRouter(router) {
      this._internal.router = router;
    },
    setPopupParam: function setPopupParam(param, value) {
      this._internal.popupParams[param] = value;
    },
    getCloseResult: function getCloseResult(param) {
      return this._internal.closeResults[param];
    },
    scheduleShow: function scheduleShow() {
      var _this = this;

      var internal = this._internal;

      if (!internal.hasScheduledShow) {
        internal.hasScheduledShow = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          internal.hasScheduledShow = false;

          _this.show();
        });
      }
    },
    show: function show() {
      var _this5 = this;

      if (this._internal.target == undefined) return;
      var routerName = this._internal.router || 'Main';
      var router = _routers[routerName];
      if (!router) return;
      router.showPopup(this._internal.target, this._internal.popupParams, {
        onClosePopup: function onClosePopup(action, results) {
          _this5._internal.closeResults = results;
          if (action === 'close') _this5.sendSignalOnOutput('Closed');else _this5.sendSignalOnOutput(action);
        }
      });
    },
    registerInputIfNeeded: function registerInputIfNeeded(name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith('popupParam-')) return this.registerInput(name, {
        set: this.setPopupParam.bind(this, name.substring('popupParam-'.length))
      });
      if (name === 'router') return this.registerInput(name, {
        set: this.setRouter.bind(this)
      });
    },
    registerOutputIfNeeded: function registerOutputIfNeeded(name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith('closeResult-')) return this.registerOutput(name, {
        getter: this.getCloseResult.bind(this, name.substring('closeResult-'.length))
      });
      if (name.startsWith('closeAction-')) return this.registerOutput(name, {
        getter: function getter() {
          /** No needed for signals */
        }
      });
    }
  },
  setup: function setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("nodeAdded.WebRouterShowPopup", function (node) {
      var targetComponentName = node.parameters.Target;

      function _collectPortsInTargetComponent() {
        var ports = [];
        var routers = graphModel.getNodesWithType('Web Router');
        var _routers = {};
        routers.forEach(function (r) {
          return _routers[r.parameters['name'] || 'Main'] = true;
        });
        _routers = Object.keys(_routers);
        ports.push({
          plug: 'input',
          type: {
            name: 'enum',
            enums: _routers,
            allowEditOnly: true
          },
          group: 'General',
          displayName: 'Router',
          name: 'router',
          "default": _routers[0]
        });
        var c = graphModel.components[targetComponentName];

        if (c) {
          for (var inputName in c.inputPorts) {
            var o = c.inputPorts[inputName];
            ports.push({
              name: 'popupParam-' + inputName,
              displayName: inputName,
              type: '*',
              plug: 'input',
              group: 'Params'
            });
          }

          for (var nodeId in c.nodes) {
            var _n = c.nodes[nodeId];

            if (_n.type === 'WebRouterClosePopup' && _n.parameters['CloseActions']) {
              if (_n.parameters['CloseActions']) {
                _n.parameters['CloseActions'].split(',').forEach(function (a) {
                  if (ports.find(function (p) {
                    return p.name === a;
                  })) return;
                  ports.push({
                    name: 'closeAction-' + a,
                    displayName: a,
                    type: 'signal',
                    plug: 'output',
                    group: 'Close Actions'
                  });
                });
              }

              if (_n.parameters['Results']) {
                _n.parameters['Results'].split(',').forEach(function (p) {
                  ports.push({
                    name: 'closeResult-' + p,
                    displayName: p,
                    type: '*',
                    plug: 'output',
                    group: 'Close Results'
                  });
                });
              }
            }
          }
        }

        context.editorConnection.sendDynamicPorts(node.id, ports);
      } // Find all For Each Action nodes


      function _trackComponentInputs(c) {
        if (!c) return;
        c.on('inputPortAdded', _collectPortsInTargetComponent);
        c.on('inputPortRemoved', _collectPortsInTargetComponent);
      }

      if (targetComponentName) {
        _collectPortsInTargetComponent();

        _trackComponentInputs(graphModel.components[targetComponentName]);
      }

      graphModel.on('componentAdded', function (component) {
        if (component.name === targetComponentName) {
          _collectPortsInTargetComponent();

          _trackComponentInputs(component);
        }
      });
      node.on("parameterUpdated", function (event) {
        if (event.name === 'Target') {
          targetComponentName = node.parameters.Target; // Switched target component

          _collectPortsInTargetComponent();

          _trackComponentInputs(graphModel.components[targetComponentName]);
        }
      });
    });
  }
});

function _createSignal(args) {
  var currentValue = false;
  return function (value) {
    value = value ? true : false; //value changed from false to true

    if (value && currentValue === false) {
      args.valueChangedToTrue.call(this);
    }

    currentValue = value;
  };
}

var ClosePopupNode = Noodl.defineNode({
  name: 'WebRouterClosePopup',
  displayNodeName: 'Close Popup',
  "package": 'Web Router',
  initialize: function initialize() {
    this._internal.resultValues = {};
  },
  inputs: {
    Results: {
      type: {
        name: 'stringlist',
        allowEditOnly: true
      },
      group: 'Results'
    },
    CloseActions: {
      type: {
        name: 'stringlist',
        allowEditOnly: true
      },
      group: 'Close Actions'
    }
  },
  signals: {
    'Close': function Close() {
      this._internal.closeAction = 'close';
      this.scheduleClose();
    }
  },
  methods: {
    setResultValue: function setResultValue(key, value) {
      this._internal.resultValues[key] = value;
    },
    _setCloseCallback: function _setCloseCallback(cb) {
      this._internal.closeCallback = cb;
    },
    scheduleClose: function scheduleClose() {
      var _this = this;

      var internal = this._internal;

      if (!internal.hasScheduledClose) {
        internal.hasScheduledClose = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          internal.hasScheduledClose = false;

          _this.close();
        });
      }
    },
    close: function close() {
      if (this._internal.closeCallback) this._internal.closeCallback(this._internal.closeAction, this._internal.resultValues);
    },
    closeActionTriggered: function closeActionTriggered(name) {
      this._internal.closeAction = name;
      this.scheduleClose();
    },
    registerInputIfNeeded: function registerInputIfNeeded(name) {
      if (this.hasInput(name)) {
        return;
      }

      if (name.startsWith('result-')) return this.registerInput(name, {
        set: this.setResultValue.bind(this, name.substring('result-'.length))
      });
      if (name.startsWith('closeAction-')) return this.registerInput(name, {
        set: _createSignal({
          valueChangedToTrue: this.closeActionTriggered.bind(this, name)
        })
      });
    }
  },
  setup: function setup(context, graphModel) {
    if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
      return;
    }

    graphModel.on("nodeAdded.WebRouterClosePopup", function (node) {
      function _updatePorts() {
        var ports = []; // Add results inputs

        var results = node.parameters.Results;

        if (results) {
          results = results ? results.split(',') : undefined;

          for (var i in results) {
            var p = results[i];
            ports.push({
              type: {
                name: '*'
              },
              plug: 'input',
              group: 'Results',
              name: 'result-' + p,
              displayName: p
            });
          }
        } // Add close actions


        var closeActions = node.parameters.CloseActions;

        if (closeActions) {
          closeActions = closeActions ? closeActions.split(',') : undefined;

          for (var i in closeActions) {
            var p = closeActions[i];
            ports.push({
              type: 'signal',
              plug: 'input',
              group: 'Close Actions',
              name: 'closeAction-' + p,
              displayName: p
            });
          }
        }

        context.editorConnection.sendDynamicPorts(node.id, ports);
      }

      _updatePorts();

      node.on("parameterUpdated", function (event) {
        if (event.name === 'Results' || event.name === 'CloseActions') {
          _updatePorts();
        }
      });
    });
  }
});
module.exports = {
  RouterNode: RouterNode,
  NavigateNode: NavigateNode,
  ShowPopupNode: ShowPopupNode,
  ClosePopupNode: ClosePopupNode
};

/***/ })

/******/ });
//# sourceMappingURL=index.js.map