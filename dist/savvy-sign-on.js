(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SavvySignOn"] = factory();
	else
		root["SavvySignOn"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImplictGrant = undefined;

var _implictGrant = __webpack_require__(1);

var _implictGrant2 = _interopRequireDefault(_implictGrant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ImplictGrant = _implictGrant2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(2);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function baseUrl() {
  var parts = [window.location.protocol, '//', window.location.host];
  var url = parts.join('');
  if (url.substr(-1) !== '/') {
    url += '/';
  }

  return url;
}

var ImplicitGrant = function (_Provider) {
  _inherits(ImplicitGrant, _Provider);

  function ImplicitGrant(options) {
    _classCallCheck(this, ImplicitGrant);

    var _this = _possibleConstructorReturn(this, (ImplicitGrant.__proto__ || Object.getPrototypeOf(ImplicitGrant)).call(this, options));

    _this.redirect_uri = options.redirect_uri || baseUrl() + 'oauth/callback';
    _this.response_type = options.response_type || 'token';
    _this.client_id = options.client_id;
    _this.state = options.state;
    return _this;
  }

  _createClass(ImplicitGrant, [{
    key: 'open',
    value: function open(options) {
      var random = this.state;
      var popup = this.popup;
      secrets[random] = this.popup;
      return popup.open().then(function (result) {
        return result;
      });
    }
  }]);

  return ImplicitGrant;
}(_base2.default);

exports.default = ImplicitGrant;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popup = function () {
  function Popup(options) {
    _classCallCheck(this, Popup);

    this.baseUrl = options.baseUrl;
    this.state = options.state;
    this.data = null;
  }

  _createClass(Popup, [{
    key: 'open',
    value: function open(options) {
      this.redirectUri = options.redirectUri;
      this.clientId = options.clientId;
      var fullUrl = options.fullUrl;
      this.source = window.open(fullUrl, this.state, 'height=600,width=600');
      var promiseWatchPopup = function promiseWatchPopup(resolve, reject) {
        if (this.data) {
          resolve(this.data);
        } else if (this.source.closed) {
          reject(this.source);
        } else {
          setTimeout(function () {
            promiseWatchPopup(resolve, reject);
          }, 100);
        }
      };
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

    this.provider = options.provider;
    this.clientUrl = options.clientUrl;
    this.secrets = {};
    if (window.addEventListener) {
      this.listener = window.addEventListener('message', this.handleMessages, false);
    } else {
      this.listener = window.attachEvent('onmessage', this.handleMessages);
    }
  }

  _createClass(Base, [{
    key: 'handleMessages',
    value: function handleMessages(event) {
      console.log("EVENT RECIEVED", event.data);
      var secrets = this.secrets;
      var originMatches = event && event.origin == domain;
      var sourceMatches = event && event.data.state && secrets[event.data.state] && secrets[event.data.state].source == event.source;
      if (originMatches && sourceMatches) {
        secrets[event.data.state].data = event.data;
        secrets[event.data.state].source.close();
      }
    }
  }, {
    key: 'popup',
    get: function get() {
      var secret = this.state;
      var popup = new Popup({
        state: secret,
        baseUrl: this.clientUrl
      });
      this.secrets[secret] = popup;
      return popup;
    }
  }, {
    key: 'state',
    get: function get() {
      return this.state || (0, _guid.guid)();
    }
  }]);

  return Base;
}();

exports.default = Base;

/***/ }),
/* 3 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4M2RjYTIwODE4MDcyOGQzZDhiMiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJuYW1lcyI6WyJJbXBsaWN0R3JhbnQiLCJiYXNlVXJsIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInVybCIsImpvaW4iLCJzdWJzdHIiLCJJbXBsaWNpdEdyYW50Iiwib3B0aW9ucyIsInJlZGlyZWN0X3VyaSIsInJlc3BvbnNlX3R5cGUiLCJjbGllbnRfaWQiLCJzdGF0ZSIsInJhbmRvbSIsInBvcHVwIiwic2VjcmV0cyIsIm9wZW4iLCJ0aGVuIiwicmVzdWx0IiwiUG9wdXAiLCJkYXRhIiwicmVkaXJlY3RVcmkiLCJjbGllbnRJZCIsImZ1bGxVcmwiLCJzb3VyY2UiLCJwcm9taXNlV2F0Y2hQb3B1cCIsInJlc29sdmUiLCJyZWplY3QiLCJjbG9zZWQiLCJzZXRUaW1lb3V0IiwiUHJvbWlzZSIsIkJhc2UiLCJwcm92aWRlciIsImNsaWVudFVybCIsImFkZEV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsImhhbmRsZU1lc3NhZ2VzIiwiYXR0YWNoRXZlbnQiLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJvcmlnaW5NYXRjaGVzIiwib3JpZ2luIiwiZG9tYWluIiwic291cmNlTWF0Y2hlcyIsImNsb3NlIiwic2VjcmV0IiwiZ3VpZCIsInM0IiwiTWF0aCIsImZsb29yIiwidG9TdHJpbmciLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QWlDcUIsS0FBakM7QUFDRDtBQUNGOzs7d0JBdkJXO0FBQ1YsVUFBTUMsU0FBUyxLQUFLbEMsS0FBcEI7QUFDQSxVQUFJRSxRQUFRLElBQUlLLEtBQUosQ0FBVTtBQUNwQlAsZUFBT2tDLE1BRGE7QUFFcEJoRCxpQkFBUyxLQUFLbUM7QUFGTSxPQUFWLENBQVo7QUFJQSxXQUFLbEIsT0FBTCxDQUFhK0IsTUFBYixJQUF1QmhDLEtBQXZCO0FBQ0EsYUFBT0EsS0FBUDtBQUNEOzs7d0JBRVc7QUFDVixhQUFPLEtBQUtGLEtBQUwsSUFBYyxpQkFBckI7QUFDRDs7Ozs7O2tCQXhCa0JtQixJOzs7Ozs7Ozs7Ozs7UUNoQ0xnQixJLEdBQUFBLEk7QUFBVCxTQUFTQSxJQUFULEdBQWdCO0FBQ3JCLFdBQVNDLEVBQVQsR0FBYztBQUNaLFdBQU9DLEtBQUtDLEtBQUwsQ0FBVyxDQUFDLElBQUlELEtBQUtwQyxNQUFMLEVBQUwsSUFBc0IsT0FBakMsRUFDTnNDLFFBRE0sQ0FDRyxFQURILEVBRU5DLFNBRk0sQ0FFSSxDQUZKLENBQVA7QUFHRDtBQUNELFNBQU9KLE9BQU9BLElBQVAsR0FBYyxHQUFkLEdBQW9CQSxJQUFwQixHQUEyQixHQUEzQixHQUFpQ0EsSUFBakMsR0FBd0MsR0FBeEMsR0FDTEEsSUFESyxHQUNFLEdBREYsR0FDUUEsSUFEUixHQUNlQSxJQURmLEdBQ3NCQSxJQUQ3QjtBQUVELEMiLCJmaWxlIjoic2F2dnktc2lnbi1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgzZGNhMjA4MTgwNzI4ZDNkOGIyIiwiaW1wb3J0IEltcGxpY3RHcmFudCBmcm9tICcuL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50JztcblxuZXhwb3J0IHsgSW1wbGljdEdyYW50IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgUHJvdmlkZXIgZnJvbSAnLi9iYXNlJztcblxuZnVuY3Rpb24gYmFzZVVybCgpIHtcbiAgbGV0IHBhcnRzID0gW1xuICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCwgXG4gICAgJy8vJyxcbiAgICB3aW5kb3cubG9jYXRpb24uaG9zdFxuICBdO1xuICBsZXQgdXJsID0gcGFydHMuam9pbignJyk7XG4gIGlmICh1cmwuc3Vic3RyKC0xKSAhPT0gJy8nKSB7XG4gICAgdXJsICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1wbGljaXRHcmFudCBleHRlbmRzIFByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucmVkaXJlY3RfdXJpID0gb3B0aW9ucy5yZWRpcmVjdF91cmkgfHwgYCR7YmFzZVVybCgpfW9hdXRoL2NhbGxiYWNrYFxuICAgIHRoaXMucmVzcG9uc2VfdHlwZSA9IG9wdGlvbnMucmVzcG9uc2VfdHlwZSB8fCAndG9rZW4nXG4gICAgdGhpcy5jbGllbnRfaWQgPSBvcHRpb25zLmNsaWVudF9pZDtcbiAgICB0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZTtcbiAgfVxuXG4gIG9wZW4ob3B0aW9ucykge1xuICAgIGNvbnN0IHJhbmRvbSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcG9wdXAgPSB0aGlzLnBvcHVwO1xuICAgIHNlY3JldHNbcmFuZG9tXSA9IHRoaXMucG9wdXA7XG4gICAgcmV0dXJuIHBvcHVwLm9wZW4oKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwiaW1wb3J0IHsgZ3VpZCB9ICBmcm9tICcuLi91dGlscy9ndWlkJztcblxuY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xuICAgIHRoaXMuc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gIH1cblxuICBvcGVuKG9wdGlvbnMpIHtcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gb3B0aW9ucy5yZWRpcmVjdFVyaTtcbiAgICB0aGlzLmNsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZDtcbiAgICBjb25zdCBmdWxsVXJsID0gb3B0aW9ucy5mdWxsVXJsO1xuICAgIHRoaXMuc291cmNlID0gd2luZG93Lm9wZW4oZnVsbFVybCwgdGhpcy5zdGF0ZSwgJ2hlaWdodD02MDAsd2lkdGg9NjAwJyk7XG4gICAgY29uc3QgcHJvbWlzZVdhdGNoUG9wdXAgPSBmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgaWYodGhpcy5kYXRhKXtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmRhdGEpXG4gICAgICB9ZWxzZSBpZih0aGlzLnNvdXJjZS5jbG9zZWQpe1xuICAgICAgICByZWplY3QodGhpcy5zb3VyY2UpXG4gICAgICB9ZWxzZXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIHByb21pc2VXYXRjaFBvcHVwKHJlc29sdmUsIHJlamVjdClcbiAgICAgICAgfSwgMTAwKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gb3B0aW9ucy5wcm92aWRlcjtcbiAgICB0aGlzLmNsaWVudFVybCA9IG9wdGlvbnMuY2xpZW50VXJsO1xuICAgIHRoaXMuc2VjcmV0cyA9IHt9O1xuICAgIGlmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmhhbmRsZU1lc3NhZ2VzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ubWVzc2FnZScsIHRoaXMuaGFuZGxlTWVzc2FnZXMpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwb3B1cCgpIHtcbiAgICBjb25zdCBzZWNyZXQgPSB0aGlzLnN0YXRlO1xuICAgIGxldCBwb3B1cCA9IG5ldyBQb3B1cCh7XG4gICAgICBzdGF0ZTogc2VjcmV0LFxuICAgICAgYmFzZVVybDogdGhpcy5jbGllbnRVcmxcbiAgICB9KVxuICAgIHRoaXMuc2VjcmV0c1tzZWNyZXRdID0gcG9wdXA7XG4gICAgcmV0dXJuIHBvcHVwO1xuICB9XG5cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlIHx8IGd1aWQoKTtcbiAgfVxuXG4gIGhhbmRsZU1lc3NhZ2VzKGV2ZW50KXtcbiAgICBjb25zb2xlLmxvZyhcIkVWRU5UIFJFQ0lFVkVEXCIsIGV2ZW50LmRhdGEpO1xuICAgIGxldCBzZWNyZXRzID0gdGhpcy5zZWNyZXRzO1xuICAgIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBldmVudCAmJiBldmVudC5vcmlnaW4gPT0gZG9tYWluXG4gICAgY29uc3Qgc291cmNlTWF0Y2hlcyA9IGV2ZW50ICYmIGV2ZW50LmRhdGEuc3RhdGUgJiYgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXSAmJiBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZSA9PSBldmVudC5zb3VyY2VcbiAgICBpZihvcmlnaW5NYXRjaGVzICYmIHNvdXJjZU1hdGNoZXMpe1xuICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5kYXRhID0gZXZlbnQuZGF0YVxuICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UuY2xvc2UoKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9iYXNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGd1aWQoKSB7XG4gIGZ1bmN0aW9uIHM0KCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgIC50b1N0cmluZygxNilcbiAgICAuc3Vic3RyaW5nKDEpO1xuICB9XG4gIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=