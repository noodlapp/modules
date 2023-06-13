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

const _colors = {
    "purple":"component",
    "green":"data",
    "default":"default",
    "grey":"default"
}

Noodl.defineNode = function(def) {
    const _def = {};

    _def.name = def.name;
    _def.displayNodeName = def.displayName;
    _def.usePortAsLabel = def.useInputAsLabel;
    _def.color = _colors[def.color || 'default'];
    _def.category = def.category || 'Modules';
    _def.initialize = function() {
        this.inputs = {};
        var _outputs = this.outputs = {};
        var _this = this;
        this.setOutputs = function(o) {
            for(var key in o) {
                _outputs[key] = o[key];
                _this.flagOutputDirty(key);
            }
        }
        if(typeof def.initialize === 'function')
            def.initialize.apply(this);
    }
    _def.inputs = {};
    _def.outputs = {};

    for(var key in def.inputs) {
        _def.inputs[key] = {
            type:(typeof def.inputs[key] === 'object')?def.inputs[key].type:def.inputs[key],
            displayName:(typeof def.inputs[key] === 'object')?def.inputs[key].displayName:undefined,
            group:(typeof def.inputs[key] === 'object')?def.inputs[key].group:undefined,
            default:(typeof def.inputs[key] === 'object')?def.inputs[key].default:undefined,
            set:(function() { const _key = key; return function(value) {
                this.inputs[_key] = value;
                if(def.changed && typeof def.changed[_key] === 'function') {
                    def.changed[_key].apply(this,[value]);
                }
            }})()
        }
    }

    for(var key in def.signals) {
        _def.inputs[key] = {
            type:'signal',
            displayName:(typeof def.signals[key] === 'object')?def.signals[key].displayName:undefined,
            valueChangedToTrue:(function() { const _key = key; return function() {
                const _fn = (typeof def.signals[_key] === 'object')?def.signals[_key].signal:def.signals[_key]
                if(typeof _fn === 'function') {
                    this.scheduleAfterInputsHaveUpdated(() => {
                        _fn.apply(this);
                    }) 
                }
            }})()
        }
    }

    for(var key in def.outputs) {
        if(def.outputs[key] === 'signal') {
            _def.outputs[key] = {
                type:'signal',
            }
        }
        else {
            _def.outputs[key] = {
                type:(typeof def.outputs[key] === 'object')?def.outputs[key].type:def.outputs[key],
                displayName:(typeof def.outputs[key] === 'object')?def.outputs[key].displayName:undefined,
                group:(typeof def.outputs[key] === 'object')?def.outputs[key].group:undefined,
                getter:(function() { const _key = key; return function() {
                    return this.outputs[_key];
                }})()
            }
        }
    }

    _def.methods = _def.prototypeExtensions = {};
    for(var key in def.methods) {
        _def.prototypeExtensions[key] = def.methods[key];
    }
    if(_def.methods.onNodeDeleted) { // Override the onNodeDeleted if required
        _def.methods._onNodeDeleted = function() {
            this.__proto__.__proto__._onNodeDeleted.call(this);
            _def.methods.onNodeDeleted.value.call(this);
        }
    }

    return {node:_def,setup:def.setup};
}

Noodl.defineCollectionNode = function(def) {
    const _def = {
        name:def.name,
        category:def.category,
        color:'data',
        inputs:def.inputs,
        outputs:Object.assign({
            Items:'array',
            'Fetch Started':'signal',
            'Fetch Completed':'signal'
        },def.outputs||{}),
        signals:Object.assign({
            Fetch:function() {
                var _this = this;
                this.sendSignalOnOutput('Fetch Started');
                var a = def.fetch.call(this,function() {
                    _this.sendSignalOnOutput('Fetch Completed');
                });
                this.setOutputs({
                    Items:a
                })
            }
        },def.signals||{})
    }

    return Noodl.defineNode(_def);
}

Noodl.defineModelNode = function(def) {
    const _def = {
        name:def.name,
        category:def.category,
        color:'data',
        inputs:{
            Id:'string'
        },
        outputs:{
            Fetched:'signal'
        },
        changed:{
            Id:function(value) {
                if(this._object && this._changeListener)
                    this._object.off('change',this._changeListener)
                
                this._object = Noodl.Object.get(value);
                this._changeListener = (name,value) => {
                    const _o = {}
                    _o[name] = value;
                    this.setOutputs(_o)
                }
                this._object.on('change',this._changeListener)

                this.setOutputs(this._object.data);
                this.sendSignalOnOutput('Fetched');
            }
        },
        initialize:function() {

        }
    }

    for(var key in def.properties) {
        _def.inputs[key] = def.properties[key];
        _def.outputs[key] = def.properties[key];
        _def.changed[key] = (function() { const _key = key; return function(value) {
            if(!this._object) return;
            this._object.set(_key,value);
        }})()
    }
 
    return Noodl.defineNode(_def);
}

Noodl.defineReactNode = function(def) {
    var _def = Noodl.defineNode(def);

    _def.node.getReactComponent = def.getReactComponent;
    _def.node.inputProps = def.inputProps;
    _def.node.inputCss = def.inputCss;
    _def.node.outputProps = def.outputProps;
    _def.node.setup = def.setup;

    return _def.node;
}

module.exports = Noodl;

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");
const PublicGoogleSheetsParser = __webpack_require__(/*! ./sheetparser */ "./src/sheetparser.js")
const EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter

var _schemas,_schemaEvents

function _addSheetToSchemas(id,sheet,cb) {
	const parser = new PublicGoogleSheetsParser(id,sheet,"limit 0")

	parser.parse().then(({rows,cols}) => {
		const schema = {}
		const _types = {
			"boolean":{type:"Boolean"},
			"string":{type:"String"},
			"number":{type:"Number"},
			"date":{type:"Date"}
		}

		for(var i = 0; i < cols.length; i++) {
			const key = cols[i].label
			schema[key] = _types[cols[i].type]
		}

		_schemas[sheet||'_Default'] = Object.assign(_schemas[sheet||'_Default']||{},schema)
		_schemaEvents.emit('change',{schema:sheet})
		cb()
	})
}

const QuerySheetNode = Noodl.defineNode({
	name:'noodl.gsheets.QuerySheetNode',
	displayName:'Query Sheet',
	color:'green',
	inputs:{
		sheetId:{displayName:'Document Id',group:'Sheet Source',type:'string'},
		sheetName:{displayName:'Sheet Name',group:'Sheet Source',type:'string'},
	},
	outputs:{
		result:{displayName:'Items',group:'General',type:'array'},
		count:{displayName:'Count',group:'General',type:'array'},
		firstItemId:{displayName:'First Item Id',group:'General',type:'array'}
	},
	changed:{	
		sheetId() {
			this.cols = undefined
			this.scheduleQuery()
		},
		sheetName() {
			this.cols = undefined
			this.scheduleQuery()
		}
	},
	methods:{
		scheduleQuery() {
			if(this.queryScheduled) return
			this.queryScheduled = true
			this.scheduleAfterInputsHaveUpdated(() => {
				this.queryScheduled = false
				this.runQuery()
			})
		},
	 	_formatFilter(query,options) {
			var inputs = options.queryParameters;
	   
		   if(query.combinator !== undefined && query.rules !== undefined) {
			   if(query.rules.length === 0) return;
			   else if(query.rules.length === 1) return this._formatFilter(query.rules[0],options)
			   else {
				   const _res = '('
				   query.rules.forEach((r,idx) => {
					   var cond = this._formatFilter(r,options)
					   if(cond !== undefined) _res += cond
					   if(idx < query.rules.length-1) _res += query.combinator
				   })
				   _res += ')'
	   
				   return _res;
			   }
		   }
		   else {
			   var cond;
			   var value = query.input!==undefined?inputs[query.input]:query.value;

			   if(typeof value === 'string') value = "'" + value + "'"
 	   
			   if(query.operator === 'exist') cond = 'is not null'
			   else if(query.operator === 'not exist') cond = 'is null'
			   else if(query.operator === 'greater than') cond = '> ' + value
			   else if(query.operator === 'greater than or equal to') cond = '>= ' + value
			   else if(query.operator === 'less than') cond = '< ' + value
			   else if(query.operator === 'less than or equal to') cond = '<= ' + value
			   else if(query.operator === 'equal to') cond = '= ' + value
			   else if(query.operator === 'not equal to') cond = '!= ' + value
	   
			   const _res = options.cols[query.property].id + " " + cond
	   
			   return _res;
		   }
		},
		_getColumns(cb) {
			if(this.cols !== undefined) return cb(this.cols)
			const parser = new PublicGoogleSheetsParser(this.inputs.sheetId,this.inputs.sheetName,"limit 0")
			parser.parse().then(({rows,cols}) => {
				this.cols = {}
				cols.forEach(c => this.cols[c.label] = c)
				cb(this.cols)
			})
		},
		runQuery() {
			this._getColumns((cols) => {
				// Generate the query from the visual filter
				let query
				if(this.filter !== undefined) {
					const filter = this._formatFilter(this.filter,{cols})
					if(filter !== undefined) query = 'where ' + filter + ' '
				}

				if(this.sorting !== undefined) {
					 query = (query||'') + 'order by ' + this.sorting.map((s,idx) => {
						return  (idx !== 0?' ':'') + cols[s.property].id + (s.order === 'descending'?' desc':'')
					}).join(' ') + ' '
				}

				if(this.enableLimit) {
					query = (query||'') + 'limit ' + (this.limit!==undefined?this.limit:10) + ' '
					if(this.skip !== undefined) query = (query||'') + 'offset ' + this.skip + ' '
				}

				const parser = new PublicGoogleSheetsParser(this.inputs.sheetId,this.inputs.sheetName,query)
				parser.parse().then(({rows,cols}) => {
					const results = Noodl.Array.get()
					results.set(rows.map((r) => {
						let _id
						if(this.useColumnForId !== undefined && this.useColumnForId !== '__none__') {
							_id = r[this.useColumnForId]
							delete r[this.useColumnForId]
						}
						let obj = Noodl.Object.get(_id)
						obj.setAll(r)
						return obj
					}))

					this.setOutputs({
						result:results,
						count:results.size(),
						firstItemId:(results.size() > 0)?results.get(0).getId():undefined
					})
				})
			})
		},
		registerInputIfNeeded: function (name) {
			if (this.hasInput(name)) {
				return;
			}

			if(name === 'visualFilter') this.registerInput(name, {
				set: this.setFilter.bind(this)
			})

			if(name === 'visualSort') this.registerInput(name, {
				set: this.setSorting.bind(this)
			})

			if(name === 'enableLimit') this.registerInput(name, {
				set: this.setEnableLimit.bind(this)
			})

			if(name === 'limit') this.registerInput(name, {
				set: this.setLimit.bind(this)
			})

			if(name === 'skip') this.registerInput(name, {
				set: this.setSkip.bind(this)
			})

			if(name === 'columnForId') this.registerInput(name, {
				set: this.setColumnForId.bind(this)
			})
		},		
		setFilter(value) {
			this.filter = value
			this.scheduleQuery()
		},
		setSorting(value) {
			this.sorting = value
			this.scheduleQuery()
		},
		setEnableLimit(value) {
			this.enableLimit = value
			this.scheduleQuery()
		},
		setLimit(value) {
			this.limit = value
			this.scheduleQuery()
		},
		setSkip(value) {
			this.skip = value
			this.scheduleQuery()
		},
		setColumnForId(value) {
			this.useColumnForId = value
			this.scheduleQuery()
		}
	},
	setup: function (context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		if(_schemas === undefined) _schemas = {}
		if(_schemaEvents === undefined) _schemaEvents = new EventEmitter()

		graphModel.on("nodeAdded.noodl.gsheets.QuerySheetNode", function (node) {

			function updatePorts() {
				var ports = []

				// Limit
				ports.push({
					type: 'boolean',
					plug: 'input',
					group: 'Limit',
					name: 'enableLimit',
					displayName: 'Use limit',
				})
			
				if (node.parameters['enableLimit']) {
					ports.push({
						type: 'number',
						default: 10,
						plug: 'input',
						group: 'Limit',
						name: 'limit',
						displayName: 'Limit',
					})
			
					ports.push({
						type: 'number',
						default: 0,
						plug: 'input',
						group: 'Limit',
						name: 'skip',
						displayName: 'Skip',
					})
				}

				const schema = {properties:_schemas[node.parameters.sheetName||'_Default']}

				ports.push({
                    name:'visualFilter',
                    plug:'input',
                    type:{name:'query-filter',schema:schema,allowEditOnly:true},
                    displayName:'Filter',
                    group:'Filter',
                })

                ports.push({
                    name:'visualSort',
                    plug:'input',
                    type:{name:'query-sorting',schema:schema,allowEditOnly:true},
                    displayName:'Sort',
                    group:'Sorting',
                })

				const columnForIdEnums = [{label:'Unique id',value:'__none__'}].concat(Object.keys(schema.properties).map(k => ({value:k,label:k})))
				ports.push({
					name:'columnForId',
					plug:'input',
					type:{name:'enum',enums:columnForIdEnums},
					displayName:'Use Column For Id',
					group:'Sheet Source',
					default:'__none__'
				})

				context.editorConnection.sendDynamicPorts(node.id, ports);
			}

			if(node.parameters.sheetId) {
				_addSheetToSchemas(node.parameters.sheetId,node.parameters.sheetName,() => {
					updatePorts();
				})
			}

			node.on("parameterUpdated", function (event) {
				if ((event.name === "sheetId" || event.name === "sheetName") && node.parameters.sheetId) {
					_addSheetToSchemas(node.parameters.sheetId,node.parameters.sheetName,() => {
						updatePorts();
					})
				}

				if(event.name === "enableLimit") updatePorts();
			})
		})
	}
})

const QuerySheetUniqueColumnNode = Noodl.defineNode({
	name:'noodl.gsheets.QuerySheetUniqueColumnNode',
	displayName:'Query Sheet Unique',
	color:'green',
	inputs:{
		sheetId:{displayName:'Document Id',group:'Sheet Source',type:'string'},
		sheetName:{displayName:'Sheet Name',group:'Sheet Source',type:'string'},
	},
	outputs:{
		result:{displayName:'Items',group:'General',type:'array'},
		count:{displayName:'Count',group:'General',type:'array'},
		firstItemId:{displayName:'First Item Id',group:'General',type:'array'}
	},
	changed:{	
		sheetId() {
			this.cols = undefined
			this.scheduleQuery()
		},
		sheetName() {
			this.cols = undefined
			this.scheduleQuery()
		}
	},
	methods:{
		scheduleQuery() {
			if(this.queryScheduled) return
			this.queryScheduled = true
			this.scheduleAfterInputsHaveUpdated(() => {
				this.queryScheduled = false
				this.runQuery()
			})
		},
		_getColumns(cb) {
			if(this.cols !== undefined) return cb(this.cols)
			const parser = new PublicGoogleSheetsParser(this.inputs.sheetId,this.inputs.sheetName,"limit 0")
			parser.parse().then(({rows,cols}) => {
				this.cols = {}
				cols.forEach(c => this.cols[c.label] = c)
				cb(this.cols)
			})
		},
		runQuery() {
			this._getColumns((cols) => {
				const col = cols[this.column].id
				const parser = new PublicGoogleSheetsParser(this.inputs.sheetId,this.inputs.sheetName,`select ${col}, count(${col}) group by ${col}`)
				parser.parse().then(({rows,cols}) => {
					const results = Noodl.Array.get()
					results.set(rows.map((r) => {
						let obj = Noodl.Object.create({Value:r[this.column]})
						return obj
					}))
	
					this.setOutputs({
						result:results,
						count:results.size(),
						firstItemId:(results.size() > 0)?results.get(0).getId():undefined
					})
				})
			})
		},
		registerInputIfNeeded: function (name) {
			if (this.hasInput(name)) {
				return;
			}

			if(name === 'column') this.registerInput(name, {
				set: this.setColumn.bind(this)
			})
		},		
		setColumn(value) {
			this.column = value
			this.scheduleQuery()
		}
	},
	setup: function (context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		if(_schemas === undefined) _schemas = {}
		if(_schemaEvents === undefined) _schemaEvents = new EventEmitter()

		graphModel.on("nodeAdded.noodl.gsheets.QuerySheetUniqueColumnNode", function (node) {

			function updatePorts() {
				var ports = []

				const schema = {properties:_schemas[node.parameters.sheetName||'_Default']}

				const columnForIdEnums = Object.keys(schema.properties).map(k => ({value:k,label:k}))
				if(columnForIdEnums.length > 0) {
					ports.push({
						name:'column',
						plug:'input',
						type:{name:'enum',enums:columnForIdEnums},
						displayName:'Column',
						group:'Sheet Source',
						default:columnForIdEnums[0].value
					})
				}

				context.editorConnection.sendDynamicPorts(node.id, ports);
			}

			if(node.parameters.sheetId) {
				_addSheetToSchemas(node.parameters.sheetId,node.parameters.sheetName,() => {
					updatePorts();
				})
			}

			node.on("parameterUpdated", function (event) {
				if ((event.name === "sheetId" || event.name === "sheetName") && node.parameters.sheetId) {
					_addSheetToSchemas(node.parameters.sheetId,node.parameters.sheetName,() => {
						updatePorts();
					})
				}
			})
		})
	}
})

const SheetRowNode = Noodl.defineNode({
	name:'noodl.gsheets.SheetRowNode',
	displayName:'Sheet Row',
	color:'green',
	inputs:{
		rowId:{type:'string',displayName:'Row Id',allowConnectionsOnly:true}
	},
	outputs:{
	},
	changed:{	
		rowId(value) {
			this.rowObject = Noodl.Object.get(value)
			this.updateOutputs()
		}
	},
	methods:{
		registerOutputIfNeeded(name) {
			if (this.hasOutput(name)) {
				return;
			}

			if (name.startsWith('prop-')) this.registerOutput(name, {
                getter: this.getColumnValue.bind(this, name.substring('prop-'.length))
            })
		},	
		getColumnValue(name) {
			if(this.rowObject === undefined) return
			return this.rowObject.get(name)
		},
		updateOutputs() {
			if(this.rowObject === undefined) return
			const out = {}
			Object.keys(this.rowObject.data).forEach(k => out['prop-'+k] = this.rowObject[k])
			this.setOutputs(out)
		}
	},
	setup: function (context, graphModel) {
		if (!context.editorConnection || !context.editorConnection.isRunningLocally()) {
			return;
		}

		if(_schemas === undefined) _schemas = {}
		if(_schemaEvents === undefined) _schemaEvents = new EventEmitter()

		graphModel.on("nodeAdded.noodl.gsheets.SheetRowNode", function (node) {

			function updatePorts() {
				var ports = []

				const sheets = Object.keys(_schemas).map(k => ({value:k,label:k}))
				if(sheets.length > 1) {
					ports.push({
						name:'sheet',
						plug:'input',
						type:{name:'enum',enums:sheets},
						displayName:'Sheet',
						group:'General',
						default:sheets[0].value
					})
				}

				const schema = _schemas[node.parameters['sheet'] || '_Default']
				if(schema !== undefined) {
					Object.keys(schema).forEach(prop => {
						const type = schema[prop].type
						const _types = {
							"Boolean":"boolean",
							"Number":"number",
							"String":"string"
						}
						ports.push({
							name:'prop-'+prop,
							plug:'output',
							type:_types[type]||'*',
							displayName:prop,
							group:'Columns'
						})
					})
				}

				context.editorConnection.sendDynamicPorts(node.id, ports);
			}

			updatePorts()
			_schemaEvents.on('change',() => {
				updatePorts()
			})
		})
	}
})

Noodl.defineModule({
    nodes:[
		QuerySheetNode,
		QuerySheetUniqueColumnNode,
		SheetRowNode
    ],
    setup() {
    	//this is called once on startup
    }
});

/***/ }),

/***/ "./src/sheetparser.js":
/*!****************************!*\
  !*** ./src/sheetparser.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class PublicGoogleSheetsParser {
    constructor (spreadsheetId, sheetName,query) {
      this.id = spreadsheetId
      this.sheetName = sheetName
      this.query = query
    }
  
    getSpreadsheetDataUsingFetch () {
      // Read data from the first sheet of the target document.
      // It cannot be used unless everyone has been given read permission.
      // It must be a spreadsheet document with a header, as in the example document below.
      // spreadsheet document for example: https://docs.google.com/spreadsheets/d/10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps/edit#gid=1719755213
      if (!this.id) return null
      let url = `https://docs.google.com/spreadsheets/d/${this.id}/gviz/tq?`
      if (this.sheetName) {
        url = url.concat(`sheet=${this.sheetName}`)
      }
      if (this.query) {
        url = url.concat(`&tq=${encodeURIComponent(this.query)}`)
      }

      return fetch(url)
        .then((r) => r && r.ok && r.text ? r.text() : null)
        .catch(/* istanbul ignore next */(_) => null)
    }
  
    normalizeRow (rows) {
      return rows.map((row) => (row && (row.v !== null && row.v !== undefined)) ? row : {})
    }
  
    applyHeaderIntoRows (header, rows) {
      return rows
        .map(({ c: row }) => this.normalizeRow(row))
        .map((row) => row.reduce((p, c, i) => c.v ? Object.assign(p, { [header[i]]: c.v }) : p, {}))
    }
  
    getItems (spreadsheetResponse) {
      let rows = []
      let cols = []
  
      try {
        const parsedJSON = JSON.parse(spreadsheetResponse.split('\n')[1].replace(/google.visualization.Query.setResponse\(|\);/g, ''))
        cols = parsedJSON.table.cols
        const hasSomeLabelPropertyInCols = parsedJSON.table.cols.some(({ label }) => !!label)
        if (hasSomeLabelPropertyInCols) {
          const header = parsedJSON.table.cols.map(({ label }) => label)
  
          rows = this.applyHeaderIntoRows(header, parsedJSON.table.rows)
        } else {
          const [headerRow, ...originalRows] = parsedJSON.table.rows
          const header = this.normalizeRow(headerRow.c).map((row) => row.v)
  
          rows = this.applyHeaderIntoRows(header, originalRows)
        }
      } catch (e) {}
  
      return {rows,cols}
    }
  
    async parse (spreadsheetId, sheetName,query) {
      if (spreadsheetId) this.id = spreadsheetId
      if (sheetName) this.sheetName = sheetName
      if (query) this.query = query
  
      if (!this.id) throw new Error('SpreadsheetId is required.')
  
      const spreadsheetResponse = await this.getSpreadsheetDataUsingFetch()
  
      if (spreadsheetResponse === null) return []
  
      return this.getItems(spreadsheetResponse)
    }
  }

  module.exports = PublicGoogleSheetsParser

/***/ })

/******/ });
//# sourceMappingURL=index.js.map