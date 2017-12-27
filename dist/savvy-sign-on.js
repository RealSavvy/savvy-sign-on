(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SavvySignOn"] = factory();
	else
		root["SavvySignOn"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseUrl = baseUrl;
function baseUrl() {
  var parts = [window.location.protocol, '//', window.location.host];
  var url = parts.join('');
  if (url.substr(-1) !== '/') {
    url += '/';
  }

  return url;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(4);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var g = (typeof global !== 'undefined') ? global
        : ((typeof window !== 'undefined') ? window
        : ((typeof self !== 'undefined') ? self : this));


(function(global) {
  /**
   * Polyfill URLSearchParams
   *
   * Inspired from : https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js
   */

  var checkIfIteratorIsSupported = function() {
    try {
      return !!Symbol.iterator;
    } catch(error) {
      return false;
    }
  };


  var iteratorSupported = checkIfIteratorIsSupported();

  var createIterator = function(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return { done: value === void 0, value: value };
      }
    };

    if(iteratorSupported) {
      iterator[Symbol.iterator] = function() {
        return iterator;
      };
    }

    return iterator;
  };

  var polyfillURLSearchParams= function() {

    var URLSearchParams = function(searchString) {
      Object.defineProperty(this, '_entries', { value: {} });

      if(typeof searchString === 'string') {
        if(searchString !== '') {
          searchString = searchString.replace(/^\?/, '');
          var attributes = searchString.split('&');
          var attribute;
          for(var i = 0; i < attributes.length; i++) {
            attribute = attributes[i].split('=');
            this.append(
              decodeURIComponent(attribute[0]),
              (attribute.length > 1) ? decodeURIComponent(attribute[1]) : ''
            );
          }
        }
      } else if(searchString instanceof URLSearchParams) {
        var _this = this;
        searchString.forEach(function(value, name) {
          _this.append(value, name);
        });
      }
    };

    var proto = URLSearchParams.prototype;

    proto.append = function(name, value) {
      if(name in this._entries) {
        this._entries[name].push(value.toString());
      } else {
        this._entries[name] = [value.toString()];
      }
    };

    proto.delete = function(name) {
      delete this._entries[name];
    };

    proto.get = function(name) {
      return (name in this._entries) ? this._entries[name][0] : null;
    };

    proto.getAll = function(name) {
      return (name in this._entries) ? this._entries[name].slice(0) : [];
    };

    proto.has = function(name) {
      return (name in this._entries);
    };

    proto.set = function(name, value) {
      this._entries[name] = [value.toString()];
    };

    proto.forEach = function(callback, thisArg) {
      var entries;
      for(var name in this._entries) {
        if(this._entries.hasOwnProperty(name)) {
          entries = this._entries[name];
          for(var i = 0; i < entries.length; i++) {
            callback.call(thisArg, entries[i], name, this);
          }
        }
      }
    };

    proto.keys = function() {
      var items = [];
      this.forEach(function(value, name) { items.push(name); });
      return createIterator(items);
    };

    proto.values = function() {
      var items = [];
      this.forEach(function(value) { items.push(value); });
      return createIterator(items);
    };

    proto.entries = function() {
      var items = [];
      this.forEach(function(value, name) { items.push([name, value]); });
      return createIterator(items);
    };

    if(iteratorSupported) {
      proto[Symbol.iterator] = proto.entries;
    }

    proto.toString = function() {
      var searchString = '';
      this.forEach(function(value, name) {
        if(searchString.length > 0) searchString+= '&';
        searchString += encodeURIComponent(name) + '=' + encodeURIComponent(value);
      });
      return searchString;
    };

    global.URLSearchParams = URLSearchParams;
  };

  if(!('URLSearchParams' in global) || (new URLSearchParams('?a=1').toString() !== 'a=1')) {
    polyfillURLSearchParams();
  }

  // HTMLAnchorElement

})(g);

(function(global) {
  /**
   * Polyfill URL
   *
   * Inspired from : https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
   */

  var checkIfURLIsSupported = function() {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      return (u.href === 'http://a/c%20d') && u.searchParams;
    } catch(e) {
      return false;
    }
  };


  var polyfillURL = function() {
    var _URL = global.URL;

    var URL = function(url, base) {
      if(typeof url !== 'string') url = String(url);

      var doc = document.implementation.createHTMLDocument('');
      window.doc = doc;
      if(base) {
        var baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);
      }

      var anchorElement = doc.createElement('a');
      anchorElement.href = url;
      doc.body.appendChild(anchorElement);
      anchorElement.href = anchorElement.href; // force href to refresh

      if(anchorElement.protocol === ':' || !/:/.test(anchorElement.href)) {
        throw new TypeError('Invalid URL');
      }

      Object.defineProperty(this, '_anchorElement', {
        value: anchorElement
      });
    };

    var proto = URL.prototype;

    var linkURLWithAnchorAttribute = function(attributeName) {
      Object.defineProperty(proto, attributeName, {
        get: function() {
          return this._anchorElement[attributeName];
        },
        set: function(value) {
          this._anchorElement[attributeName] = value;
        },
        enumerable: true
      });
    };

    ['hash', 'host', 'hostname', 'port', 'protocol', 'search']
    .forEach(function(attributeName) {
      linkURLWithAnchorAttribute(attributeName);
    });

    Object.defineProperties(proto, {

      'toString': {
        get: function() {
          var _this = this;
          return function() {
            return _this.href;
          };
        }
      },

      'href' : {
        get: function() {
          return this._anchorElement.href.replace(/\?$/,'');
        },
        set: function(value) {
          this._anchorElement.href = value;
        },
        enumerable: true
      },

      'pathname' : {
        get: function() {
          return this._anchorElement.pathname.replace(/(^\/?)/,'/');
        },
        set: function(value) {
          this._anchorElement.pathname = value;
        },
        enumerable: true
      },

      'origin': {
        get: function() {
          return this._anchorElement.protocol + '//' + this._anchorElement.hostname + (this._anchorElement.port ? (':' + this._anchorElement.port) : '');
        },
        enumerable: true
      },

      'password': { // TODO
        get: function() {
          return '';
        },
        set: function(value) {
        },
        enumerable: true
      },

      'username': { // TODO
        get: function() {
          return '';
        },
        set: function(value) {
        },
        enumerable: true
      },

      'searchParams': {
        get: function() {
          var searchParams = new URLSearchParams(this.search);
          var _this = this;
          ['append', 'delete', 'set'].forEach(function(methodName) {
            var method = searchParams[methodName];
            searchParams[methodName] = function() {
              method.apply(searchParams, arguments);
              _this.search = searchParams.toString();
            };
          });
          return searchParams;
        },
        enumerable: true
      }
    });

    URL.createObjectURL = function(blob) {
      return _URL.createObjectURL.apply(_URL, arguments);
    };

    URL.revokeObjectURL = function(url) {
      return _URL.revokeObjectURL.apply(_URL, arguments);
    };

    global.URL = URL;

  };

  if(!checkIfURLIsSupported()) {
    polyfillURL();
  }

  if((global.location !== void 0) && !('origin' in global.location)) {
    var getOrigin = function() {
      return global.location.protocol + '//' + global.location.hostname + (global.location.port ? (':' + global.location.port) : '');
    };

    try {
      Object.defineProperty(global.location, 'origin', {
        get: getOrigin,
        enumerable: true
      });
    } catch(e) {
      setInterval(function() {
        global.location.origin = getOrigin();
      }, 100);
    }
  }

})(g);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImplictGrant = undefined;

var _implictGrant = __webpack_require__(5);

var _implictGrant2 = _interopRequireDefault(_implictGrant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ImplictGrant = _implictGrant2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(6);

var _base2 = _interopRequireDefault(_base);

var _baseUrl = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImplicitGrant = function (_Provider) {
  _inherits(ImplicitGrant, _Provider);

  function ImplicitGrant(options) {
    _classCallCheck(this, ImplicitGrant);

    var _this = _possibleConstructorReturn(this, (ImplicitGrant.__proto__ || Object.getPrototypeOf(ImplicitGrant)).call(this, options));

    _this.redirect_uri = options.redirect_uri || (0, _baseUrl.baseUrl)() + 'oauth/callback';
    _this.response_type = options.response_type || 'token';
    _this.client_id = options.client_id || '';
    _this.scopes = options.scopes || options.default_scopes || [];
    return _this;
  }

  _createClass(ImplicitGrant, [{
    key: 'open',
    value: function open() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var popup = this.popup;
      var defaults = Object.assign({ state: popup.state }, this.defaults, options);
      var params = new URLSearchParams('');
      params.append('client_id', defaults.client_id);
      params.append('state', defaults.state);
      params.append('origin', (0, _baseUrl.baseUrl)().slice(0, -1));
      params.append('response_type', defaults.response_type);
      params.append('redirect_uri', defaults.redirect_uri);
      if (defaults.scopes.length) {
        params.append('scopes', defaults.scopes.join(' '));
      }
      var url = this.domain + '?' + params.toString();
      return popup.open(Object.assign({ url: url }, defaults)).then(function (result) {
        return result;
      });
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        redirect_uri: this.redirect_uri,
        response_type: this.response_type,
        client_id: this.client_id,
        scopes: this.scopes
      };
    }
  }]);

  return ImplicitGrant;
}(_base2.default);

exports.default = ImplicitGrant;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(7);

var _baseUrl = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popup = function () {
  function Popup(options) {
    _classCallCheck(this, Popup);

    this.state = options.state;
    this._data = null;
    this.source = null;
  }

  _createClass(Popup, [{
    key: 'hasData',
    value: function hasData() {
      return this._data != null;
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this._data;
    }
  }, {
    key: 'setData',
    value: function setData(val) {
      this._data = val;
      return val;
    }
  }, {
    key: 'open',
    value: function open(options) {
      var url = options.url;

      this.source = window.open(url, this.state, 'height=600,width=600');

      var promiseWatchPopup = function (resolve, reject) {
        var popup = this;
        if (popup.hasData()) {
          resolve(popup.getData());
          if (this.source.close) {
            this.source.close();
          }
        } else if (popup.source.closed) {
          reject(popup.source);
        } else {
          setTimeout(function () {
            promiseWatchPopup(resolve, reject);
          }, 100);
        }
      }.bind(this);
      return new Promise(function (resolve, reject) {
        promiseWatchPopup(resolve, reject);
      });
    }
  }]);

  return Popup;
}();

var Base = function () {
  function Base(options) {
    _classCallCheck(this, Base);

    var provider = this;
    this.domain = options.domain;
    this.allowedOrigins = options.allowedOrigins || [(0, _baseUrl.baseUrl)().slice(0, -1)];
    this.secrets = {};
    this._state = options.state;

    if (window.addEventListener) {
      this.listener = window.addEventListener('message', handleMessages, false);
    } else {
      this.listener = window.attachEvent('onmessage', handleMessages);
    }

    function handleMessages(event) {
      var secrets = provider.secrets;
      var originMatches = provider.allowedOrigins === '*' || event && provider.allowedOrigins.indexOf(event.origin) !== -1;
      var sourceMatches = true;
      if (event && event.source) {
        sourceMatches = secrets[event.data.state] && secrets[event.data.state].source == event.source;
      } else if (event && event.data.source) {
        sourceMatches = secrets[event.data.state] && secrets[event.data.state].source == event.data.source;
      }
      if (originMatches && sourceMatches) {
        secrets[event.data.state].setData(event.data);
        secrets[event.data.state].hasData(event.data);
        secrets[event.data.state].source.close();
      }
    }
  }

  _createClass(Base, [{
    key: 'popup',
    get: function get() {
      var secret = this.state;
      var popup = new Popup({
        state: secret
      });
      this.secrets[secret] = popup;
      return popup;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state || (0, _guid.guid)();
    }
  }]);

  return Base;
}();

exports.default = Base;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = guid;
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZmYyNjRlYjlhN2VjZTNhNTg0MiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VybC1wb2x5ZmlsbC91cmwtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJuYW1lcyI6WyJiYXNlVXJsIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInVybCIsImpvaW4iLCJzdWJzdHIiLCJJbXBsaWN0R3JhbnQiLCJJbXBsaWNpdEdyYW50Iiwib3B0aW9ucyIsInJlZGlyZWN0X3VyaSIsInJlc3BvbnNlX3R5cGUiLCJjbGllbnRfaWQiLCJzY29wZXMiLCJkZWZhdWx0X3Njb3BlcyIsInBvcHVwIiwiZGVmYXVsdHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzdGF0ZSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImFwcGVuZCIsInNsaWNlIiwibGVuZ3RoIiwiZG9tYWluIiwidG9TdHJpbmciLCJvcGVuIiwidGhlbiIsInJlc3VsdCIsIlBvcHVwIiwiX2RhdGEiLCJzb3VyY2UiLCJ2YWwiLCJwcm9taXNlV2F0Y2hQb3B1cCIsInJlc29sdmUiLCJyZWplY3QiLCJoYXNEYXRhIiwiZ2V0RGF0YSIsImNsb3NlIiwiY2xvc2VkIiwic2V0VGltZW91dCIsImJpbmQiLCJQcm9taXNlIiwiQmFzZSIsInByb3ZpZGVyIiwiYWxsb3dlZE9yaWdpbnMiLCJzZWNyZXRzIiwiX3N0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVyIiwiaGFuZGxlTWVzc2FnZXMiLCJhdHRhY2hFdmVudCIsImV2ZW50Iiwib3JpZ2luTWF0Y2hlcyIsImluZGV4T2YiLCJvcmlnaW4iLCJzb3VyY2VNYXRjaGVzIiwiZGF0YSIsInNldERhdGEiLCJzZWNyZXQiLCJndWlkIiwiczQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7UUM3RGdCQSxPLEdBQUFBLE87QUFBVCxTQUFTQSxPQUFULEdBQW1CO0FBQ3hCLE1BQUlDLFFBQVEsQ0FDVkMsT0FBT0MsUUFBUCxDQUFnQkMsUUFETixFQUVWLElBRlUsRUFHVkYsT0FBT0MsUUFBUCxDQUFnQkUsSUFITixDQUFaO0FBS0EsTUFBSUMsTUFBTUwsTUFBTU0sSUFBTixDQUFXLEVBQVgsQ0FBVjtBQUNBLE1BQUlELElBQUlFLE1BQUosQ0FBVyxDQUFDLENBQVosTUFBbUIsR0FBdkIsRUFBNEI7QUFDMUJGLFdBQU8sR0FBUDtBQUNEOztBQUVELFNBQU9BLEdBQVA7QUFDRCxDOzs7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QUFRLElBQUllLEtBQUosQ0FBVTtBQUNwQlgsZUFBT3lDO0FBRGEsT0FBVixDQUFaO0FBR0EsV0FBS2IsT0FBTCxDQUFhYSxNQUFiLElBQXVCN0MsS0FBdkI7QUFDQSxhQUFPQSxLQUFQO0FBQ0Q7Ozt3QkFFVztBQUNWLGFBQU8sS0FBS2lDLE1BQUwsSUFBZSxpQkFBdEI7QUFDRDs7Ozs7O2tCQTFDa0JKLEk7Ozs7Ozs7Ozs7OztRQ2xETGlCLEksR0FBQUEsSTtBQUFULFNBQVNBLElBQVQsR0FBZ0I7QUFDckIsV0FBU0MsRUFBVCxHQUFjO0FBQ1osV0FBT0MsS0FBS0MsS0FBTCxDQUFXLENBQUMsSUFBSUQsS0FBS0UsTUFBTCxFQUFMLElBQXNCLE9BQWpDLEVBQ052QyxRQURNLENBQ0csRUFESCxFQUVOd0MsU0FGTSxDQUVJLENBRkosQ0FBUDtBQUdEO0FBQ0QsU0FBT0osT0FBT0EsSUFBUCxHQUFjLEdBQWQsR0FBb0JBLElBQXBCLEdBQTJCLEdBQTNCLEdBQWlDQSxJQUFqQyxHQUF3QyxHQUF4QyxHQUNMQSxJQURLLEdBQ0UsR0FERixHQUNRQSxJQURSLEdBQ2VBLElBRGYsR0FDc0JBLElBRDdCO0FBRUQsQyIsImZpbGUiOiJzYXZ2eS1zaWduLW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2F2dnlTaWduT25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2F2dnlTaWduT25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNmZjI2NGViOWE3ZWNlM2E1ODQyIiwiZXhwb3J0IGZ1bmN0aW9uIGJhc2VVcmwoKSB7XG4gIGxldCBwYXJ0cyA9IFtcbiAgICB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsIFxuICAgICcvLycsXG4gICAgd2luZG93LmxvY2F0aW9uLmhvc3RcbiAgXTtcbiAgbGV0IHVybCA9IHBhcnRzLmpvaW4oJycpO1xuICBpZiAodXJsLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHVybCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJ2YXIgZyA9ICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgPyBnbG9iYWxcclxuICAgICAgICA6ICgodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93XHJcbiAgICAgICAgOiAoKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogdGhpcykpO1xyXG5cclxuXHJcbihmdW5jdGlvbihnbG9iYWwpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBVUkxTZWFyY2hQYXJhbXNcclxuICAgKlxyXG4gICAqIEluc3BpcmVkIGZyb20gOiBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi91cmwtc2VhcmNoLXBhcmFtcy9ibG9iL21hc3Rlci9zcmMvdXJsLXNlYXJjaC1wYXJhbXMuanNcclxuICAgKi9cclxuXHJcbiAgdmFyIGNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gISFTeW1ib2wuaXRlcmF0b3I7XHJcbiAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgdmFyIGl0ZXJhdG9yU3VwcG9ydGVkID0gY2hlY2tJZkl0ZXJhdG9ySXNTdXBwb3J0ZWQoKTtcclxuXHJcbiAgdmFyIGNyZWF0ZUl0ZXJhdG9yID0gZnVuY3Rpb24oaXRlbXMpIHtcclxuICAgIHZhciBpdGVyYXRvciA9IHtcclxuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcclxuICAgICAgICByZXR1cm4geyBkb25lOiB2YWx1ZSA9PT0gdm9pZCAwLCB2YWx1ZTogdmFsdWUgfTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZihpdGVyYXRvclN1cHBvcnRlZCkge1xyXG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpdGVyYXRvcjtcclxuICB9O1xyXG5cclxuICB2YXIgcG9seWZpbGxVUkxTZWFyY2hQYXJhbXM9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBVUkxTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbihzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZW50cmllcycsIHsgdmFsdWU6IHt9IH0pO1xyXG5cclxuICAgICAgaWYodHlwZW9mIHNlYXJjaFN0cmluZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBpZihzZWFyY2hTdHJpbmcgIT09ICcnKSB7XHJcbiAgICAgICAgICBzZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcucmVwbGFjZSgvXlxcPy8sICcnKTtcclxuICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gc2VhcmNoU3RyaW5nLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgICB2YXIgYXR0cmlidXRlO1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGVuZChcclxuICAgICAgICAgICAgICBkZWNvZGVVUklDb21wb25lbnQoYXR0cmlidXRlWzBdKSxcclxuICAgICAgICAgICAgICAoYXR0cmlidXRlLmxlbmd0aCA+IDEpID8gZGVjb2RlVVJJQ29tcG9uZW50KGF0dHJpYnV0ZVsxXSkgOiAnJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmKHNlYXJjaFN0cmluZyBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgc2VhcmNoU3RyaW5nLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAgIF90aGlzLmFwcGVuZCh2YWx1ZSwgbmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb3RvID0gVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcclxuXHJcbiAgICBwcm90by5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICBpZihuYW1lIGluIHRoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICB0aGlzLl9lbnRyaWVzW25hbWVdLnB1c2godmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZW50cmllc1tuYW1lXSA9IFt2YWx1ZS50b1N0cmluZygpXTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5kZWxldGUgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9lbnRyaWVzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKSA/IHRoaXMuX2VudHJpZXNbbmFtZV1bMF0gOiBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKSA/IHRoaXMuX2VudHJpZXNbbmFtZV0uc2xpY2UoMCkgOiBbXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uaGFzID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICByZXR1cm4gKG5hbWUgaW4gdGhpcy5fZW50cmllcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0gPSBbdmFsdWUudG9TdHJpbmcoKV07XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgICB2YXIgZW50cmllcztcclxuICAgICAgZm9yKHZhciBuYW1lIGluIHRoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICBpZih0aGlzLl9lbnRyaWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICBlbnRyaWVzID0gdGhpcy5fZW50cmllc1tuYW1lXTtcclxuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZW50cmllc1tpXSwgbmFtZSwgdGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmtleXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpOyB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8udmFsdWVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSk7IH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTsgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIHByb3RvW1N5bWJvbC5pdGVyYXRvcl0gPSBwcm90by5lbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWFyY2hTdHJpbmcgPSAnJztcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgaWYoc2VhcmNoU3RyaW5nLmxlbmd0aCA+IDApIHNlYXJjaFN0cmluZys9ICcmJztcclxuICAgICAgICBzZWFyY2hTdHJpbmcgKz0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBzZWFyY2hTdHJpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIGdsb2JhbC5VUkxTZWFyY2hQYXJhbXMgPSBVUkxTZWFyY2hQYXJhbXM7XHJcbiAgfTtcclxuXHJcbiAgaWYoISgnVVJMU2VhcmNoUGFyYW1zJyBpbiBnbG9iYWwpIHx8IChuZXcgVVJMU2VhcmNoUGFyYW1zKCc/YT0xJykudG9TdHJpbmcoKSAhPT0gJ2E9MScpKSB7XHJcbiAgICBwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gSFRNTEFuY2hvckVsZW1lbnRcclxuXHJcbn0pKGcpO1xyXG5cclxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIFVSTFxyXG4gICAqXHJcbiAgICogSW5zcGlyZWQgZnJvbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcnYvRE9NLVVSTC1Qb2x5ZmlsbC9ibG9iL21hc3Rlci9zcmMvdXJsLmpzXHJcbiAgICovXHJcblxyXG4gIHZhciBjaGVja0lmVVJMSXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB1ID0gbmV3IFVSTCgnYicsICdodHRwOi8vYScpO1xyXG4gICAgICB1LnBhdGhuYW1lID0gJ2MlMjBkJztcclxuICAgICAgcmV0dXJuICh1LmhyZWYgPT09ICdodHRwOi8vYS9jJTIwZCcpICYmIHUuc2VhcmNoUGFyYW1zO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgdmFyIHBvbHlmaWxsVVJMID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX1VSTCA9IGdsb2JhbC5VUkw7XHJcblxyXG4gICAgdmFyIFVSTCA9IGZ1bmN0aW9uKHVybCwgYmFzZSkge1xyXG4gICAgICBpZih0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgdXJsID0gU3RyaW5nKHVybCk7XHJcblxyXG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcclxuICAgICAgd2luZG93LmRvYyA9IGRvYztcclxuICAgICAgaWYoYmFzZSkge1xyXG4gICAgICAgIHZhciBiYXNlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdiYXNlJyk7XHJcbiAgICAgICAgYmFzZUVsZW1lbnQuaHJlZiA9IGJhc2U7XHJcbiAgICAgICAgZG9jLmhlYWQuYXBwZW5kQ2hpbGQoYmFzZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYW5jaG9yRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIGFuY2hvckVsZW1lbnQuaHJlZiA9IHVybDtcclxuICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoYW5jaG9yRWxlbWVudCk7XHJcbiAgICAgIGFuY2hvckVsZW1lbnQuaHJlZiA9IGFuY2hvckVsZW1lbnQuaHJlZjsgLy8gZm9yY2UgaHJlZiB0byByZWZyZXNoXHJcblxyXG4gICAgICBpZihhbmNob3JFbGVtZW50LnByb3RvY29sID09PSAnOicgfHwgIS86Ly50ZXN0KGFuY2hvckVsZW1lbnQuaHJlZikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFVSTCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19hbmNob3JFbGVtZW50Jywge1xyXG4gICAgICAgIHZhbHVlOiBhbmNob3JFbGVtZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkwucHJvdG90eXBlO1xyXG5cclxuICAgIHZhciBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBhdHRyaWJ1dGVOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50W2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudFthdHRyaWJ1dGVOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgWydoYXNoJywgJ2hvc3QnLCAnaG9zdG5hbWUnLCAncG9ydCcsICdwcm90b2NvbCcsICdzZWFyY2gnXVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3RvLCB7XHJcblxyXG4gICAgICAndG9TdHJpbmcnOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ocmVmO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnaHJlZicgOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50LmhyZWYucmVwbGFjZSgvXFw/JC8sJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5ocmVmID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAncGF0aG5hbWUnIDoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5wYXRobmFtZS5yZXBsYWNlKC8oXlxcLz8pLywnLycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5wYXRobmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ29yaWdpbic6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5fYW5jaG9yRWxlbWVudC5ob3N0bmFtZSArICh0aGlzLl9hbmNob3JFbGVtZW50LnBvcnQgPyAoJzonICsgdGhpcy5fYW5jaG9yRWxlbWVudC5wb3J0KSA6ICcnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdwYXNzd29yZCc6IHsgLy8gVE9ET1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAndXNlcm5hbWUnOiB7IC8vIFRPRE9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3NlYXJjaFBhcmFtcyc6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy5zZWFyY2gpO1xyXG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgIFsnYXBwZW5kJywgJ2RlbGV0ZScsICdzZXQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHNlYXJjaFBhcmFtc1ttZXRob2ROYW1lXTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHNlYXJjaFBhcmFtcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICBfdGhpcy5zZWFyY2ggPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgVVJMLmNyZWF0ZU9iamVjdFVSTCA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICAgICAgcmV0dXJuIF9VUkwuY3JlYXRlT2JqZWN0VVJMLmFwcGx5KF9VUkwsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgcmV0dXJuIF9VUkwucmV2b2tlT2JqZWN0VVJMLmFwcGx5KF9VUkwsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdsb2JhbC5VUkwgPSBVUkw7XHJcblxyXG4gIH07XHJcblxyXG4gIGlmKCFjaGVja0lmVVJMSXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgcG9seWZpbGxVUkwoKTtcclxuICB9XHJcblxyXG4gIGlmKChnbG9iYWwubG9jYXRpb24gIT09IHZvaWQgMCkgJiYgISgnb3JpZ2luJyBpbiBnbG9iYWwubG9jYXRpb24pKSB7XHJcbiAgICB2YXIgZ2V0T3JpZ2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lICsgKGdsb2JhbC5sb2NhdGlvbi5wb3J0ID8gKCc6JyArIGdsb2JhbC5sb2NhdGlvbi5wb3J0KSA6ICcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbC5sb2NhdGlvbiwgJ29yaWdpbicsIHtcclxuICAgICAgICBnZXQ6IGdldE9yaWdpbixcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGdsb2JhbC5sb2NhdGlvbi5vcmlnaW4gPSBnZXRPcmlnaW4oKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59KShnKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdXJsLXBvbHlmaWxsL3VybC1wb2x5ZmlsbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEltcGxpY3RHcmFudCBmcm9tICcuL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50JztcblxuZXhwb3J0IHsgSW1wbGljdEdyYW50IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgUHJvdmlkZXIgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tICcuLi91dGlscy9iYXNlLXVybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltcGxpY2l0R3JhbnQgZXh0ZW5kcyBQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnJlZGlyZWN0X3VyaSA9IG9wdGlvbnMucmVkaXJlY3RfdXJpIHx8IGAke2Jhc2VVcmwoKX1vYXV0aC9jYWxsYmFja2A7XG4gICAgdGhpcy5yZXNwb25zZV90eXBlID0gb3B0aW9ucy5yZXNwb25zZV90eXBlIHx8ICd0b2tlbic7XG4gICAgdGhpcy5jbGllbnRfaWQgPSBvcHRpb25zLmNsaWVudF9pZCB8fCAnJztcbiAgICB0aGlzLnNjb3BlcyA9IG9wdGlvbnMuc2NvcGVzIHx8IG9wdGlvbnMuZGVmYXVsdF9zY29wZXMgfHwgW107XG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdF91cmksXG4gICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlX3R5cGUsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50X2lkLFxuICAgICAgc2NvcGVzOiB0aGlzLnNjb3Blc1xuICAgIH1cbiAgfVxuXG4gIG9wZW4ob3B0aW9ucz17fSkge1xuICAgIGxldCBwb3B1cCA9IHRoaXMucG9wdXA7XG4gICAgbGV0IGRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7IHN0YXRlOiBwb3B1cC5zdGF0ZSB9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnJyk7XG4gICAgcGFyYW1zLmFwcGVuZCgnY2xpZW50X2lkJywgZGVmYXVsdHMuY2xpZW50X2lkKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdzdGF0ZScsIGRlZmF1bHRzLnN0YXRlKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdvcmlnaW4nLCBiYXNlVXJsKCkuc2xpY2UoMCwgLTEpKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdyZXNwb25zZV90eXBlJywgZGVmYXVsdHMucmVzcG9uc2VfdHlwZSk7XG4gICAgcGFyYW1zLmFwcGVuZCgncmVkaXJlY3RfdXJpJywgZGVmYXVsdHMucmVkaXJlY3RfdXJpKTtcbiAgICBpZihkZWZhdWx0cy5zY29wZXMubGVuZ3RoKSB7XG4gICAgICBwYXJhbXMuYXBwZW5kKCdzY29wZXMnLCBkZWZhdWx0cy5zY29wZXMuam9pbignICcpKTtcbiAgICB9XG4gICAgbGV0IHVybCA9IGAke3RoaXMuZG9tYWlufT8ke3BhcmFtcy50b1N0cmluZygpfWBcbiAgICByZXR1cm4gcG9wdXAub3BlbihPYmplY3QuYXNzaWduKHsgdXJsOiB1cmwgfSwgZGVmYXVsdHMpKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwiaW1wb3J0IHsgZ3VpZCB9ICBmcm9tICcuLi91dGlscy9ndWlkJztcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tICcuLi91dGlscy9iYXNlLXVybCc7XG5cbmNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgfVxuXG4gIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEgIT0gbnVsbDtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBzZXREYXRhKHZhbCkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWw7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIG9wZW4ob3B0aW9ucykge1xuICAgIGNvbnN0IHVybCA9IG9wdGlvbnMudXJsO1xuXG4gICAgdGhpcy5zb3VyY2UgPSB3aW5kb3cub3Blbih1cmwsIHRoaXMuc3RhdGUsICdoZWlnaHQ9NjAwLHdpZHRoPTYwMCcpO1xuXG4gICAgY29uc3QgcHJvbWlzZVdhdGNoUG9wdXAgPSBmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHBvcHVwID0gdGhpcztcbiAgICAgIGlmKHBvcHVwLmhhc0RhdGEoKSl7XG4gICAgICAgIHJlc29sdmUocG9wdXAuZ2V0RGF0YSgpKVxuICAgICAgICBpZih0aGlzLnNvdXJjZS5jbG9zZSkge1xuICAgICAgICAgIHRoaXMuc291cmNlLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNlIGlmKHBvcHVwLnNvdXJjZS5jbG9zZWQpe1xuICAgICAgICByZWplY3QocG9wdXAuc291cmNlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBwcm9taXNlV2F0Y2hQb3B1cChyZXNvbHZlLCByZWplY3QpXG4gICAgICAgIH0sIDEwMClcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB2YXIgcHJvdmlkZXIgPSB0aGlzO1xuICAgIHRoaXMuZG9tYWluID0gb3B0aW9ucy5kb21haW47XG4gICAgdGhpcy5hbGxvd2VkT3JpZ2lucyA9IG9wdGlvbnMuYWxsb3dlZE9yaWdpbnMgfHwgW2Jhc2VVcmwoKS5zbGljZSgwLC0xKV1cbiAgICB0aGlzLnNlY3JldHMgPSB7fTtcbiAgICB0aGlzLl9zdGF0ZSA9IG9wdGlvbnMuc3RhdGU7XG5cbiAgICBpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5lciA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZXMsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5lciA9IHdpbmRvdy5hdHRhY2hFdmVudCgnb25tZXNzYWdlJywgaGFuZGxlTWVzc2FnZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VzKGV2ZW50KSB7XG4gICAgICBsZXQgc2VjcmV0cyA9IHByb3ZpZGVyLnNlY3JldHM7XG4gICAgICBjb25zdCBvcmlnaW5NYXRjaGVzID0gcHJvdmlkZXIuYWxsb3dlZE9yaWdpbnMgPT09ICcqJyB8fCAoZXZlbnQgJiYgIHByb3ZpZGVyLmFsbG93ZWRPcmlnaW5zLmluZGV4T2YoZXZlbnQub3JpZ2luKSAhPT0gLTEpO1xuICAgICAgbGV0IHNvdXJjZU1hdGNoZXMgPSB0cnVlO1xuICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZU1hdGNoZXMgPSBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdICYmIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc291cmNlID09IGV2ZW50LnNvdXJjZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgJiYgZXZlbnQuZGF0YS5zb3VyY2UpIHtcbiAgICAgICAgc291cmNlTWF0Y2hlcyA9IHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0gJiYgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UgPT0gZXZlbnQuZGF0YS5zb3VyY2U7XG4gICAgICB9XG4gICAgICBpZihvcmlnaW5NYXRjaGVzICYmIHNvdXJjZU1hdGNoZXMpe1xuICAgICAgICBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNldERhdGEoZXZlbnQuZGF0YSk7XG4gICAgICAgIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uaGFzRGF0YShldmVudC5kYXRhKTtcbiAgICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UuY2xvc2UoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBwb3B1cCgpIHtcbiAgICBjb25zdCBzZWNyZXQgPSB0aGlzLnN0YXRlO1xuICAgIGxldCBwb3B1cCA9IG5ldyBQb3B1cCh7XG4gICAgICBzdGF0ZTogc2VjcmV0LFxuICAgIH0pXG4gICAgdGhpcy5zZWNyZXRzW3NlY3JldF0gPSBwb3B1cDtcbiAgICByZXR1cm4gcG9wdXA7XG4gIH1cblxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlIHx8IGd1aWQoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHJvdmlkZXJzL2Jhc2UuanMiLCJleHBvcnQgZnVuY3Rpb24gZ3VpZCgpIHtcbiAgZnVuY3Rpb24gczQoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgLnRvU3RyaW5nKDE2KVxuICAgIC5zdWJzdHJpbmcoMSk7XG4gIH1cbiAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xuICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9ndWlkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==