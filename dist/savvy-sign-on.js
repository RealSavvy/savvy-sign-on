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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImplictGrant = undefined;

var _implictGrant = __webpack_require__(2);

var _implictGrant2 = _interopRequireDefault(_implictGrant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ImplictGrant = _implictGrant2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(3);

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
    return _this;
  }

  _createClass(ImplicitGrant, [{
    key: 'open',
    value: function open() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var popup = this.popup;
      var defaults = Object.assign({ state: popup.state }, this.defaults, options);
      var url = this.domain + '?client_id=' + defaults.client_id + '&state=' + defaults.state + '&origin=' + (0, _baseUrl.baseUrl)() + '&response_type=' + defaults.response_type + '&redirect_uri=' + defaults.redirect_uri;
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
        client_id: this.client_id
      };
    }
  }]);

  return ImplicitGrant;
}(_base2.default);

exports.default = ImplicitGrant;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _guid = __webpack_require__(4);

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
/* 4 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZTgxNGVhOTdjMTVlYjBlZTZmOCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvaW1wbGljdC1ncmFudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2d1aWQuanMiXSwibmFtZXMiOlsiYmFzZVVybCIsInBhcnRzIiwid2luZG93IiwibG9jYXRpb24iLCJwcm90b2NvbCIsImhvc3QiLCJ1cmwiLCJqb2luIiwic3Vic3RyIiwiSW1wbGljdEdyYW50IiwiSW1wbGljaXRHcmFudCIsIm9wdGlvbnMiLCJyZWRpcmVjdF91cmkiLCJyZXNwb25zZV90eXBlIiwiY2xpZW50X2lkIiwicG9wdXAiLCJkZWZhdWx0cyIsIk9iamVjdCIsImFzc2lnbiIsInN0YXRlIiwiZG9tYWluIiwib3BlbiIsInRoZW4iLCJyZXN1bHQiLCJQb3B1cCIsIl9kYXRhIiwic291cmNlIiwidmFsIiwicHJvbWlzZVdhdGNoUG9wdXAiLCJyZXNvbHZlIiwicmVqZWN0IiwiaGFzRGF0YSIsImdldERhdGEiLCJjbG9zZSIsImNsb3NlZCIsInNldFRpbWVvdXQiLCJiaW5kIiwiUHJvbWlzZSIsIkJhc2UiLCJwcm92aWRlciIsImFsbG93ZWRPcmlnaW5zIiwic2xpY2UiLCJzZWNyZXRzIiwiX3N0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVyIiwiaGFuZGxlTWVzc2FnZXMiLCJhdHRhY2hFdmVudCIsImV2ZW50Iiwib3JpZ2luTWF0Y2hlcyIsImluZGV4T2YiLCJvcmlnaW4iLCJzb3VyY2VNYXRjaGVzIiwiZGF0YSIsInNldERhdGEiLCJzZWNyZXQiLCJndWlkIiwiczQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztRQzdEZ0JBLE8sR0FBQUEsTztBQUFULFNBQVNBLE9BQVQsR0FBbUI7QUFDeEIsTUFBSUMsUUFBUSxDQUNWQyxPQUFPQyxRQUFQLENBQWdCQyxRQUROLEVBRVYsSUFGVSxFQUdWRixPQUFPQyxRQUFQLENBQWdCRSxJQUhOLENBQVo7QUFLQSxNQUFJQyxNQUFNTCxNQUFNTSxJQUFOLENBQVcsRUFBWCxDQUFWO0FBQ0EsTUFBSUQsSUFBSUUsTUFBSixDQUFXLENBQUMsQ0FBWixNQUFtQixHQUF2QixFQUE0QjtBQUMxQkYsV0FBTyxHQUFQO0FBQ0Q7O0FBRUQsU0FBT0EsR0FBUDtBQUNELEM7Ozs7Ozs7Ozs7Ozs7O0FDWkQ7Ozs7OztRQUVTRyxZOzs7Ozs7Ozs7Ozs7Ozs7QUNGVDs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQyxhOzs7QUFDbkIseUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQSw4SEFDYkEsT0FEYTs7QUFFbkIsVUFBS0MsWUFBTCxHQUFvQkQsUUFBUUMsWUFBUixJQUEyQix1QkFB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LEtBQW5CLEVBQTBCbUMsT0FBMUIsQ0FBa0NOLE1BQU1LLElBQXhDO0FBQ0FYLGdCQUFRTSxNQUFNSyxJQUFOLENBQVdsQyxLQUFuQixFQUEwQlksT0FBMUIsQ0FBa0NpQixNQUFNSyxJQUF4QztBQUNBWCxnQkFBUU0sTUFBTUssSUFBTixDQUFXbEMsS0FBbkIsRUFBMEJPLE1BQTFCLENBQWlDTyxLQUFqQztBQUNEO0FBQ0Y7QUFDRjs7Ozt3QkFFVztBQUNWLFVBQU1zQixTQUFTLEtBQUtwQyxLQUFwQjtBQUNBLFVBQUlKLFFBQVEsSUFBSVMsS0FBSixDQUFVO0FBQ3BCTCxlQUFPb0M7QUFEYSxPQUFWLENBQVo7QUFHQSxXQUFLYixPQUFMLENBQWFhLE1BQWIsSUFBdUJ4QyxLQUF2QjtBQUNBLGFBQU9BLEtBQVA7QUFDRDs7O3dCQUVXO0FBQ1YsYUFBTyxLQUFLNEIsTUFBTCxJQUFlLGlCQUF0QjtBQUNEOzs7Ozs7a0JBMUNrQkwsSTs7Ozs7Ozs7Ozs7O1FDbERMa0IsSSxHQUFBQSxJO0FBQVQsU0FBU0EsSUFBVCxHQUFnQjtBQUNyQixXQUFTQyxFQUFULEdBQWM7QUFDWixXQUFPQyxLQUFLQyxLQUFMLENBQVcsQ0FBQyxJQUFJRCxLQUFLRSxNQUFMLEVBQUwsSUFBc0IsT0FBakMsRUFDTkMsUUFETSxDQUNHLEVBREgsRUFFTkMsU0FGTSxDQUVJLENBRkosQ0FBUDtBQUdEO0FBQ0QsU0FBT0wsT0FBT0EsSUFBUCxHQUFjLEdBQWQsR0FBb0JBLElBQXBCLEdBQTJCLEdBQTNCLEdBQWlDQSxJQUFqQyxHQUF3QyxHQUF4QyxHQUNMQSxJQURLLEdBQ0UsR0FERixHQUNRQSxJQURSLEdBQ2VBLElBRGYsR0FDc0JBLElBRDdCO0FBRUQsQyIsImZpbGUiOiJzYXZ2eS1zaWduLW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2F2dnlTaWduT25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2F2dnlTaWduT25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZlODE0ZWE5N2MxNWViMGVlNmY4IiwiZXhwb3J0IGZ1bmN0aW9uIGJhc2VVcmwoKSB7XG4gIGxldCBwYXJ0cyA9IFtcbiAgICB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsIFxuICAgICcvLycsXG4gICAgd2luZG93LmxvY2F0aW9uLmhvc3RcbiAgXTtcbiAgbGV0IHVybCA9IHBhcnRzLmpvaW4oJycpO1xuICBpZiAodXJsLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHVybCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvYmFzZS11cmwuanMiLCJpbXBvcnQgSW1wbGljdEdyYW50IGZyb20gJy4vcHJvdmlkZXJzL2ltcGxpY3QtZ3JhbnQnO1xuXG5leHBvcnQgeyBJbXBsaWN0R3JhbnQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBQcm92aWRlciBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgYmFzZVVybCB9IGZyb20gJy4uL3V0aWxzL2Jhc2UtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1wbGljaXRHcmFudCBleHRlbmRzIFByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMucmVkaXJlY3RfdXJpID0gb3B0aW9ucy5yZWRpcmVjdF91cmkgfHwgYCR7YmFzZVVybCgpfW9hdXRoL2NhbGxiYWNrYFxuICAgIHRoaXMucmVzcG9uc2VfdHlwZSA9IG9wdGlvbnMucmVzcG9uc2VfdHlwZSB8fCAndG9rZW4nXG4gICAgdGhpcy5jbGllbnRfaWQgPSBvcHRpb25zLmNsaWVudF9pZCB8fCAnJztcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0X3VyaSxcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VfdHlwZSxcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRfaWRcbiAgICB9XG4gIH1cblxuICBvcGVuKG9wdGlvbnM9e30pIHtcbiAgICBsZXQgcG9wdXAgPSB0aGlzLnBvcHVwO1xuICAgIGxldCBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oeyBzdGF0ZTogcG9wdXAuc3RhdGUgfSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy5kb21haW59P2NsaWVudF9pZD0ke2RlZmF1bHRzLmNsaWVudF9pZH0mc3RhdGU9JHtkZWZhdWx0cy5zdGF0ZX0mb3JpZ2luPSR7YmFzZVVybCgpfSZyZXNwb25zZV90eXBlPSR7ZGVmYXVsdHMucmVzcG9uc2VfdHlwZX0mcmVkaXJlY3RfdXJpPSR7ZGVmYXVsdHMucmVkaXJlY3RfdXJpfWBcbiAgICByZXR1cm4gcG9wdXAub3BlbihPYmplY3QuYXNzaWduKHsgdXJsOiB1cmwgfSwgZGVmYXVsdHMpKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Byb3ZpZGVycy9pbXBsaWN0LWdyYW50LmpzIiwiaW1wb3J0IHsgZ3VpZCB9ICBmcm9tICcuLi91dGlscy9ndWlkJztcbmltcG9ydCB7IGJhc2VVcmwgfSBmcm9tICcuLi91dGlscy9iYXNlLXVybCc7XG5cbmNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgfVxuXG4gIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEgIT0gbnVsbDtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBzZXREYXRhKHZhbCkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWw7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIG9wZW4ob3B0aW9ucykge1xuICAgIGNvbnN0IHVybCA9IG9wdGlvbnMudXJsO1xuXG4gICAgdGhpcy5zb3VyY2UgPSB3aW5kb3cub3Blbih1cmwsIHRoaXMuc3RhdGUsICdoZWlnaHQ9NjAwLHdpZHRoPTYwMCcpO1xuXG4gICAgY29uc3QgcHJvbWlzZVdhdGNoUG9wdXAgPSBmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHBvcHVwID0gdGhpcztcbiAgICAgIGlmKHBvcHVwLmhhc0RhdGEoKSl7XG4gICAgICAgIHJlc29sdmUocG9wdXAuZ2V0RGF0YSgpKVxuICAgICAgICBpZih0aGlzLnNvdXJjZS5jbG9zZSkge1xuICAgICAgICAgIHRoaXMuc291cmNlLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1lbHNlIGlmKHBvcHVwLnNvdXJjZS5jbG9zZWQpe1xuICAgICAgICByZWplY3QocG9wdXAuc291cmNlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBwcm9taXNlV2F0Y2hQb3B1cChyZXNvbHZlLCByZWplY3QpXG4gICAgICAgIH0sIDEwMClcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJvbWlzZVdhdGNoUG9wdXAocmVzb2x2ZSwgcmVqZWN0KVxuICAgIH0pO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB2YXIgcHJvdmlkZXIgPSB0aGlzO1xuICAgIHRoaXMuZG9tYWluID0gb3B0aW9ucy5kb21haW47XG4gICAgdGhpcy5hbGxvd2VkT3JpZ2lucyA9IG9wdGlvbnMuYWxsb3dlZE9yaWdpbnMgfHwgW2Jhc2VVcmwoKS5zbGljZSgwLC0xKV1cbiAgICB0aGlzLnNlY3JldHMgPSB7fTtcbiAgICB0aGlzLl9zdGF0ZSA9IG9wdGlvbnMuc3RhdGU7XG5cbiAgICBpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5lciA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZXMsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5lciA9IHdpbmRvdy5hdHRhY2hFdmVudCgnb25tZXNzYWdlJywgaGFuZGxlTWVzc2FnZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VzKGV2ZW50KSB7XG4gICAgICBsZXQgc2VjcmV0cyA9IHByb3ZpZGVyLnNlY3JldHM7XG4gICAgICBjb25zdCBvcmlnaW5NYXRjaGVzID0gcHJvdmlkZXIuYWxsb3dlZE9yaWdpbnMgPT09ICcqJyB8fCAoZXZlbnQgJiYgIHByb3ZpZGVyLmFsbG93ZWRPcmlnaW5zLmluZGV4T2YoZXZlbnQub3JpZ2luKSAhPT0gLTEpO1xuICAgICAgbGV0IHNvdXJjZU1hdGNoZXMgPSB0cnVlO1xuICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuc291cmNlKSB7XG4gICAgICAgIHNvdXJjZU1hdGNoZXMgPSBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdICYmIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uc291cmNlID09IGV2ZW50LnNvdXJjZTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgJiYgZXZlbnQuZGF0YS5zb3VyY2UpIHtcbiAgICAgICAgc291cmNlTWF0Y2hlcyA9IHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0gJiYgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UgPT0gZXZlbnQuZGF0YS5zb3VyY2U7XG4gICAgICB9XG4gICAgICBpZihvcmlnaW5NYXRjaGVzICYmIHNvdXJjZU1hdGNoZXMpe1xuICAgICAgICBzZWNyZXRzW2V2ZW50LmRhdGEuc3RhdGVdLnNldERhdGEoZXZlbnQuZGF0YSk7XG4gICAgICAgIHNlY3JldHNbZXZlbnQuZGF0YS5zdGF0ZV0uaGFzRGF0YShldmVudC5kYXRhKTtcbiAgICAgICAgc2VjcmV0c1tldmVudC5kYXRhLnN0YXRlXS5zb3VyY2UuY2xvc2UoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBwb3B1cCgpIHtcbiAgICBjb25zdCBzZWNyZXQgPSB0aGlzLnN0YXRlO1xuICAgIGxldCBwb3B1cCA9IG5ldyBQb3B1cCh7XG4gICAgICBzdGF0ZTogc2VjcmV0LFxuICAgIH0pXG4gICAgdGhpcy5zZWNyZXRzW3NlY3JldF0gPSBwb3B1cDtcbiAgICByZXR1cm4gcG9wdXA7XG4gIH1cblxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlIHx8IGd1aWQoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHJvdmlkZXJzL2Jhc2UuanMiLCJleHBvcnQgZnVuY3Rpb24gZ3VpZCgpIHtcbiAgZnVuY3Rpb24gczQoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgLnRvU3RyaW5nKDE2KVxuICAgIC5zdWJzdHJpbmcoMSk7XG4gIH1cbiAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xuICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9ndWlkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==