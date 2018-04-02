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

/* WEBPACK VAR INJECTION */(function(global) {(function(global) {
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

  /**
   * Search param name and values should be encoded according to https://url.spec.whatwg.org/#urlencoded-serializing
   * encodeURIComponent() produces the same result except encoding spaces as `%20` instead of `+`.
   */
  var serializeParam = function(value) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  };

  var deserializeParam = function(value) {
    return decodeURIComponent(value).replace(/\+/g, ' ');
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
              deserializeParam(attribute[0]),
              (attribute.length > 1) ? deserializeParam(attribute[1]) : ''
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
        searchString += serializeParam(name) + '=' + serializeParam(value);
      });
      return searchString;
    };

    global.URLSearchParams = URLSearchParams;
  };

  if(!('URLSearchParams' in global) || (new URLSearchParams('?a=1').toString() !== 'a=1')) {
    polyfillURLSearchParams();
  }

  // HTMLAnchorElement

})(
  (typeof global !== 'undefined') ? global
    : ((typeof window !== 'undefined') ? window
    : ((typeof self !== 'undefined') ? self : this))
);

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

})(
  (typeof global !== 'undefined') ? global
    : ((typeof window !== 'undefined') ? window
    : ((typeof self !== 'undefined') ? self : this))
);

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

      var height = 600;
      var width = 600;

      var y_offset = window.top.outerHeight / 2 + window.top.screenY - height / 2;
      var x_offset = window.top.outerWidth / 2 + window.top.screenX - width / 2;

      var strWindowFeatures = 'height=' + height + ',width=' + width + ',top=' + y_offset + ',left=' + x_offset;

      this.source = window.open(url, this.state, strWindowFeatures);

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
    this.logout_path = cleanPath(options.logout_path || '/oauth/logout.html');

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
      var url = '' + this.domain + this.logout_path + '?' + params.toString();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmOWMzYjQ0MmU1ZmYwZWY5YTQ2NSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VybC1wb2x5ZmlsbC91cmwtcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJuYW1lcyI6WyJiYXNlVXJsIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInVybCIsImpvaW4iLCJzdWJzdHIiLCJJbXBsaWN0R3JhbnQiLCJJbXBsaWNpdEdyYW50Iiwib3B0aW9ucyIsInJlZGlyZWN0X3VyaSIsInJlc3BvbnNlX3R5cGUiLCJjbGllbnRfaWQiLCJzY29wZXMiLCJkZWZhdWx0X3Njb3BlcyIsInBvcHVwIiwiZGVmYXVsdHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzdGF0ZSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImFwcGVuZCIsInNsaWNlIiwibGVuZ3RoIiwiZG9tYWluIiwiYXV0aG9yaXplX3BhdGgiLCJ0b1N0cmluZyIsImlkeERvbWFpbiIsImlkeFBhcmFtcyIsIm9wZW4iLCJ0aGVuIiwicmVzdWx0IiwiUG9wdXAiLCJfZGF0YSIsInNvdXJjZSIsInZhbCIsImhlaWdodCIsIndpZHRoIiwieV9vZmZzZXQiLCJ0b3AiLCJvdXRlckhlaWdodCIsInNjcmVlblkiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJzY3JlZW5YIiwic3RyV2luZG93RmVhdHVyZXMiLCJwcm9taXNlV2F0Y2hQb3B1cCIsInJlc29sdmUiLCJyZWplY3QiLCJoYXNEYXRhIiwiZ2V0RGF0YSIsImNsb3NlIiwiY2xvc2VkIiwic2V0VGltZW91dCIsImJpbmQiLCJQcm9taXNlIiwiQmFzZSIsInByb3ZpZGVyIiwiY2xlYW5Eb21haW4iLCJjbGVhblBhdGgiLCJsb2dvdXRfcGF0aCIsImFsbG93ZWRPcmlnaW5zIiwic2VjcmV0cyIsIl9zdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsImhhbmRsZU1lc3NhZ2VzIiwiYXR0YWNoRXZlbnQiLCJldmVudCIsIm9yaWdpbk1hdGNoZXMiLCJpbmRleE9mIiwib3JpZ2luIiwic291cmNlTWF0Y2hlcyIsImRhdGEiLCJzZXREYXRhIiwicGF0aCIsInN0YXJ0c1dpdGgiLCJ1cmxPYmplY3QiLCJVUkwiLCJwYXRobmFtZSIsInNlY3JldCIsImd1aWQiLCJzNCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInN1YnN0cmluZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztRQzdEZ0JBLE8sR0FBQUEsTztBQUFULFNBQVNBLE9BQVQs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LFNBRk0sQ0FFSSxDQUZKLENBQVA7QUFHRDtBQUNELFNBQU9KLE9BQU9BLElBQVAsR0FBYyxHQUFkLEdBQW9CQSxJQUFwQixHQUEyQixHQUEzQixHQUFpQ0EsSUFBakMsR0FBd0MsR0FBeEMsR0FDTEEsSUFESyxHQUNFLEdBREYsR0FDUUEsSUFEUixHQUNlQSxJQURmLEdBQ3NCQSxJQUQ3QjtBQUVELEMiLCJmaWxlIjoic2F2dnktc2lnbi1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmOWMzYjQ0MmU1ZmYwZWY5YTQ2NSIsImV4cG9ydCBmdW5jdGlvbiBiYXNlVXJsKCkge1xuICBsZXQgcGFydHMgPSBbXG4gICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sLCBcbiAgICAnLy8nLFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0XG4gIF07XG4gIGxldCB1cmwgPSBwYXJ0cy5qb2luKCcnKTtcbiAgaWYgKHVybC5zdWJzdHIoLTEpICE9PSAnLycpIHtcbiAgICB1cmwgKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2Jhc2UtdXJsLmpzIiwiKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIFVSTFNlYXJjaFBhcmFtc1xyXG4gICAqXHJcbiAgICogSW5zcGlyZWQgZnJvbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL3VybC1zZWFyY2gtcGFyYW1zL2Jsb2IvbWFzdGVyL3NyYy91cmwtc2VhcmNoLXBhcmFtcy5qc1xyXG4gICAqL1xyXG5cclxuICB2YXIgY2hlY2tJZkl0ZXJhdG9ySXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiAhIVN5bWJvbC5pdGVyYXRvcjtcclxuICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICB2YXIgaXRlcmF0b3JTdXBwb3J0ZWQgPSBjaGVja0lmSXRlcmF0b3JJc1N1cHBvcnRlZCgpO1xyXG5cclxuICB2YXIgY3JlYXRlSXRlcmF0b3IgPSBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgdmFyIGl0ZXJhdG9yID0ge1xyXG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpO1xyXG4gICAgICAgIHJldHVybiB7IGRvbmU6IHZhbHVlID09PSB2b2lkIDAsIHZhbHVlOiB2YWx1ZSB9O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBwYXJhbSBuYW1lIGFuZCB2YWx1ZXMgc2hvdWxkIGJlIGVuY29kZWQgYWNjb3JkaW5nIHRvIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsZW5jb2RlZC1zZXJpYWxpemluZ1xyXG4gICAqIGVuY29kZVVSSUNvbXBvbmVudCgpIHByb2R1Y2VzIHRoZSBzYW1lIHJlc3VsdCBleGNlcHQgZW5jb2Rpbmcgc3BhY2VzIGFzIGAlMjBgIGluc3RlYWQgb2YgYCtgLlxyXG4gICAqL1xyXG4gIHZhciBzZXJpYWxpemVQYXJhbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcclxuICB9O1xyXG5cclxuICB2YXIgZGVzZXJpYWxpemVQYXJhbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcclxuICB9O1xyXG5cclxuICB2YXIgcG9seWZpbGxVUkxTZWFyY2hQYXJhbXM9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBVUkxTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbihzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZW50cmllcycsIHsgdmFsdWU6IHt9IH0pO1xyXG5cclxuICAgICAgaWYodHlwZW9mIHNlYXJjaFN0cmluZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBpZihzZWFyY2hTdHJpbmcgIT09ICcnKSB7XHJcbiAgICAgICAgICBzZWFyY2hTdHJpbmcgPSBzZWFyY2hTdHJpbmcucmVwbGFjZSgvXlxcPy8sICcnKTtcclxuICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gc2VhcmNoU3RyaW5nLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgICB2YXIgYXR0cmlidXRlO1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGVuZChcclxuICAgICAgICAgICAgICBkZXNlcmlhbGl6ZVBhcmFtKGF0dHJpYnV0ZVswXSksXHJcbiAgICAgICAgICAgICAgKGF0dHJpYnV0ZS5sZW5ndGggPiAxKSA/IGRlc2VyaWFsaXplUGFyYW0oYXR0cmlidXRlWzFdKSA6ICcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYoc2VhcmNoU3RyaW5nIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBzZWFyY2hTdHJpbmcuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgICAgX3RoaXMuYXBwZW5kKHZhbHVlLCBuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xyXG5cclxuICAgIHByb3RvLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgIGlmKG5hbWUgaW4gdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0ucHVzaCh2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lbnRyaWVzW25hbWVdID0gW3ZhbHVlLnRvU3RyaW5nKCldO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmRlbGV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXVswXSA6IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXS5zbGljZSgwKSA6IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgdGhpcy5fZW50cmllc1tuYW1lXSA9IFt2YWx1ZS50b1N0cmluZygpXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgIHZhciBlbnRyaWVzO1xyXG4gICAgICBmb3IodmFyIG5hbWUgaW4gdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgIGlmKHRoaXMuX2VudHJpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgIGVudHJpZXMgPSB0aGlzLl9lbnRyaWVzW25hbWVdO1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBlbnRyaWVzW2ldLCBuYW1lLCB0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8ua2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSk7IH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by52YWx1ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKTsgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pOyB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYoaXRlcmF0b3JTdXBwb3J0ZWQpIHtcclxuICAgICAgcHJvdG9bU3ltYm9sLml0ZXJhdG9yXSA9IHByb3RvLmVudHJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlYXJjaFN0cmluZyA9ICcnO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBpZihzZWFyY2hTdHJpbmcubGVuZ3RoID4gMCkgc2VhcmNoU3RyaW5nKz0gJyYnO1xyXG4gICAgICAgIHNlYXJjaFN0cmluZyArPSBzZXJpYWxpemVQYXJhbShuYW1lKSArICc9JyArIHNlcmlhbGl6ZVBhcmFtKHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBzZWFyY2hTdHJpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIGdsb2JhbC5VUkxTZWFyY2hQYXJhbXMgPSBVUkxTZWFyY2hQYXJhbXM7XHJcbiAgfTtcclxuXHJcbiAgaWYoISgnVVJMU2VhcmNoUGFyYW1zJyBpbiBnbG9iYWwpIHx8IChuZXcgVVJMU2VhcmNoUGFyYW1zKCc/YT0xJykudG9TdHJpbmcoKSAhPT0gJ2E9MScpKSB7XHJcbiAgICBwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gSFRNTEFuY2hvckVsZW1lbnRcclxuXHJcbn0pKFxyXG4gICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgPyBnbG9iYWxcclxuICAgIDogKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3dcclxuICAgIDogKCh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IHRoaXMpKVxyXG4pO1xyXG5cclxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gIC8qKlxyXG4gICAqIFBvbHlmaWxsIFVSTFxyXG4gICAqXHJcbiAgICogSW5zcGlyZWQgZnJvbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcnYvRE9NLVVSTC1Qb2x5ZmlsbC9ibG9iL21hc3Rlci9zcmMvdXJsLmpzXHJcbiAgICovXHJcblxyXG4gIHZhciBjaGVja0lmVVJMSXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB1ID0gbmV3IFVSTCgnYicsICdodHRwOi8vYScpO1xyXG4gICAgICB1LnBhdGhuYW1lID0gJ2MlMjBkJztcclxuICAgICAgcmV0dXJuICh1LmhyZWYgPT09ICdodHRwOi8vYS9jJTIwZCcpICYmIHUuc2VhcmNoUGFyYW1zO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgdmFyIHBvbHlmaWxsVVJMID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX1VSTCA9IGdsb2JhbC5VUkw7XHJcblxyXG4gICAgdmFyIFVSTCA9IGZ1bmN0aW9uKHVybCwgYmFzZSkge1xyXG4gICAgICBpZih0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgdXJsID0gU3RyaW5nKHVybCk7XHJcblxyXG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcclxuICAgICAgd2luZG93LmRvYyA9IGRvYztcclxuICAgICAgaWYoYmFzZSkge1xyXG4gICAgICAgIHZhciBiYXNlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdiYXNlJyk7XHJcbiAgICAgICAgYmFzZUVsZW1lbnQuaHJlZiA9IGJhc2U7XHJcbiAgICAgICAgZG9jLmhlYWQuYXBwZW5kQ2hpbGQoYmFzZUVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYW5jaG9yRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIGFuY2hvckVsZW1lbnQuaHJlZiA9IHVybDtcclxuICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoYW5jaG9yRWxlbWVudCk7XHJcbiAgICAgIGFuY2hvckVsZW1lbnQuaHJlZiA9IGFuY2hvckVsZW1lbnQuaHJlZjsgLy8gZm9yY2UgaHJlZiB0byByZWZyZXNoXHJcblxyXG4gICAgICBpZihhbmNob3JFbGVtZW50LnByb3RvY29sID09PSAnOicgfHwgIS86Ly50ZXN0KGFuY2hvckVsZW1lbnQuaHJlZikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFVSTCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19hbmNob3JFbGVtZW50Jywge1xyXG4gICAgICAgIHZhbHVlOiBhbmNob3JFbGVtZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkwucHJvdG90eXBlO1xyXG5cclxuICAgIHZhciBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBhdHRyaWJ1dGVOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50W2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudFthdHRyaWJ1dGVOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgWydoYXNoJywgJ2hvc3QnLCAnaG9zdG5hbWUnLCAncG9ydCcsICdwcm90b2NvbCcsICdzZWFyY2gnXVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3RvLCB7XHJcblxyXG4gICAgICAndG9TdHJpbmcnOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ocmVmO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnaHJlZicgOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50LmhyZWYucmVwbGFjZSgvXFw/JC8sJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5ocmVmID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAncGF0aG5hbWUnIDoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5wYXRobmFtZS5yZXBsYWNlKC8oXlxcLz8pLywnLycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5wYXRobmFtZSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ29yaWdpbic6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5fYW5jaG9yRWxlbWVudC5ob3N0bmFtZSArICh0aGlzLl9hbmNob3JFbGVtZW50LnBvcnQgPyAoJzonICsgdGhpcy5fYW5jaG9yRWxlbWVudC5wb3J0KSA6ICcnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdwYXNzd29yZCc6IHsgLy8gVE9ET1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAndXNlcm5hbWUnOiB7IC8vIFRPRE9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3NlYXJjaFBhcmFtcyc6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy5zZWFyY2gpO1xyXG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgIFsnYXBwZW5kJywgJ2RlbGV0ZScsICdzZXQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHNlYXJjaFBhcmFtc1ttZXRob2ROYW1lXTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHNlYXJjaFBhcmFtcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICBfdGhpcy5zZWFyY2ggPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgVVJMLmNyZWF0ZU9iamVjdFVSTCA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICAgICAgcmV0dXJuIF9VUkwuY3JlYXRlT2JqZWN0VVJMLmFwcGx5KF9VUkwsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgcmV0dXJuIF9VUkwucmV2b2tlT2JqZWN0VVJMLmFwcGx5KF9VUkwsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdsb2JhbC5VUkwgPSBVUkw7XHJcblxyXG4gIH07XHJcblxyXG4gIGlmKCFjaGVja0lmVVJMSXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgcG9seWZpbGxVUkwoKTtcclxuICB9XHJcblxyXG4gIGlmKChnbG9iYWwubG9jYXRpb24gIT09IHZvaWQgMCkgJiYgISgnb3JpZ2luJyBpbiBnbG9iYWwubG9jYXRpb24pKSB7XHJcbiAgICB2YXIgZ2V0T3JpZ2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lICsgKGdsb2JhbC5sb2NhdGlvbi5wb3J0ID8gKCc6JyArIGdsb2JhbC5sb2NhdGlvbi5wb3J0KSA6ICcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbC5sb2NhdGlvbiwgJ29yaWdpbicsIHtcclxuICAgICAgICBnZXQ6IGdldE9yaWdpbixcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGdsb2JhbC5sb2NhdGlvbi5vcmlnaW4gPSBnZXRPcmlnaW4oKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59KShcclxuICAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpID8gZ2xvYmFsXHJcbiAgICA6ICgodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93XHJcbiAgICA6ICgodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSA/IHNlbGYgOiB0aGlzKSlcclxuKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdXJsLXBvbHlmaWxsL3VybC1wb2x5ZmlsbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEltcGxpY3RHcmFudCBmcm9tICcuL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50JztcblxuZXhwb3J0IHsgSW1wbGljdEdyYW50IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgUHJvdmlkZXIgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tICcuLi91dGlscy9iYXNlLXVybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltcGxpY2l0R3JhbnQgZXh0ZW5kcyBQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnJlZGlyZWN0X3VyaSA9IG9wdGlvbnMucmVkaXJlY3RfdXJpIHx8IGAke2Jhc2VVcmwoKX1vYXV0aC9jYWxsYmFja2A7XG4gICAgdGhpcy5yZXNwb25zZV90eXBlID0gb3B0aW9ucy5yZXNwb25zZV90eXBlIHx8ICd0b2tlbic7XG4gICAgdGhpcy5jbGllbnRfaWQgPSBvcHRpb25zLmNsaWVudF9pZCB8fCAnJztcbiAgICB0aGlzLnNjb3BlcyA9IG9wdGlvbnMuc2NvcGVzIHx8IG9wdGlvbnMuZGVmYXVsdF9zY29wZXMgfHwgW107XG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdF91cmksXG4gICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlX3R5cGUsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50X2lkLFxuICAgICAgc2NvcGVzOiB0aGlzLnNjb3BlcyxcbiAgICB9XG4gIH1cblxuICBvcGVuKG9wdGlvbnM9e30pIHtcbiAgICBsZXQgcG9wdXAgPSB0aGlzLnBvcHVwO1xuICAgIGxldCBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oeyBzdGF0ZTogcG9wdXAuc3RhdGUgfSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ2NsaWVudF9pZCcsIGRlZmF1bHRzLmNsaWVudF9pZCk7XG4gICAgcGFyYW1zLmFwcGVuZCgnc3RhdGUnLCBkZWZhdWx0cy5zdGF0ZSk7XG4gICAgcGFyYW1zLmFwcGVuZCgnb3JpZ2luJywgYmFzZVVybCgpLnNsaWNlKDAsIC0xKSk7XG4gICAgcGFyYW1zLmFwcGVuZCgncmVzcG9uc2VfdHlwZScsIGRlZmF1bHRzLnJlc3BvbnNlX3R5cGUpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3JlZGlyZWN0X3VyaScsIGRlZmF1bHRzLnJlZGlyZWN0X3VyaSk7XG4gICAgaWYoZGVmYXVsdHMuc2NvcGVzLmxlbmd0aCkge1xuICAgICAgcGFyYW1zLmFwcGVuZCgnc2NvcGUnLCBkZWZhdWx0cy5zY29wZXMuam9pbignICcpKTtcbiAgICB9XG4gICAgbGV0IHVybCA9IGAke3RoaXMuZG9tYWlufSR7dGhpcy5hdXRob3JpemVfcGF0aH0/JHtwYXJhbXMudG9TdHJpbmcoKX1gXG5cbiAgICBpZih0aGlzLmlkeERvbWFpbil7XG4gICAgICBsZXQgaWR4UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnJyk7XG4gICAgICBpZHhQYXJhbXMuYXBwZW5kKCdyZWRpcmVjdF91cmknLCB1cmwpO1xuICAgICAgdXJsID0gYCR7dGhpcy5pZHhEb21haW59JHt0aGlzLmF1dGhvcml6ZV9wYXRofT8ke2lkeFBhcmFtcy50b1N0cmluZygpfWBcbiAgICB9XG5cbiAgICByZXR1cm4gcG9wdXAub3BlbihPYmplY3QuYXNzaWduKHsgdXJsOiB1cmwgfSwgZGVmYXVsdHMpKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwiaW1wb3J0IHsgZ3VpZCB9ICBmcm9tICcuLi91dGlscy9ndWlkJztcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tICcuLi91dGlscy9iYXNlLXVybCc7XG5cbmNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgfVxuXG4gIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEgIT0gbnVsbDtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBzZXREYXRhKHZhbCkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWw7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIG9wZW4ob3B0aW9ucykge1xuICAgIGNvbnN0IHVybCA9IG9wdGlvbnMudXJsO1xuXG4gICAgY29uc3QgaGVpZ2h0ID0gNjAwO1xuICAgIGNvbnN0IHdpZHRoID0gNjAwO1xuXG4gICAgY29uc3QgeV9vZmZzZXQgPSB3aW5kb3cudG9wLm91dGVySGVpZ2h0IC8gMiArIHdpbmRvdy50b3Auc2NyZWVuWSAtICggaGVpZ2h0IC8gMik7XG4gICAgY29uc3QgeF9vZmZzZXQgPSB3aW5kb3cudG9wLm91dGVyV2lkdGggLyAyICsgd2luZG93LnRvcC5zY3JlZW5YIC0gKCB3aWR0aCAvIDIpO1xuXG4gICAgY29uc3Qgc3RyV2luZG93RmVhdHVyZXMgPSBgaGVpZ2h0PSR7aGVpZ2h0fSx3aWR0aD0ke3dpZHRofSx0b3A9JHt5X29mZnNldH0sbGVmdD0ke3hfb2Zmc2V0fWA7XG5cbiAgICB0aGlzLnNvdXJjZSA9IHdpbmRvdy5vcGVuKHVybCwgdGhpcy5zdGF0ZSwgc3RyV2luZG93RmVhdHVyZXMpO1xuXG4gICAgY29uc3QgcHJvbWlzZVdhdGNoUG9wdXAgPSBmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHBvcHVwID0gdGhpcztcbiAgICAgIGlmKHBvcHVwLmhhc0RhdGEoKSl7XG4gICAgICAgIHJlc29sdmUocG9wdXAuZ2V0RGF0YSgpKVxuICAgICAgICBpZih0aGlzLnNvdXJjZS5jbG9zZSkge1xuICAgICAgICAgIHRoaXMuc291cmNlLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNlIGlmKHBvcHVwLnNvdXJjZS5jbG9zZWQpe1xuICAgICAgICByZWplY3QocG9wdXAuc291cmNlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBwcm9taXNlV2F0Y2hQb3B1cChyZXNvbHZlLCByZWplY3QpXG4gICAgICAgIH0sIDEwMClcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB2YXIgcHJvdmlkZXIgPSB0aGlzO1xuXG4gICAgdGhpcy5kb21haW4gPSBjbGVhbkRvbWFpbihvcHRpb25zLmRvbWFpbik7XG4gICAgaWYob3B0aW9ucy5pZHhEb21haW4pe1xuICAgICAgdGhpcy5pZHhEb21haW4gPSBjbGVhbkRvbWFpbihvcHRpb25zLmlkeERvbWFpbik7XG4gICAgfVxuXG4gICAgdGhpcy5hdXRob3JpemVfcGF0aCA9IGNsZWFuUGF0aChvcHRpb25zLmF1dGhvcml6ZV9wYXRoIHx8ICcvb2F1dGgvYXV0aG9yaXplJyk7XG4gICAgdGhpcy5sb2dvdXRfcGF0aCA9IGNsZWFuUGF0aChvcHRpb25zLmxvZ291dF9wYXRoIHx8ICcvb2F1dGgvbG9nb3V0Lmh0bWwnKTtcblxuICAgIHRoaXMuYWxsb3dlZE9yaWdpbnMgPSBvcHRpb25zLmFsbG93ZWRPcmlnaW5zIHx8IFtiYXNlVXJsKCkuc2xpY2UoMCwtMSldO1xuICAgIHRoaXMuc2VjcmV0cyA9IHt9O1xuICAgIHRoaXMuX3N0YXRlID0gb3B0aW9ucy5zdGF0ZTtcblxuICAgIGlmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlcywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gd2luZG93LmF0dGFjaEV2ZW50KCdvbm1lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZXMoZXZlbnQpIHtcbiAgICAgIGxldCBzZWNyZXRzID0gcHJvdmlkZXIuc2VjcmV0cztcbiAgICAgIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBwcm92aWRlci5hbGxvd2VkT3JpZ2lucyA9PT0gJyonIHx8IChldmVudCAmJiAgcHJvdmlkZXIuYWxsb3dlZE9yaWdpbnMuaW5kZXhPZihldmVudC5vcmlnaW4pICE9PSAtMSk7XG4gICAgICBsZXQgc291cmNlTWF0Y2hlcyA9IHRydWU7XG4gICAgICBpZihldmVudCAmJiBldmVudC5zb3VyY2UpIHtcbiAgICAgICAgc291cmNlTWF0Y2hlcyA9IHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0gJiYgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UgPT0gZXZlbnQuc291cmNlO1xuICAgICAgfSBlbHNlIGlmIChldmVudCAmJiBldmVudC5kYXRhLnNvdXJjZSkge1xuICAgICAgICBzb3VyY2VNYXRjaGVzID0gc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXSAmJiBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZSA9PSBldmVudC5kYXRhLnNvdXJjZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvdXJjZU1hdGNoZXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmKG9yaWdpbk1hdGNoZXMgJiYgc291cmNlTWF0Y2hlcyl7XG4gICAgICAgIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc2V0RGF0YShldmVudC5kYXRhKTtcbiAgICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5oYXNEYXRhKGV2ZW50LmRhdGEpO1xuICAgICAgICBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFuUGF0aChwYXRoKSB7XG4gICAgICBpZihwYXRoLnN1YnN0cigtMSkgPT09ICcvJykge1xuICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgwLCAtMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbkRvbWFpbihkb21haW4pe1xuICAgICAgaWYoZG9tYWluKSB7XG4gICAgICAgIGlmKCFkb21haW4uc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICAgICAgbGV0IHVybE9iamVjdCA9IG5ldyBVUkwoYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHtkb21haW59YCk7XG4gICAgICAgICAgdXJsT2JqZWN0LnBhdGhuYW1lID0gJyc7XG4gICAgICAgICAgZG9tYWluID0gdXJsT2JqZWN0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9tYWluID0gY2xlYW5QYXRoKGRvbWFpbik7XG5cbiAgICAgICAgcmV0dXJuIGRvbWFpbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93ICdtaXNzaW5nIHJlcXVpcmVkIG9wdGlvbjogZG9tYWluJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgcG9wdXAoKSB7XG4gICAgY29uc3Qgc2VjcmV0ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcG9wdXAgPSBuZXcgUG9wdXAoe1xuICAgICAgc3RhdGU6IHNlY3JldCxcbiAgICB9KVxuICAgIHRoaXMuc2VjcmV0c1tzZWNyZXRdID0gcG9wdXA7XG4gICAgcmV0dXJuIHBvcHVwO1xuICB9XG5cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZSB8fCBndWlkKCk7XG4gIH1cblxuICBsb2dvdXQob3B0aW9ucz17fSkge1xuICAgIGxldCBwb3B1cCA9IHRoaXMucG9wdXA7XG4gICAgbGV0IGRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7IHN0YXRlOiBwb3B1cC5zdGF0ZSB9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCcnKTtcbiAgICBwYXJhbXMuYXBwZW5kKCdjbGllbnRfaWQnLCBkZWZhdWx0cy5jbGllbnRfaWQpO1xuICAgIHBhcmFtcy5hcHBlbmQoJ3N0YXRlJywgZGVmYXVsdHMuc3RhdGUpO1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLmRvbWFpbn0ke3RoaXMubG9nb3V0X3BhdGh9PyR7cGFyYW1zLnRvU3RyaW5nKCl9YFxuXG4gICAgaWYodGhpcy5pZHhEb21haW4pe1xuICAgICAgbGV0IGlkeFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycpO1xuICAgICAgaWR4UGFyYW1zLmFwcGVuZCgncmVkaXJlY3RfdXJpJywgdXJsKTtcbiAgICAgIHVybCA9IGAke3RoaXMuaWR4RG9tYWlufSR7dGhpcy5sb2dvdXRfcGF0aH0/JHtpZHhQYXJhbXMudG9TdHJpbmcoKX1gXG4gICAgfVxuXG4gICAgcmV0dXJuIHBvcHVwLm9wZW4oT2JqZWN0LmFzc2lnbih7IHVybDogdXJsIH0sIGRlZmF1bHRzKSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBndWlkKCkge1xuICBmdW5jdGlvbiBzNCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAudG9TdHJpbmcoMTYpXG4gICAgLnN1YnN0cmluZygxKTtcbiAgfVxuICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2d1aWQuanMiXSwic291cmNlUm9vdCI6IiJ9