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
    _this.client_id = options.client_id || '';
    return _this;
  }

  _createClass(ImplicitGrant, [{
    key: 'open',
    value: function open() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var defaults = Object.assign(this.defaults, options);
      var url = this.domain + '?client_id=' + defaults.client_id + '&state=' + defaults.state + '&origin=' + baseUrl() + '&response_type=' + defaults.response_type + '&redirect_uri=' + defaults.redirect_uri;
      return this.popup.open(Object.assign({ url: url }, defaults)).then(function (result) {
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
        state: this.state
      };
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

    this.state = options.state;
    this._data = null;
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
    this.secrets = {};
    this._state = options.state;

    if (window.addEventListener) {
      this.listener = window.addEventListener('message', handleMessages, false);
    } else {
      this.listener = window.attachEvent('onmessage', handleMessages);
    }

    function handleMessages(event) {
      var secrets = provider.secrets;
      var originMatches = !provider.domain || event && event.origin == provider.domain;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1Y2VmYjFiMTM5ODFkNjUxZDFmMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJuYW1lcyI6WyJJbXBsaWN0R3JhbnQiLCJiYXNlVXJsIiwicGFydHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInVybCIsImpvaW4iLCJzdWJzdHIiLCJJbXBsaWNpdEdyYW50Iiwib3B0aW9ucyIsInJlZGlyZWN0X3VyaSIsInJlc3BvbnNlX3R5cGUiLCJjbGllbnRfaWQiLCJkZWZhdWx0cyIsIk9iamVjdCIsImFzc2lnbiIsImRvbWFpbiIsInN0YXRlIiwicG9wdXAiLCJvcGVuIiwidGhlbiIsInJlc3VsdCIsIlBvcHVwIiwiX2RhdGEiLCJ2YWwiLCJzb3VyY2UiLCJwcm9taXNlV2F0Y2hQb3B1cCIsInJlc29sdmUiLCJyZWplY3QiLCJoYXNEYXRhIiwiZ2V0RGF0YSIsImNsb3NlZCIsInNldFRpbWVvdXQiLCJiaW5kIiwiUHJvbWlzZSIsIkJhc2UiLCJwcm92aWRlciIsInNlY3JldHMiLCJfc3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwibGlzdGVuZXIiLCJoYW5kbGVNZXNzYWdlcyIsImF0dGFjaEV2ZW50IiwiZXZlbnQiLCJvcmlnaW5NYXRjaGVzIiwib3JpZ2luIiwic291cmNlTWF0Y2hlcyIsImRhdGEiLCJzZXREYXRhIiwiY2xvc2UiLCJzZWNyZXQiLCJndWlkIiwiczQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyJdLCJtYXBwaW5ncyI6IkFB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LE1BQUwsSUFBZSxpQkFBdEI7QUFDRDs7Ozs7O2tCQXpDa0JILEk7Ozs7Ozs7Ozs7OztRQzdDTGdCLEksR0FBQUEsSTtBQUFULFNBQVNBLElBQVQsR0FBZ0I7QUFDckIsV0FBU0MsRUFBVCxHQUFjO0FBQ1osV0FBT0MsS0FBS0MsS0FBTCxDQUFXLENBQUMsSUFBSUQsS0FBS0UsTUFBTCxFQUFMLElBQXNCLE9BQWpDLEVBQ05DLFFBRE0sQ0FDRyxFQURILEVBRU5DLFNBRk0sQ0FFSSxDQUZKLENBQVA7QUFHRDtBQUNELFNBQU9MLE9BQU9BLElBQVAsR0FBYyxHQUFkLEdBQW9CQSxJQUFwQixHQUEyQixHQUEzQixHQUFpQ0EsSUFBakMsR0FBd0MsR0FBeEMsR0FDTEEsSUFESyxHQUNFLEdBREYsR0FDUUEsSUFEUixHQUNlQSxJQURmLEdBQ3NCQSxJQUQ3QjtBQUVELEMiLCJmaWxlIjoic2F2dnktc2lnbi1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNhdnZ5U2lnbk9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1Y2VmYjFiMTM5ODFkNjUxZDFmMCIsImltcG9ydCBJbXBsaWN0R3JhbnQgZnJvbSAnLi9wcm92aWRlcnMvaW1wbGljdC1ncmFudCc7XG5cbmV4cG9ydCB7IEltcGxpY3RHcmFudCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IFByb3ZpZGVyIGZyb20gJy4vYmFzZSc7XG5cbmZ1bmN0aW9uIGJhc2VVcmwoKSB7XG4gIGxldCBwYXJ0cyA9IFtcbiAgICB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsIFxuICAgICcvLycsXG4gICAgd2luZG93LmxvY2F0aW9uLmhvc3RcbiAgXTtcbiAgbGV0IHVybCA9IHBhcnRzLmpvaW4oJycpO1xuICBpZiAodXJsLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHVybCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltcGxpY2l0R3JhbnQgZXh0ZW5kcyBQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnJlZGlyZWN0X3VyaSA9IG9wdGlvbnMucmVkaXJlY3RfdXJpIHx8IGAke2Jhc2VVcmwoKX1vYXV0aC9jYWxsYmFja2BcbiAgICB0aGlzLnJlc3BvbnNlX3R5cGUgPSBvcHRpb25zLnJlc3BvbnNlX3R5cGUgfHwgJ3Rva2VuJ1xuICAgIHRoaXMuY2xpZW50X2lkID0gb3B0aW9ucy5jbGllbnRfaWQgfHwgJyc7XG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdF91cmksXG4gICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlX3R5cGUsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50X2lkLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVcbiAgICB9XG4gIH1cblxuICBvcGVuKG9wdGlvbnM9e30pIHtcbiAgICBsZXQgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHVybCA9IGAke3RoaXMuZG9tYWlufT9jbGllbnRfaWQ9JHtkZWZhdWx0cy5jbGllbnRfaWR9JnN0YXRlPSR7ZGVmYXVsdHMuc3RhdGV9Jm9yaWdpbj0ke2Jhc2VVcmwoKX0mcmVzcG9uc2VfdHlwZT0ke2RlZmF1bHRzLnJlc3BvbnNlX3R5cGV9JnJlZGlyZWN0X3VyaT0ke2RlZmF1bHRzLnJlZGlyZWN0X3VyaX1gXG4gICAgcmV0dXJuIHRoaXMucG9wdXAub3BlbihPYmplY3QuYXNzaWduKHsgdXJsOiB1cmwgfSwgZGVmYXVsdHMpKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwiaW1wb3J0IHsgZ3VpZCB9ICBmcm9tICcuLi91dGlscy9ndWlkJztcblxuY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5zdGF0ZSA9IG9wdGlvbnMuc3RhdGU7XG4gICAgdGhpcy5fZGF0YSA9IG51bGw7XG4gIH1cblxuICBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhICE9IG51bGw7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgc2V0RGF0YSh2YWwpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsO1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBvcGVuKG9wdGlvbnMpIHtcbiAgICBjb25zdCB1cmwgPSBvcHRpb25zLnVybDtcblxuICAgIHRoaXMuc291cmNlID0gd2luZG93Lm9wZW4odXJsLCB0aGlzLnN0YXRlLCAnaGVpZ2h0PTYwMCx3aWR0aD02MDAnKTtcblxuICAgIGNvbnN0IHByb21pc2VXYXRjaFBvcHVwID0gZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIGxldCBwb3B1cCA9IHRoaXM7XG4gICAgICBpZihwb3B1cC5oYXNEYXRhKCkpe1xuICAgICAgICByZXNvbHZlKHBvcHVwLmdldERhdGEoKSlcbiAgICAgIH1lbHNlIGlmKHBvcHVwLnNvdXJjZS5jbG9zZWQpe1xuICAgICAgICByZWplY3QocG9wdXAuc291cmNlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBwcm9taXNlV2F0Y2hQb3B1cChyZXNvbHZlLCByZWplY3QpXG4gICAgICAgIH0sIDEwMClcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB2YXIgcHJvdmlkZXIgPSB0aGlzO1xuICAgIHRoaXMuZG9tYWluID0gb3B0aW9ucy5kb21haW47XG4gICAgdGhpcy5zZWNyZXRzID0ge307XG4gICAgdGhpcy5fc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuXG4gICAgaWYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ubWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlcyhldmVudCkge1xuICAgICAgbGV0IHNlY3JldHMgPSBwcm92aWRlci5zZWNyZXRzO1xuICAgICAgY29uc3Qgb3JpZ2luTWF0Y2hlcyA9ICFwcm92aWRlci5kb21haW4gfHwgKGV2ZW50ICYmICBldmVudC5vcmlnaW4gPT0gcHJvdmlkZXIuZG9tYWluKTtcbiAgICAgIGxldCBzb3VyY2VNYXRjaGVzID0gdHJ1ZTtcbiAgICAgIGlmKGV2ZW50ICYmIGV2ZW50LnNvdXJjZSkge1xuICAgICAgICBzb3VyY2VNYXRjaGVzID0gc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXSAmJiBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNvdXJjZSA9PSBldmVudC5zb3VyY2U7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGEuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZU1hdGNoZXMgPSBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdICYmIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc291cmNlID09IGV2ZW50LmRhdGEuc291cmNlO1xuICAgICAgfVxuICAgICAgaWYob3JpZ2luTWF0Y2hlcyAmJiBzb3VyY2VNYXRjaGVzKXtcbiAgICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zZXREYXRhKGV2ZW50LmRhdGEpO1xuICAgICAgICBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLmhhc0RhdGEoZXZlbnQuZGF0YSk7XG4gICAgICAgIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc291cmNlLmNsb3NlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgcG9wdXAoKSB7XG4gICAgY29uc3Qgc2VjcmV0ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgcG9wdXAgPSBuZXcgUG9wdXAoe1xuICAgICAgc3RhdGU6IHNlY3JldCxcbiAgICB9KVxuICAgIHRoaXMuc2VjcmV0c1tzZWNyZXRdID0gcG9wdXA7XG4gICAgcmV0dXJuIHBvcHVwO1xuICB9XG5cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZSB8fCBndWlkKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9iYXNlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGd1aWQoKSB7XG4gIGZ1bmN0aW9uIHM0KCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgIC50b1N0cmluZygxNilcbiAgICAuc3Vic3RyaW5nKDEpO1xuICB9XG4gIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvZ3VpZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=