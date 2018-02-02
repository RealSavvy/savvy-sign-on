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
      var url = '' + this.domain + this.authorize_path + '?' + params.toString();

      if (this.idxDomain) {
        var idxParams = new URLSearchParams('');
        idxParams.append('redirect_uri', url);
        url = '' + this.idxDomain + this.authorize_path + '?' + idxParams.toString();
      }

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

    this.domain = cleanDomain(options.domain);
    if (options.idxDomain) {
      this.idxDomain = cleanDomain(options.idxDomain);
    }

    this.authorize_path = cleanPath(options.authorize_path || '/oauth/authorize');
    this.logout_path = cleanPath(options.logout_path || '/oauth_static/logout.html');

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

    function cleanPath(path) {
      if (path.substr(-1) === '/') {
        path = path.slice(0, -1);
      }
      return path;
    }

    function cleanDomain(domain) {
      if (domain) {
        if (!domain.startsWith('http')) {
          var urlObject = new URL(window.location.protocol + '//' + domain);
          urlObject.pathname = '';
          domain = urlObject.toString();
        }
        domain = cleanPath(domain);

        return domain;
      } else {
        throw 'missing required option: domain';
      }
    }
  }

  _createClass(Base, [{
    key: 'logout',
    value: function logout() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var popup = this.popup;
      var defaults = Object.assign({ state: popup.state }, this.defaults, options);

      var params = new URLSearchParams('');
      params.append('client_id', defaults.client_id);
      params.append('state', defaults.state);
      var url = '' + this.domain + this.logout_path + '#' + params.toString();

      if (this.idxDomain) {
        var idxParams = new URLSearchParams('');
        idxParams.append('redirect_uri', url);
        url = '' + this.idxDomain + this.logout_path + '?' + idxParams.toString();
      }

      return popup.open(Object.assign({ url: url }, defaults)).then(function (result) {
        return result;
      });
    }
  }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlY2ViMmY1YTdjOWRkZGRhNTk2MyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VybC1wb2x5ZmlsbC91cmwtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJuYW1lcyI6WyJiYXNlVXJsIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInVybCIsImpvaW4iLCJzdWJzdHIiLCJJbXBsaWN0R3JhbnQiLCJJbXBsaWNpdEdyYW50Iiwib3B0aW9ucyIsInJlZGlyZWN0X3VyaSIsInJlc3BvbnNlX3R5cGUiLCJjbGllbnRfaWQiLCJzY29wZXMiLCJkZWZhdWx0X3Njb3BlcyIsInBvcHVwIiwiZGVmYXVsdHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzdGF0ZSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImFwcGVuZCIsInNsaWNlIiwibGVuZ3RoIiwiZG9tYWluIiwiYXV0aG9yaXplX3BhdGgiLCJ0b1N0cmluZyIsImlkeERvbWFpbiIsImlkeFBhcmFtcyIsIm9wZW4iLCJ0aGVuIiwicmVzdWx0IiwiUG9wdXAiLCJfZGF0YSIsInNvdXJjZSIsInZhbCIsInByb21pc2VXYXRjaFBvcHVwIiwicmVzb2x2ZSIsInJlamVjdCIsImhhc0RhdGEiLCJnZXREYXRhIiwiY2xvc2UiLCJjbG9zZWQiLCJzZXRUaW1lb3V0IiwiYmluZCIsIlByb21pc2UiLCJCYXNlIiwicHJvdmlkZXIiLCJjbGVhbkRvbWFpbiIsImNsZWFuUGF0aCIsImxvZ291dF9wYXRoIiwiYWxsb3dlZE9yaWdpbnMiLCJzZWNyZXRzIiwiX3N0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVyIiwiaGFuZGxlTWVzc2FnZXMiLCJhdHRhY2hFdmVudCIsImV2ZW50Iiwib3JpZ2luTWF0Y2hlcyIsImluZGV4T2YiLCJvcmlnaW4iLCJzb3VyY2VNYXRjaGVzIiwiZGF0YSIsInNldERhdGEiLCJwYXRoIiwic3RhcnRzV2l0aCIsInVybE9iamVjdCIsIlVSTCIsInBhdGhuYW1lIiwic2VjcmV0IiwiZ3VpZCIsInM0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic3Vic3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O1FDN0RnQkEsTyxHQUFBQSxPO0FBQVQsU0FBU0EsT0FBVCxHQUFtQjtBQUN4QixNQUFJQyxRQUFRLENBQ1ZDLE9BQU9DLFFBQVAsQ0FBZ0JDLFFBRE4sRUFFVixJQUZVLEVBR1ZGLE9BQU9DLFFBQVAsQ0FBZ0JFLElBSE4sQ0FBWjtBQUtBLE1BQUlDLE1BQU1MLE1BQU1NLElBQU4sQ0FBVyxFQUFYLENBQVY7QUFDQSxNQUFJRCxJQUFJRSxNQUFKLENBQVcsQ0FBQyxDQUFaLE1BQW1CLEdBQXZCLEVBQTRCO0FBQzFCRixXQUFPLEdBQVA7QUFDRDs7QUFFRCxTQUFPQSxHQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7QUNaRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtDQUErQyxVQUFVLEVBQUU7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsa0JBQWtCLEVBQUU7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLG1CQUFtQixFQUFFO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQywyQkFBMkIsRUFBRTtBQUN2RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOztBQUVQLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTzs7QUFFUCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNM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L0JXO0FBQ1YsVUFBTXVDLFNBQVMsS0FBS3BELEtBQXBCO0FBQ0EsVUFBSUosUUFBUSxJQUFJa0IsS0FBSixDQUFVO0FBQ3BCZCxlQUFPb0Q7QUFEYSxPQUFWLENBQVo7QUFHQSxXQUFLbEIsT0FBTCxDQUFha0IsTUFBYixJQUF1QnhELEtBQXZCO0FBQ0EsYUFBT0EsS0FBUDtBQUNEOzs7d0JBRVc7QUFDVixhQUFPLEtBQUt1QyxNQUFMLElBQWUsaUJBQXRCO0FBQ0Q7Ozs7OztrQkExRWtCUCxJOzs7Ozs7Ozs7Ozs7UUNsREx5QixJLEdBQUFBLEk7QUFBVCxTQUFTQSxJQUFULEdBQWdCO0FBQ3JCLFdBQVNDLEVBQVQsR0FBYztBQUNaLFdBQU9DLEtBQUtDLEtBQUwsQ0FBVyxDQUFDLElBQUlELEtBQUtFLE1BQUwsRUFBTCxJQUFzQixPQUFqQyxFQUNOakQsUUFETSxDQUNHLEVBREgsRUFFTmtELFNBRk0sQ0FFSSxDQUZKLENBQVA7QUFHRDtBQUNELFNBQU9KLE9BQU9BLElBQVAsR0FBYyxHQUFkLEdBQW9CQSxJQUFwQixHQUEyQixHQUEzQixHQUFpQ0EsSUFBakMsR0FBd0MsR0FBeEMsR0FDTEEsSUFESyxHQUNFLEdBREYsR0FDUUEsSUFEUixHQUNlQSxJQURmLEdBQ3NCQSxJQUQ3QjtBQUVELEMiLCJmaWxlIjoic2F2dnktc2lnbi1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlY2ViMmY1YTdjOWRkZGRhNTk2MyIsImV4cG9ydCBmdW5jdGlvbiBiYXNlVXJsKCkge1xuICBsZXQgcGFydHMgPSBbXG4gICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sLCBcbiAgICAnLy8nLFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0XG4gIF07XG4gIGxldCB1cmwgPSBwYXJ0cy5qb2luKCcnKTtcbiAgaWYgKHVybC5zdWJzdHIoLTEpICE9PSAnLycpIHtcbiAgICB1cmwgKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2Jhc2UtdXJsLmpzIiwidmFyIGcgPSAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpID8gZ2xvYmFsXHJcbiAgICAgICAgOiAoKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvd1xyXG4gICAgICAgIDogKCh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IHRoaXMpKTtcclxuXHJcblxyXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgVVJMU2VhcmNoUGFyYW1zXHJcbiAgICpcclxuICAgKiBJbnNwaXJlZCBmcm9tIDogaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vdXJsLXNlYXJjaC1wYXJhbXMvYmxvYi9tYXN0ZXIvc3JjL3VybC1zZWFyY2gtcGFyYW1zLmpzXHJcbiAgICovXHJcblxyXG4gIHZhciBjaGVja0lmSXRlcmF0b3JJc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuICEhU3ltYm9sLml0ZXJhdG9yO1xyXG4gICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBpdGVyYXRvclN1cHBvcnRlZCA9IGNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkKCk7XHJcblxyXG4gIHZhciBjcmVhdGVJdGVyYXRvciA9IGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICB2YXIgaXRlcmF0b3IgPSB7XHJcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XHJcbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdmFsdWUgPT09IHZvaWQgMCwgdmFsdWU6IHZhbHVlIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYoaXRlcmF0b3JTdXBwb3J0ZWQpIHtcclxuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpdGVyYXRvcjtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHBvbHlmaWxsVVJMU2VhcmNoUGFyYW1zPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgVVJMU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2VudHJpZXMnLCB7IHZhbHVlOiB7fSB9KTtcclxuXHJcbiAgICAgIGlmKHR5cGVvZiBzZWFyY2hTdHJpbmcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYoc2VhcmNoU3RyaW5nICE9PSAnJykge1xyXG4gICAgICAgICAgc2VhcmNoU3RyaW5nID0gc2VhcmNoU3RyaW5nLnJlcGxhY2UoL15cXD8vLCAnJyk7XHJcbiAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHNlYXJjaFN0cmluZy5zcGxpdCgnJicpO1xyXG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZTtcclxuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KGF0dHJpYnV0ZVswXSksXHJcbiAgICAgICAgICAgICAgKGF0dHJpYnV0ZS5sZW5ndGggPiAxKSA/IGRlY29kZVVSSUNvbXBvbmVudChhdHRyaWJ1dGVbMV0pIDogJydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZihzZWFyY2hTdHJpbmcgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHNlYXJjaFN0cmluZy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgICBfdGhpcy5hcHBlbmQodmFsdWUsIG5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm90byA9IFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG8uYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgaWYobmFtZSBpbiB0aGlzLl9lbnRyaWVzKSB7XHJcbiAgICAgICAgdGhpcy5fZW50cmllc1tuYW1lXS5wdXNoKHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0gPSBbdmFsdWUudG9TdHJpbmcoKV07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZGVsZXRlID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICBkZWxldGUgdGhpcy5fZW50cmllc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICByZXR1cm4gKG5hbWUgaW4gdGhpcy5fZW50cmllcykgPyB0aGlzLl9lbnRyaWVzW25hbWVdWzBdIDogbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZ2V0QWxsID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICByZXR1cm4gKG5hbWUgaW4gdGhpcy5fZW50cmllcykgPyB0aGlzLl9lbnRyaWVzW25hbWVdLnNsaWNlKDApIDogW107XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9lbnRyaWVzW25hbWVdID0gW3ZhbHVlLnRvU3RyaW5nKCldO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcclxuICAgICAgdmFyIGVudHJpZXM7XHJcbiAgICAgIGZvcih2YXIgbmFtZSBpbiB0aGlzLl9lbnRyaWVzKSB7XHJcbiAgICAgICAgaWYodGhpcy5fZW50cmllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGVudHJpZXNbaV0sIG5hbWUsIHRoaXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5rZXlzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKTsgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpOyB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSk7IH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZihpdGVyYXRvclN1cHBvcnRlZCkge1xyXG4gICAgICBwcm90b1tTeW1ib2wuaXRlcmF0b3JdID0gcHJvdG8uZW50cmllcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90by50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VhcmNoU3RyaW5nID0gJyc7XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgIGlmKHNlYXJjaFN0cmluZy5sZW5ndGggPiAwKSBzZWFyY2hTdHJpbmcrPSAnJic7XHJcbiAgICAgICAgc2VhcmNoU3RyaW5nICs9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gc2VhcmNoU3RyaW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICBnbG9iYWwuVVJMU2VhcmNoUGFyYW1zID0gVVJMU2VhcmNoUGFyYW1zO1xyXG4gIH07XHJcblxyXG4gIGlmKCEoJ1VSTFNlYXJjaFBhcmFtcycgaW4gZ2xvYmFsKSB8fCAobmV3IFVSTFNlYXJjaFBhcmFtcygnP2E9MScpLnRvU3RyaW5nKCkgIT09ICdhPTEnKSkge1xyXG4gICAgcG9seWZpbGxVUkxTZWFyY2hQYXJhbXMoKTtcclxuICB9XHJcblxyXG4gIC8vIEhUTUxBbmNob3JFbGVtZW50XHJcblxyXG59KShnKTtcclxuXHJcbihmdW5jdGlvbihnbG9iYWwpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBVUkxcclxuICAgKlxyXG4gICAqIEluc3BpcmVkIGZyb20gOiBodHRwczovL2dpdGh1Yi5jb20vYXJ2L0RPTS1VUkwtUG9seWZpbGwvYmxvYi9tYXN0ZXIvc3JjL3VybC5qc1xyXG4gICAqL1xyXG5cclxuICB2YXIgY2hlY2tJZlVSTElzU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdSA9IG5ldyBVUkwoJ2InLCAnaHR0cDovL2EnKTtcclxuICAgICAgdS5wYXRobmFtZSA9ICdjJTIwZCc7XHJcbiAgICAgIHJldHVybiAodS5ocmVmID09PSAnaHR0cDovL2EvYyUyMGQnKSAmJiB1LnNlYXJjaFBhcmFtcztcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBwb2x5ZmlsbFVSTCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF9VUkwgPSBnbG9iYWwuVVJMO1xyXG5cclxuICAgIHZhciBVUkwgPSBmdW5jdGlvbih1cmwsIGJhc2UpIHtcclxuICAgICAgaWYodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHVybCA9IFN0cmluZyh1cmwpO1xyXG5cclxuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XHJcbiAgICAgIHdpbmRvdy5kb2MgPSBkb2M7XHJcbiAgICAgIGlmKGJhc2UpIHtcclxuICAgICAgICB2YXIgYmFzZUVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYmFzZScpO1xyXG4gICAgICAgIGJhc2VFbGVtZW50LmhyZWYgPSBiYXNlO1xyXG4gICAgICAgIGRvYy5oZWFkLmFwcGVuZENoaWxkKGJhc2VFbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGFuY2hvckVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBhbmNob3JFbGVtZW50LmhyZWYgPSB1cmw7XHJcbiAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGFuY2hvckVsZW1lbnQpO1xyXG4gICAgICBhbmNob3JFbGVtZW50LmhyZWYgPSBhbmNob3JFbGVtZW50LmhyZWY7IC8vIGZvcmNlIGhyZWYgdG8gcmVmcmVzaFxyXG5cclxuICAgICAgaWYoYW5jaG9yRWxlbWVudC5wcm90b2NvbCA9PT0gJzonIHx8ICEvOi8udGVzdChhbmNob3JFbGVtZW50LmhyZWYpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBVUkwnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfYW5jaG9yRWxlbWVudCcsIHtcclxuICAgICAgICB2YWx1ZTogYW5jaG9yRWxlbWVudFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb3RvID0gVVJMLnByb3RvdHlwZTtcclxuXHJcbiAgICB2YXIgbGlua1VSTFdpdGhBbmNob3JBdHRyaWJ1dGUgPSBmdW5jdGlvbihhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgYXR0cmlidXRlTmFtZSwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudFthdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnRbYXR0cmlidXRlTmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFsnaGFzaCcsICdob3N0JywgJ2hvc3RuYW1lJywgJ3BvcnQnLCAncHJvdG9jb2wnLCAnc2VhcmNoJ11cclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgbGlua1VSTFdpdGhBbmNob3JBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhwcm90bywge1xyXG5cclxuICAgICAgJ3RvU3RyaW5nJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuaHJlZjtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ2hyZWYnIDoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5ocmVmLnJlcGxhY2UoL1xcPyQvLCcnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnQuaHJlZiA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3BhdGhuYW1lJyA6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQucGF0aG5hbWUucmVwbGFjZSgvKF5cXC8/KS8sJy8nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnQucGF0aG5hbWUgPSB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdvcmlnaW4nOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50LnByb3RvY29sICsgJy8vJyArIHRoaXMuX2FuY2hvckVsZW1lbnQuaG9zdG5hbWUgKyAodGhpcy5fYW5jaG9yRWxlbWVudC5wb3J0ID8gKCc6JyArIHRoaXMuX2FuY2hvckVsZW1lbnQucG9ydCkgOiAnJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAncGFzc3dvcmQnOiB7IC8vIFRPRE9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3VzZXJuYW1lJzogeyAvLyBUT0RPXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdzZWFyY2hQYXJhbXMnOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHRoaXMuc2VhcmNoKTtcclxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICBbJ2FwcGVuZCcsICdkZWxldGUnLCAnc2V0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBzZWFyY2hQYXJhbXNbbWV0aG9kTmFtZV07XHJcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtc1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIG1ldGhvZC5hcHBseShzZWFyY2hQYXJhbXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgX3RoaXMuc2VhcmNoID0gc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgICAgIHJldHVybiBfVVJMLmNyZWF0ZU9iamVjdFVSTC5hcHBseShfVVJMLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIHJldHVybiBfVVJMLnJldm9rZU9iamVjdFVSTC5hcHBseShfVVJMLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnbG9iYWwuVVJMID0gVVJMO1xyXG5cclxuICB9O1xyXG5cclxuICBpZighY2hlY2tJZlVSTElzU3VwcG9ydGVkKCkpIHtcclxuICAgIHBvbHlmaWxsVVJMKCk7XHJcbiAgfVxyXG5cclxuICBpZigoZ2xvYmFsLmxvY2F0aW9uICE9PSB2b2lkIDApICYmICEoJ29yaWdpbicgaW4gZ2xvYmFsLmxvY2F0aW9uKSkge1xyXG4gICAgdmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSArIChnbG9iYWwubG9jYXRpb24ucG9ydCA/ICgnOicgKyBnbG9iYWwubG9jYXRpb24ucG9ydCkgOiAnJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWwubG9jYXRpb24sICdvcmlnaW4nLCB7XHJcbiAgICAgICAgZ2V0OiBnZXRPcmlnaW4sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICBnbG9iYWwubG9jYXRpb24ub3JpZ2luID0gZ2V0T3JpZ2luKCk7XHJcbiAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoZyk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3VybC1wb2x5ZmlsbC91cmwtcG9seWZpbGwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBJbXBsaWN0R3JhbnQgZnJvbSAnLi9wcm92aWRlcnMvaW1wbGljdC1ncmFudCc7XG5cbmV4cG9ydCB7IEltcGxpY3RHcmFudCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IFByb3ZpZGVyIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBiYXNlVXJsIH0gZnJvbSAnLi4vdXRpbHMvYmFzZS11cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbXBsaWNpdEdyYW50IGV4dGVuZHMgUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5yZWRpcmVjdF91cmkgPSBvcHRpb25zLnJlZGlyZWN0X3VyaSB8fCBgJHtiYXNlVXJsKCl9b2F1dGgvY2FsbGJhY2tgO1xuICAgIHRoaXMucmVzcG9uc2VfdHlwZSA9IG9wdGlvbnMucmVzcG9uc2VfdHlwZSB8fCAndG9rZW4nO1xuICAgIHRoaXMuY2xpZW50X2lkID0gb3B0aW9ucy5jbGllbnRfaWQgfHwgJyc7XG4gICAgdGhpcy5zY29wZXMgPSBvcHRpb25zLnNjb3BlcyB8fCBvcHRpb25zLmRlZmF1bHRfc2NvcGVzIHx8IFtdO1xuICB9XG5cbiAgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RfdXJpLFxuICAgICAgcmVzcG9uc2VfdHlwZTogdGhpcy5yZXNwb25zZV90eXBlLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudF9pZCxcbiAgICAgIHNjb3BlczogdGhpcy5zY29wZXMsXG4gICAgfVxuICB9XG5cbiAgb3BlbihvcHRpb25zPXt9KSB7XG4gICAgbGV0IHBvcHVwID0gdGhpcy5wb3B1cDtcbiAgICBsZXQgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHsgc3RhdGU6IHBvcHVwLnN0YXRlIH0sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCcnKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdjbGllbnRfaWQnLCBkZWZhdWx0cy5jbGllbnRfaWQpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3N0YXRlJywgZGVmYXVsdHMuc3RhdGUpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ29yaWdpbicsIGJhc2VVcmwoKS5zbGljZSgwLCAtMSkpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3Jlc3BvbnNlX3R5cGUnLCBkZWZhdWx0cy5yZXNwb25zZV90eXBlKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdyZWRpcmVjdF91cmknLCBkZWZhdWx0cy5yZWRpcmVjdF91cmkpO1xuICAgIGlmKGRlZmF1bHRzLnNjb3Blcy5sZW5ndGgpIHtcbiAgICAgIHBhcmFtcy5hcHBlbmQoJ3Njb3BlJywgZGVmYXVsdHMuc2NvcGVzLmpvaW4oJyAnKSk7XG4gICAgfVxuICAgIGxldCB1cmwgPSBgJHt0aGlzLmRvbWFpbn0ke3RoaXMuYXV0aG9yaXplX3BhdGh9PyR7cGFyYW1zLnRvU3RyaW5nKCl9YFxuXG4gICAgaWYodGhpcy5pZHhEb21haW4pe1xuICAgICAgbGV0IGlkeFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycpO1xuICAgICAgaWR4UGFyYW1zLmFwcGVuZCgncmVkaXJlY3RfdXJpJywgdXJsKTtcbiAgICAgIHVybCA9IGAke3RoaXMuaWR4RG9tYWlufSR7dGhpcy5hdXRob3JpemVfcGF0aH0/JHtpZHhQYXJhbXMudG9TdHJpbmcoKX1gXG4gICAgfVxuXG4gICAgcmV0dXJuIHBvcHVwLm9wZW4oT2JqZWN0LmFzc2lnbih7IHVybDogdXJsIH0sIGRlZmF1bHRzKSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wcm92aWRlcnMvaW1wbGljdC1ncmFudC5qcyIsImltcG9ydCB7IGd1aWQgfSAgZnJvbSAnLi4vdXRpbHMvZ3VpZCc7XG5pbXBvcnQgeyBiYXNlVXJsIH0gZnJvbSAnLi4vdXRpbHMvYmFzZS11cmwnO1xuXG5jbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZTtcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIH1cblxuICBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhICE9IG51bGw7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgc2V0RGF0YSh2YWwpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsO1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBvcGVuKG9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSBvcHRpb25zLnVybDtcblxuICAgIHRoaXMuc291cmNlID0gd2luZG93Lm9wZW4odXJsLCB0aGlzLnN0YXRlLCAnaGVpZ2h0PTYwMCx3aWR0aD02MDAnKTtcblxuICAgIGNvbnN0IHByb21pc2VXYXRjaFBvcHVwID0gZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIGxldCBwb3B1cCA9IHRoaXM7XG4gICAgICBpZihwb3B1cC5oYXNEYXRhKCkpe1xuICAgICAgICByZXNvbHZlKHBvcHVwLmdldERhdGEoKSlcbiAgICAgICAgaWYodGhpcy5zb3VyY2UuY2xvc2UpIHtcbiAgICAgICAgICB0aGlzLnNvdXJjZS5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9ZWxzZSBpZihwb3B1cC5zb3VyY2UuY2xvc2VkKXtcbiAgICAgICAgcmVqZWN0KHBvcHVwLnNvdXJjZSlcbiAgICAgIH1lbHNle1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgICB9LCAxMDApXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHByb21pc2VXYXRjaFBvcHVwKHJlc29sdmUsIHJlamVjdClcbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdmFyIHByb3ZpZGVyID0gdGhpcztcblxuICAgIHRoaXMuZG9tYWluID0gY2xlYW5Eb21haW4ob3B0aW9ucy5kb21haW4pO1xuICAgIGlmKG9wdGlvbnMuaWR4RG9tYWluKXtcbiAgICAgIHRoaXMuaWR4RG9tYWluID0gY2xlYW5Eb21haW4ob3B0aW9ucy5pZHhEb21haW4pO1xuICAgIH1cblxuICAgIHRoaXMuYXV0aG9yaXplX3BhdGggPSBjbGVhblBhdGgob3B0aW9ucy5hdXRob3JpemVfcGF0aCB8fCAnL29hdXRoL2F1dGhvcml6ZScpO1xuICAgIHRoaXMubG9nb3V0X3BhdGggPSBjbGVhblBhdGgob3B0aW9ucy5sb2dvdXRfcGF0aCB8fCAnL29hdXRoX3N0YXRpYy9sb2dvdXQuaHRtbCcpO1xuXG4gICAgdGhpcy5hbGxvd2VkT3JpZ2lucyA9IG9wdGlvbnMuYWxsb3dlZE9yaWdpbnMgfHwgW2Jhc2VVcmwoKS5zbGljZSgwLC0xKV07XG4gICAgdGhpcy5zZWNyZXRzID0ge307XG4gICAgdGhpcy5fc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuXG4gICAgaWYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ubWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlcyhldmVudCkge1xuICAgICAgbGV0IHNlY3JldHMgPSBwcm92aWRlci5zZWNyZXRzO1xuICAgICAgY29uc3Qgb3JpZ2luTWF0Y2hlcyA9IHByb3ZpZGVyLmFsbG93ZWRPcmlnaW5zID09PSAnKicgfHwgKGV2ZW50ICYmICBwcm92aWRlci5hbGxvd2VkT3JpZ2lucy5pbmRleE9mKGV2ZW50Lm9yaWdpbikgIT09IC0xKTtcbiAgICAgIGxldCBzb3VyY2VNYXRjaGVzID0gdHJ1ZTtcbiAgICAgIGlmKGV2ZW50ICYmIGV2ZW50LnNvdXJjZSkge1xuICAgICAgICBzb3VyY2VNYXRjaGVzID0gc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXSAmJiBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZSA9PSBldmVudC5zb3VyY2U7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGEuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZU1hdGNoZXMgPSBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdICYmIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc291cmNlID09IGV2ZW50LmRhdGEuc291cmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc291cmNlTWF0Y2hlcyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYob3JpZ2luTWF0Y2hlcyAmJiBzb3VyY2VNYXRjaGVzKXtcbiAgICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zZXREYXRhKGV2ZW50LmRhdGEpO1xuICAgICAgICBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLmhhc0RhdGEoZXZlbnQuZGF0YSk7XG4gICAgICAgIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc291cmNlLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW5QYXRoKHBhdGgpIHtcbiAgICAgIGlmKHBhdGguc3Vic3RyKC0xKSA9PT0gJy8nKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFuRG9tYWluKGRvbWFpbil7XG4gICAgICBpZihkb21haW4pIHtcbiAgICAgICAgaWYoIWRvbWFpbi5zdGFydHNXaXRoKCdodHRwJykpIHtcbiAgICAgICAgICBsZXQgdXJsT2JqZWN0ID0gbmV3IFVSTChgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke2RvbWFpbn1gKTtcbiAgICAgICAgICB1cmxPYmplY3QucGF0aG5hbWUgPSAnJztcbiAgICAgICAgICBkb21haW4gPSB1cmxPYmplY3QudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBkb21haW4gPSBjbGVhblBhdGgoZG9tYWluKTtcblxuICAgICAgICByZXR1cm4gZG9tYWluO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgJ21pc3NpbmcgcmVxdWlyZWQgb3B0aW9uOiBkb21haW4nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBwb3B1cCgpIHtcbiAgICBjb25zdCBzZWNyZXQgPSB0aGlzLnN0YXRlO1xuICAgIGxldCBwb3B1cCA9IG5ldyBQb3B1cCh7XG4gICAgICBzdGF0ZTogc2VjcmV0LFxuICAgIH0pXG4gICAgdGhpcy5zZWNyZXRzW3NlY3JldF0gPSBwb3B1cDtcbiAgICByZXR1cm4gcG9wdXA7XG4gIH1cblxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlIHx8IGd1aWQoKTtcbiAgfVxuXG4gIGxvZ291dChvcHRpb25zPXt9KSB7XG4gICAgbGV0IHBvcHVwID0gdGhpcy5wb3B1cDtcbiAgICBsZXQgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHsgc3RhdGU6IHBvcHVwLnN0YXRlIH0sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2NsaWVudF9pZCcsIGRlZmF1bHRzLmNsaWVudF9pZCk7XG4gICAgcGFyYW1zLmFwcGVuZCgnc3RhdGUnLCBkZWZhdWx0cy5zdGF0ZSk7XG4gICAgbGV0IHVybCA9IGAke3RoaXMuZG9tYWlufSR7dGhpcy5sb2dvdXRfcGF0aH0jJHtwYXJhbXMudG9TdHJpbmcoKX1gXG5cbiAgICBpZih0aGlzLmlkeERvbWFpbil7XG4gICAgICBsZXQgaWR4UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnJyk7XG4gICAgICBpZHhQYXJhbXMuYXBwZW5kKCdyZWRpcmVjdF91cmknLCB1cmwpO1xuICAgICAgdXJsID0gYCR7dGhpcy5pZHhEb21haW59JHt0aGlzLmxvZ291dF9wYXRofT8ke2lkeFBhcmFtcy50b1N0cmluZygpfWBcbiAgICB9XG5cbiAgICByZXR1cm4gcG9wdXAub3BlbihPYmplY3QuYXNzaWduKHsgdXJsOiB1cmwgfSwgZGVmYXVsdHMpKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9iYXNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGd1aWQoKSB7XG4gIGZ1bmN0aW9uIHM0KCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgIC50b1N0cmluZygxNilcbiAgICAuc3Vic3RyaW5nKDEpO1xuICB9XG4gIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=