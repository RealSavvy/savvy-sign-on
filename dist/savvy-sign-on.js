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
        params.append('scope', defaults.scopes.join(' '));
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
    if (this.domain) {
      if (!this.domain.startsWith('http')) {
        this.domain = new URL(window.location.protocol + '//' + this.domain).toString();
      }
    } else {
      throw 'missing required option: domain';
    }
    if (this.domain.substr(-1) === '/') {
      this.domain = this.domain.slice(0, -1);
    }
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
      } else {
        sourceMatches = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4YWI2NWFiZWY3NmNiZGNiNTJmYyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VybC1wb2x5ZmlsbC91cmwtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJuYW1lcyI6WyJiYXNlVXJsIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInVybCIsImpvaW4iLCJzdWJzdHIiLCJJbXBsaWN0R3JhbnQiLCJJbXBsaWNpdEdyYW50Iiwib3B0aW9ucyIsInJlZGlyZWN0X3VyaSIsInJlc3BvbnNlX3R5cGUiLCJjbGllbnRfaWQiLCJzY29wZXMiLCJkZWZhdWx0X3Njb3BlcyIsInBvcHVwIiwiZGVmYXVsdHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzdGF0ZSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImFwcGVuZCIsInNsaWNlIiwibGVuZ3RoIiwiZG9tYWluIiwidG9TdHJpbmciLCJvcGVuIiwidGhlbiIsInJlc3VsdCIsIlBvcHVwIiwiX2RhdGEiLCJzb3VyY2UiLCJ2YWwiLCJwcm9taXNlV2F0Y2hQb3B1cCIsInJlc29sdmUiLCJyZWplY3QiLCJoYXNEYXRhIiwiZ2V0RGF0YSIsImNsb3NlIiwiY2xvc2VkIiwic2V0VGltZW91dCIsImJpbmQiLCJQcm9taXNlIiwiQmFzZSIsInByb3ZpZGVyIiwic3RhcnRzV2l0aCIsIlVSTCIsImFsbG93ZWRPcmlnaW5zIiwic2VjcmV0cyIsIl9zdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsImhhbmRsZU1lc3NhZ2VzIiwiYXR0YWNoRXZlbnQiLCJldmVudCIsIm9yaWdpbk1hdGNoZXMiLCJpbmRleE9mIiwib3JpZ2luIiwic291cmNlTWF0Y2hlcyIsImRhdGEiLCJzZXREYXRhIiwic2VjcmV0IiwiZ3VpZCIsInM0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic3Vic3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O1FDN0RnQkEsTyxHQUFBQSxPO0FBQVQsU0FBU0EsT0FBVCxHQUFtQjtBQUN4QixNQUFJQyxRQUFRLENBQ1ZDLE9BQU9DLFFBQVAsQ0FBZ0JDLFFBRE4sRUFFVixJQUZVLEVBR1ZGLE9BQU9DLFFBQVAsQ0FBZ0JFLElBSE4sQ0FBWjtBQUtBLE1BQUlDLE1BQU1MLE1BQU1NLElBQU4sQ0FBVyxFQUFYLENBQVY7QUFDQSxNQUFJRCxJQUFJRSxNQUFKLENBQVcsQ0FBQyxDQUFaLE1BQW1CLEdBQXZCLEVBQTRCO0FBQzFCRixXQUFPLEdBQVA7QUFDRDs7QUFFRCxTQUFPQSxHQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7QUNaRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtDQUErQyxVQUFVLEVBQUU7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsa0JBQWtCLEVBQUU7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLG1CQUFtQixFQUFFO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQywyQkFBMkIsRUFBRTtBQUN2RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOztBQUVQLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTzs7QUFFUCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7OztBQ2pVRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNB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RSxHQURGLEdBQ1FBLElBRFIsR0FDZUEsSUFEZixHQUNzQkEsSUFEN0I7QUFFRCxDIiwiZmlsZSI6InNhdnZ5LXNpZ24tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTYXZ2eVNpZ25PblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTYXZ2eVNpZ25PblwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGFiNjVhYmVmNzZjYmRjYjUyZmMiLCJleHBvcnQgZnVuY3Rpb24gYmFzZVVybCgpIHtcbiAgbGV0IHBhcnRzID0gW1xuICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCwgXG4gICAgJy8vJyxcbiAgICB3aW5kb3cubG9jYXRpb24uaG9zdFxuICBdO1xuICBsZXQgdXJsID0gcGFydHMuam9pbignJyk7XG4gIGlmICh1cmwuc3Vic3RyKC0xKSAhPT0gJy8nKSB7XG4gICAgdXJsICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9iYXNlLXVybC5qcyIsInZhciBnID0gKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSA/IGdsb2JhbFxyXG4gICAgICAgIDogKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3dcclxuICAgICAgICA6ICgodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSA/IHNlbGYgOiB0aGlzKSk7XHJcblxyXG5cclxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIFVSTFNlYXJjaFBhcmFtc1xyXG4gICAqXHJcbiAgICogSW5zcGlyZWQgZnJvbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL3VybC1zZWFyY2gtcGFyYW1zL2Jsb2IvbWFzdGVyL3NyYy91cmwtc2VhcmNoLXBhcmFtcy5qc1xyXG4gICAqL1xyXG5cclxuICB2YXIgY2hlY2tJZkl0ZXJhdG9ySXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiAhIVN5bWJvbC5pdGVyYXRvcjtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICB2YXIgaXRlcmF0b3JTdXBwb3J0ZWQgPSBjaGVja0lmSXRlcmF0b3JJc1N1cHBvcnRlZCgpO1xyXG5cclxuICB2YXIgY3JlYXRlSXRlcmF0b3IgPSBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgdmFyIGl0ZXJhdG9yID0ge1xyXG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpO1xyXG4gICAgICAgIHJldHVybiB7IGRvbmU6IHZhbHVlID09PSB2b2lkIDAsIHZhbHVlOiB2YWx1ZSB9O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gIH07XHJcblxyXG4gIHZhciBwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcz0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIFVSTFNlYXJjaFBhcmFtcyA9IGZ1bmN0aW9uKHNlYXJjaFN0cmluZykge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19lbnRyaWVzJywgeyB2YWx1ZToge30gfSk7XHJcblxyXG4gICAgICBpZih0eXBlb2Ygc2VhcmNoU3RyaW5nID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmKHNlYXJjaFN0cmluZyAhPT0gJycpIHtcclxuICAgICAgICAgIHNlYXJjaFN0cmluZyA9IHNlYXJjaFN0cmluZy5yZXBsYWNlKC9eXFw/LywgJycpO1xyXG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzZWFyY2hTdHJpbmcuc3BsaXQoJyYnKTtcclxuICAgICAgICAgIHZhciBhdHRyaWJ1dGU7XHJcbiAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChhdHRyaWJ1dGVbMF0pLFxyXG4gICAgICAgICAgICAgIChhdHRyaWJ1dGUubGVuZ3RoID4gMSkgPyBkZWNvZGVVUklDb21wb25lbnQoYXR0cmlidXRlWzFdKSA6ICcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYoc2VhcmNoU3RyaW5nIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBzZWFyY2hTdHJpbmcuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgICAgX3RoaXMuYXBwZW5kKHZhbHVlLCBuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xyXG5cclxuICAgIHByb3RvLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIGlmKG5hbWUgaW4gdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0ucHVzaCh2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lbnRyaWVzW25hbWVdID0gW3ZhbHVlLnRvU3RyaW5nKCldO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmRlbGV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXVswXSA6IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXS5zbGljZSgwKSA6IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgdGhpcy5fZW50cmllc1tuYW1lXSA9IFt2YWx1ZS50b1N0cmluZygpXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgIHZhciBlbnRyaWVzO1xyXG4gICAgICBmb3IodmFyIG5hbWUgaW4gdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgIGlmKHRoaXMuX2VudHJpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgIGVudHJpZXMgPSB0aGlzLl9lbnRyaWVzW25hbWVdO1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBlbnRyaWVzW2ldLCBuYW1lLCB0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8ua2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSk7IH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by52YWx1ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKTsgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pOyB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYoaXRlcmF0b3JTdXBwb3J0ZWQpIHtcclxuICAgICAgcHJvdG9bU3ltYm9sLml0ZXJhdG9yXSA9IHByb3RvLmVudHJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlYXJjaFN0cmluZyA9ICcnO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBpZihzZWFyY2hTdHJpbmcubGVuZ3RoID4gMCkgc2VhcmNoU3RyaW5nKz0gJyYnO1xyXG4gICAgICAgIHNlYXJjaFN0cmluZyArPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHNlYXJjaFN0cmluZztcclxuICAgIH07XHJcblxyXG4gICAgZ2xvYmFsLlVSTFNlYXJjaFBhcmFtcyA9IFVSTFNlYXJjaFBhcmFtcztcclxuICB9O1xyXG5cclxuICBpZighKCdVUkxTZWFyY2hQYXJhbXMnIGluIGdsb2JhbCkgfHwgKG5ldyBVUkxTZWFyY2hQYXJhbXMoJz9hPTEnKS50b1N0cmluZygpICE9PSAnYT0xJykpIHtcclxuICAgIHBvbHlmaWxsVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgfVxyXG5cclxuICAvLyBIVE1MQW5jaG9yRWxlbWVudFxyXG5cclxufSkoZyk7XHJcblxyXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgVVJMXHJcbiAgICpcclxuICAgKiBJbnNwaXJlZCBmcm9tIDogaHR0cHM6Ly9naXRodWIuY29tL2Fydi9ET00tVVJMLVBvbHlmaWxsL2Jsb2IvbWFzdGVyL3NyYy91cmwuanNcclxuICAgKi9cclxuXHJcbiAgdmFyIGNoZWNrSWZVUkxJc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHUgPSBuZXcgVVJMKCdiJywgJ2h0dHA6Ly9hJyk7XHJcbiAgICAgIHUucGF0aG5hbWUgPSAnYyUyMGQnO1xyXG4gICAgICByZXR1cm4gKHUuaHJlZiA9PT0gJ2h0dHA6Ly9hL2MlMjBkJykgJiYgdS5zZWFyY2hQYXJhbXM7XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICB2YXIgcG9seWZpbGxVUkwgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBfVVJMID0gZ2xvYmFsLlVSTDtcclxuXHJcbiAgICB2YXIgVVJMID0gZnVuY3Rpb24odXJsLCBiYXNlKSB7XHJcbiAgICAgIGlmKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB1cmwgPSBTdHJpbmcodXJsKTtcclxuXHJcbiAgICAgIHZhciBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpO1xyXG4gICAgICB3aW5kb3cuZG9jID0gZG9jO1xyXG4gICAgICBpZihiYXNlKSB7XHJcbiAgICAgICAgdmFyIGJhc2VFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2Jhc2UnKTtcclxuICAgICAgICBiYXNlRWxlbWVudC5ocmVmID0gYmFzZTtcclxuICAgICAgICBkb2MuaGVhZC5hcHBlbmRDaGlsZChiYXNlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhbmNob3JFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgYW5jaG9yRWxlbWVudC5ocmVmID0gdXJsO1xyXG4gICAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChhbmNob3JFbGVtZW50KTtcclxuICAgICAgYW5jaG9yRWxlbWVudC5ocmVmID0gYW5jaG9yRWxlbWVudC5ocmVmOyAvLyBmb3JjZSBocmVmIHRvIHJlZnJlc2hcclxuXHJcbiAgICAgIGlmKGFuY2hvckVsZW1lbnQucHJvdG9jb2wgPT09ICc6JyB8fCAhLzovLnRlc3QoYW5jaG9yRWxlbWVudC5ocmVmKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVVJMJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2FuY2hvckVsZW1lbnQnLCB7XHJcbiAgICAgICAgdmFsdWU6IGFuY2hvckVsZW1lbnRcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm90byA9IFVSTC5wcm90b3R5cGU7XHJcblxyXG4gICAgdmFyIGxpbmtVUkxXaXRoQW5jaG9yQXR0cmlidXRlID0gZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIGF0dHJpYnV0ZU5hbWUsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnRbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50W2F0dHJpYnV0ZU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBbJ2hhc2gnLCAnaG9zdCcsICdob3N0bmFtZScsICdwb3J0JywgJ3Byb3RvY29sJywgJ3NlYXJjaCddXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgIGxpbmtVUkxXaXRoQW5jaG9yQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvdG8sIHtcclxuXHJcbiAgICAgICd0b1N0cmluZyc6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmhyZWY7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgICdocmVmJyA6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQuaHJlZi5yZXBsYWNlKC9cXD8kLywnJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50LmhyZWYgPSB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdwYXRobmFtZScgOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50LnBhdGhuYW1lLnJlcGxhY2UoLyheXFwvPykvLCcvJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50LnBhdGhuYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnb3JpZ2luJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5wcm90b2NvbCArICcvLycgKyB0aGlzLl9hbmNob3JFbGVtZW50Lmhvc3RuYW1lICsgKHRoaXMuX2FuY2hvckVsZW1lbnQucG9ydCA/ICgnOicgKyB0aGlzLl9hbmNob3JFbGVtZW50LnBvcnQpIDogJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3Bhc3N3b3JkJzogeyAvLyBUT0RPXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICd1c2VybmFtZSc6IHsgLy8gVE9ET1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnc2VhcmNoUGFyYW1zJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLnNlYXJjaCk7XHJcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgWydhcHBlbmQnLCAnZGVsZXRlJywgJ3NldCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gc2VhcmNoUGFyYW1zW21ldGhvZE5hbWVdO1xyXG4gICAgICAgICAgICBzZWFyY2hQYXJhbXNbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBtZXRob2QuYXBwbHkoc2VhcmNoUGFyYW1zLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgIF90aGlzLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oYmxvYikge1xyXG4gICAgICByZXR1cm4gX1VSTC5jcmVhdGVPYmplY3RVUkwuYXBwbHkoX1VSTCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICByZXR1cm4gX1VSTC5yZXZva2VPYmplY3RVUkwuYXBwbHkoX1VSTCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2xvYmFsLlVSTCA9IFVSTDtcclxuXHJcbiAgfTtcclxuXHJcbiAgaWYoIWNoZWNrSWZVUkxJc1N1cHBvcnRlZCgpKSB7XHJcbiAgICBwb2x5ZmlsbFVSTCgpO1xyXG4gIH1cclxuXHJcbiAgaWYoKGdsb2JhbC5sb2NhdGlvbiAhPT0gdm9pZCAwKSAmJiAhKCdvcmlnaW4nIGluIGdsb2JhbC5sb2NhdGlvbikpIHtcclxuICAgIHZhciBnZXRPcmlnaW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIGdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgKyAoZ2xvYmFsLmxvY2F0aW9uLnBvcnQgPyAoJzonICsgZ2xvYmFsLmxvY2F0aW9uLnBvcnQpIDogJycpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2xvYmFsLmxvY2F0aW9uLCAnb3JpZ2luJywge1xyXG4gICAgICAgIGdldDogZ2V0T3JpZ2luLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ2xvYmFsLmxvY2F0aW9uLm9yaWdpbiA9IGdldE9yaWdpbigpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKGcpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91cmwtcG9seWZpbGwvdXJsLXBvbHlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSW1wbGljdEdyYW50IGZyb20gJy4vcHJvdmlkZXJzL2ltcGxpY3QtZ3JhbnQnO1xuXG5leHBvcnQgeyBJbXBsaWN0R3JhbnQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBQcm92aWRlciBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgYmFzZVVybCB9IGZyb20gJy4uL3V0aWxzL2Jhc2UtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1wbGljaXRHcmFudCBleHRlbmRzIFByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucmVkaXJlY3RfdXJpID0gb3B0aW9ucy5yZWRpcmVjdF91cmkgfHwgYCR7YmFzZVVybCgpfW9hdXRoL2NhbGxiYWNrYDtcbiAgICB0aGlzLnJlc3BvbnNlX3R5cGUgPSBvcHRpb25zLnJlc3BvbnNlX3R5cGUgfHwgJ3Rva2VuJztcbiAgICB0aGlzLmNsaWVudF9pZCA9IG9wdGlvbnMuY2xpZW50X2lkIHx8ICcnO1xuICAgIHRoaXMuc2NvcGVzID0gb3B0aW9ucy5zY29wZXMgfHwgb3B0aW9ucy5kZWZhdWx0X3Njb3BlcyB8fCBbXTtcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0X3VyaSxcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VfdHlwZSxcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRfaWQsXG4gICAgICBzY29wZXM6IHRoaXMuc2NvcGVzXG4gICAgfVxuICB9XG5cbiAgb3BlbihvcHRpb25zPXt9KSB7XG4gICAgbGV0IHBvcHVwID0gdGhpcy5wb3B1cDtcbiAgICBsZXQgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHsgc3RhdGU6IHBvcHVwLnN0YXRlIH0sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCcnKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdjbGllbnRfaWQnLCBkZWZhdWx0cy5jbGllbnRfaWQpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3N0YXRlJywgZGVmYXVsdHMuc3RhdGUpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ29yaWdpbicsIGJhc2VVcmwoKS5zbGljZSgwLCAtMSkpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3Jlc3BvbnNlX3R5cGUnLCBkZWZhdWx0cy5yZXNwb25zZV90eXBlKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdyZWRpcmVjdF91cmknLCBkZWZhdWx0cy5yZWRpcmVjdF91cmkpO1xuICAgIGlmKGRlZmF1bHRzLnNjb3Blcy5sZW5ndGgpIHtcbiAgICAgIHBhcmFtcy5hcHBlbmQoJ3Njb3BlJywgZGVmYXVsdHMuc2NvcGVzLmpvaW4oJyAnKSk7XG4gICAgfVxuICAgIGxldCB1cmwgPSBgJHt0aGlzLmRvbWFpbn0/JHtwYXJhbXMudG9TdHJpbmcoKX1gXG4gICAgcmV0dXJuIHBvcHVwLm9wZW4oT2JqZWN0LmFzc2lnbih7IHVybDogdXJsIH0sIGRlZmF1bHRzKSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wcm92aWRlcnMvaW1wbGljdC1ncmFudC5qcyIsImltcG9ydCB7IGd1aWQgfSAgZnJvbSAnLi4vdXRpbHMvZ3VpZCc7XG5pbXBvcnQgeyBiYXNlVXJsIH0gZnJvbSAnLi4vdXRpbHMvYmFzZS11cmwnO1xuXG5jbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZTtcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIH1cblxuICBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhICE9IG51bGw7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgc2V0RGF0YSh2YWwpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsO1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBvcGVuKG9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSBvcHRpb25zLnVybDtcblxuICAgIHRoaXMuc291cmNlID0gd2luZG93Lm9wZW4odXJsLCB0aGlzLnN0YXRlLCAnaGVpZ2h0PTYwMCx3aWR0aD02MDAnKTtcblxuICAgIGNvbnN0IHByb21pc2VXYXRjaFBvcHVwID0gZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIGxldCBwb3B1cCA9IHRoaXM7XG4gICAgICBpZihwb3B1cC5oYXNEYXRhKCkpe1xuICAgICAgICByZXNvbHZlKHBvcHVwLmdldERhdGEoKSlcbiAgICAgICAgaWYodGhpcy5zb3VyY2UuY2xvc2UpIHtcbiAgICAgICAgICB0aGlzLnNvdXJjZS5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9ZWxzZSBpZihwb3B1cC5zb3VyY2UuY2xvc2VkKXtcbiAgICAgICAgcmVqZWN0KHBvcHVwLnNvdXJjZSlcbiAgICAgIH1lbHNle1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgICB9LCAxMDApXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHByb21pc2VXYXRjaFBvcHVwKHJlc29sdmUsIHJlamVjdClcbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdmFyIHByb3ZpZGVyID0gdGhpcztcbiAgICB0aGlzLmRvbWFpbiA9IG9wdGlvbnMuZG9tYWluO1xuICAgIGlmKHRoaXMuZG9tYWluKSB7XG4gICAgICBpZighdGhpcy5kb21haW4uc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAgIHRoaXMuZG9tYWluID0gbmV3IFVSTChgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3RoaXMuZG9tYWlufWApLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICdtaXNzaW5nIHJlcXVpcmVkIG9wdGlvbjogZG9tYWluJztcbiAgICB9XG4gICAgaWYodGhpcy5kb21haW4uc3Vic3RyKC0xKSA9PT0gJy8nKSB7XG4gICAgICB0aGlzLmRvbWFpbiA9IHRoaXMuZG9tYWluLnNsaWNlKDAsIC0xKVxuICAgIH1cbiAgICB0aGlzLmFsbG93ZWRPcmlnaW5zID0gb3B0aW9ucy5hbGxvd2VkT3JpZ2lucyB8fCBbYmFzZVVybCgpLnNsaWNlKDAsLTEpXVxuICAgIHRoaXMuc2VjcmV0cyA9IHt9O1xuICAgIHRoaXMuX3N0YXRlID0gb3B0aW9ucy5zdGF0ZTtcblxuICAgIGlmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlcywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gd2luZG93LmF0dGFjaEV2ZW50KCdvbm1lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZXMoZXZlbnQpIHtcbiAgICAgIGxldCBzZWNyZXRzID0gcHJvdmlkZXIuc2VjcmV0cztcbiAgICAgIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBwcm92aWRlci5hbGxvd2VkT3JpZ2lucyA9PT0gJyonIHx8IChldmVudCAmJiAgcHJvdmlkZXIuYWxsb3dlZE9yaWdpbnMuaW5kZXhPZihldmVudC5vcmlnaW4pICE9PSAtMSk7XG4gICAgICBsZXQgc291cmNlTWF0Y2hlcyA9IHRydWU7XG4gICAgICBpZihldmVudCAmJiBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgc291cmNlTWF0Y2hlcyA9IHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0gJiYgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UgPT0gZXZlbnQuc291cmNlO1xuICAgICAgfSBlbHNlIGlmIChldmVudCAmJiBldmVudC5kYXRhLnNvdXJjZSkge1xuICAgICAgICBzb3VyY2VNYXRjaGVzID0gc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXSAmJiBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZSA9PSBldmVudC5kYXRhLnNvdXJjZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvdXJjZU1hdGNoZXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmKG9yaWdpbk1hdGNoZXMgJiYgc291cmNlTWF0Y2hlcyl7XG4gICAgICAgIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc2V0RGF0YShldmVudC5kYXRhKTtcbiAgICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5oYXNEYXRhKGV2ZW50LmRhdGEpO1xuICAgICAgICBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZS5jbG9zZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHBvcHVwKCkge1xuICAgIGNvbnN0IHNlY3JldCA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IHBvcHVwID0gbmV3IFBvcHVwKHtcbiAgICAgIHN0YXRlOiBzZWNyZXQsXG4gICAgfSlcbiAgICB0aGlzLnNlY3JldHNbc2VjcmV0XSA9IHBvcHVwO1xuICAgIHJldHVybiBwb3B1cDtcbiAgfVxuXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUgfHwgZ3VpZCgpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBndWlkKCkge1xuICBmdW5jdGlvbiBzNCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAudG9TdHJpbmcoMTYpXG4gICAgLnN1YnN0cmluZygxKTtcbiAgfVxuICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2d1aWQuanMiXSwic291cmNlUm9vdCI6IiJ9