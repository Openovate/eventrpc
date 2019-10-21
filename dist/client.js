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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/jsonrpc-lite/jsonrpc.js":
/*!**********************************************!*\
  !*** ./node_modules/jsonrpc-lite/jsonrpc.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// **Github:** https://github.com/teambition/jsonrpc-lite\n//\n// http://www.jsonrpc.org/specification\n// **License:** MIT\n\n/* global module, define */\n;(function (root, factory) {\n  'use strict'\n\n  if ( true && module.exports) module.exports = factory()\n  else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n  else {}\n}(typeof window === 'object' ? window : this, function () {\n  'use strict'\n\n  var undef = void 0\n  var toString = Object.prototype.toString\n  var hasOwnProperty = Object.prototype.hasOwnProperty\n  var isArray = Array.isArray || function (obj) {\n    return toString.call(obj) === '[object Array]'\n  }\n  var isInteger = Number.isSafeInteger || function (num) {\n    return typeof num === 'number' && isFinite(num) && num === Math.floor(num) && Math.abs(num) <= 9007199254740991\n  }\n  var captureStackTrace = Error.captureStackTrace || function captureStackTrace (ctx) {\n    ctx.stack = new Error().stack\n  }\n\n  var jsonrpc = {\n    JsonRpc: JsonRpc,\n    JsonRpcError: JsonRpcError\n  }\n\n  /**\n   * Creates a JSON-RPC 2.0 request object\n   *\n   * @param  {String|Integer} id\n   * @param  {String} method\n   * @param  {Object|Array} [params]: optional\n   * @return {Object} JsonRpc object\n   * @api public\n   */\n  jsonrpc.request = function (id, method, params) {\n    var object = new RequestObject(id, method, params)\n    validateMessage(object, true)\n    return object\n  }\n\n  /**\n   * Creates a JSON-RPC 2.0 notification object\n   *\n   * @param  {String} method\n   * @param  {Object|Array} [params]: optional\n   * @return {Object} JsonRpc object\n   * @api public\n   */\n  jsonrpc.notification = function (method, params) {\n    var object = new NotificationObject(method, params)\n    validateMessage(object, true)\n    return object\n  }\n\n  /**\n   * Creates a JSON-RPC 2.0 success response object\n   *\n   * @param  {String|Integer} id\n   * @param  {Mixed} result\n   * @return {Object} JsonRpc object\n   * @api public\n   */\n  jsonrpc.success = function (id, result) {\n    var object = new SuccessObject(id, result)\n    validateMessage(object, true)\n    return object\n  }\n\n  /**\n   * Creates a JSON-RPC 2.0 error response object\n   *\n   * @param  {String|Integer} id\n   * @param  {Object} JsonRpcError error\n   * @return {Object} JsonRpc object\n   * @api public\n   */\n  jsonrpc.error = function (id, error) {\n    var object = new ErrorObject(id, error)\n    validateMessage(object, true)\n    return object\n  }\n\n  /**\n   * Takes a JSON-RPC 2.0 payload (String) and tries to parse it into a JSON.\n   * If successful, determine what object is it (response, notification,\n   * success, error, or invalid), and return it's type and properly formatted object.\n   *\n   * @param  {String} msg\n   * @return {Object|Array} an array, or an object of this format:\n   *\n   *  {\n   *    type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>\n   *    payload: <JsonRpc|JsonRpcError>\n   *  }\n   *\n   * @api public\n   */\n  jsonrpc.parse = function (message) {\n    if (!message || typeof message !== 'string') {\n      return new JsonRpcParsed(JsonRpcError.invalidRequest(message), 'invalid')\n    }\n\n    try {\n      message = JSON.parse(message)\n    } catch (err) {\n      return new JsonRpcParsed(JsonRpcError.parseError(message), 'invalid')\n    }\n\n    if (!isArray(message)) return parseObject(message)\n    if (!message.length) return new JsonRpcParsed(JsonRpcError.invalidRequest(message), 'invalid')\n    for (var i = 0, len = message.length; i < len; i++) {\n      message[i] = parseObject(message[i])\n    }\n\n    return message\n  }\n\n  /**\n   * Takes a JSON-RPC 2.0 payload (Object) and tries to parse it into a JSON.\n   * If successful, determine what object is it (response, notification,\n   * success, error, or invalid), and return it's type and properly formatted object.\n   *\n   * @param  {Object} msg\n   * @return {Object|Array} an `JsonRpcParsed` object with `type` and `payload`:\n   *\n   *  {\n   *    type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>\n   *    payload: <JsonRpc|JsonRpcError>\n   *  }\n   *\n   * @api public\n   */\n  jsonrpc.parseObject = parseObject\n  function parseObject (obj) {\n    var error = null\n    var payload = null\n\n    if (!obj || obj.jsonrpc !== JsonRpc.VERSION) error = JsonRpcError.invalidRequest(obj)\n    else if (!hasOwnProperty.call(obj, 'id')) {\n      payload = new NotificationObject(obj.method, obj.params)\n      error = validateMessage(payload)\n    } else if (hasOwnProperty.call(obj, 'method')) {\n      payload = new RequestObject(obj.id, obj.method, obj.params)\n      error = validateMessage(payload)\n    } else if (hasOwnProperty.call(obj, 'result')) {\n      payload = new SuccessObject(obj.id, obj.result)\n      error = validateMessage(payload)\n    } else if (hasOwnProperty.call(obj, 'error')) {\n      if (!obj.error) {\n        error = JsonRpcError.internalError(obj)\n      } else {\n        var err = new JsonRpcError(obj.error.message, obj.error.code, obj.error.data)\n        if (err.message !== obj.error.message || err.code !== obj.error.code) {\n          error = JsonRpcError.internalError(obj)\n        } else {\n          payload = new ErrorObject(obj.id, err)\n          error = validateMessage(payload)\n        }\n      }\n    }\n\n    if (!error && payload) return new JsonRpcParsed(payload)\n    return new JsonRpcParsed(error || JsonRpcError.invalidRequest(obj), 'invalid')\n  }\n\n  /**\n   * JsonRpc Class\n   *\n   * @return {Object} JsonRpc object\n   * @api public\n   */\n  function JsonRpc () {\n    this.jsonrpc = '2.0'\n  }\n\n  JsonRpc.VERSION = '2.0'\n  JsonRpc.prototype.serialize = JsonRpc.prototype.toString = function () {\n    return JSON.stringify(this)\n  }\n\n  function RequestObject (id, method, params) {\n    JsonRpc.call(this)\n    this.id = id\n    this.method = method\n    if (params !== undef) this.params = params\n  }\n\n  inherits(RequestObject, JsonRpc)\n  RequestObject.prototype.name = 'request'\n\n  function NotificationObject (method, params) {\n    JsonRpc.call(this)\n    this.method = method\n    if (params !== undef) this.params = params\n  }\n\n  inherits(NotificationObject, JsonRpc)\n  NotificationObject.prototype.name = 'notification'\n\n  function SuccessObject (id, result) {\n    JsonRpc.call(this)\n    this.id = id\n    this.result = result\n  }\n\n  inherits(SuccessObject, JsonRpc)\n  SuccessObject.prototype.name = 'success'\n\n  function ErrorObject (id, error) {\n    JsonRpc.call(this)\n    this.id = id\n    this.error = error\n  }\n\n  inherits(ErrorObject, JsonRpc)\n  ErrorObject.prototype.name = 'error'\n\n  /**\n   * JsonRpcParsed Class\n   *\n   * @param  {String} message\n   * @param  {Integer} code\n   * @return {String} name: optional\n   * @api public\n   */\n\n  function JsonRpcParsed (payload, type) {\n    this.payload = payload\n    this.type = type || payload.name\n  }\n\n  /**\n   * JsonRpcError Class\n   *\n   * @param  {String} message\n   * @param  {Integer} code\n   * @return {String} name: optional\n   * @api public\n   */\n  function JsonRpcError (message, code, data) {\n    captureStackTrace(this, this.constructor)\n    this.message = message === undef ? '' : String(message)\n    this.code = isInteger(code) ? code : 0\n    if (data != null) this.data = data\n  }\n\n  inherits(JsonRpcError, Error)\n  JsonRpcError.prototype.name = 'JsonRpcError'\n\n  JsonRpcError.invalidRequest = function (data) {\n    return new JsonRpcError('Invalid request', -32600, data)\n  }\n\n  JsonRpcError.methodNotFound = function (data) {\n    return new JsonRpcError('Method not found', -32601, data)\n  }\n\n  JsonRpcError.invalidParams = function (data) {\n    return new JsonRpcError('Invalid params', -32602, data)\n  }\n\n  JsonRpcError.internalError = function (data) {\n    return new JsonRpcError('Internal error', -32603, data)\n  }\n\n  JsonRpcError.parseError = function (data) {\n    return new JsonRpcError('Parse error', -32700, data)\n  }\n\n  // if error, return error, else return null\n  function validateMessage (data, throwIt) {\n    var error = null\n    switch (data.name) {\n      case RequestObject.prototype.name:\n        error = checkId(data.id) || checkMethod(data.method) || checkParams(data.params)\n        break\n      case NotificationObject.prototype.name:\n        error = checkMethod(data.method) || checkParams(data.params)\n        break\n      case SuccessObject.prototype.name:\n        error = checkId(data.id) || checkResult(data.result)\n        break\n      case ErrorObject.prototype.name:\n        error = checkId(data.id, true) || checkError(data.error)\n        break\n    }\n    if (error && throwIt) throw error\n    return error\n  }\n\n  function checkId (id, maybeNull) {\n    if (maybeNull && id === null) return null\n    return (isString(id) || isInteger(id)) ? null : JsonRpcError.internalError('\"id\" must be provided, a string or an integer.')\n  }\n\n  function checkMethod (method) {\n    return isString(method) ? null : JsonRpcError.invalidRequest(method)\n  }\n\n  function checkResult (result) {\n    return result === undef ? JsonRpcError.internalError('Result must exist for success Response objects') : null\n  }\n\n  function checkParams (params) {\n    if (params === undef) return null\n    if (isArray(params) || isObject(params)) {\n      // ensure params can be stringify.\n      try {\n        JSON.stringify(params)\n        return null\n      } catch (err) {\n        return JsonRpcError.parseError(params)\n      }\n    }\n    return JsonRpcError.invalidParams(params)\n  }\n\n  function checkError (error) {\n    if (!(error instanceof JsonRpcError)) {\n      return JsonRpcError.internalError('Error must be an instance of JsonRpcError.')\n    }\n\n    if (!isInteger(error.code)) {\n      return JsonRpcError.internalError('Invalid error code. It must be an integer.')\n    }\n\n    if (!isString(error.message)) {\n      return JsonRpcError.internalError('Message must exist or must be a string.')\n    }\n\n    return null\n  }\n\n  function isString (obj) {\n    return obj && typeof obj === 'string'\n  }\n\n  function isObject (obj) {\n    return obj && typeof obj === 'object' && !isArray(obj)\n  }\n\n  function inherits (Child, Parent) {\n    function Ctor () {\n      this.constructor = Child\n    }\n\n    Ctor.prototype = Parent.prototype\n    Child.prototype = new Ctor()\n    return Child\n  }\n\n  return jsonrpc\n}))\n\n\n//# sourceURL=webpack:///./node_modules/jsonrpc-lite/jsonrpc.js?");

/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const jsonrpc = __webpack_require__(/*! jsonrpc-lite */ \"./node_modules/jsonrpc-lite/jsonrpc.js\");\n\nfunction createEmitter(endpoint, config = {}) {\n  let id = config.id || 1;\n  const key = config.key || '';\n\n  const fetchMethod = config.fetch || window.fetch;\n\n  const fetchConfig = {\n    method: config.method || 'POST', // *GET, POST, PUT, DELETE, etc.\n    mode: config.mode || 'cors', // no-cors, cors, *same-origin\n    cache: config.cache || 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\n    credentials: config.credentials || 'same-origin', // include, *same-origin, omit\n    headers: config.headers || {\n      'Content-Type': 'application/json'\n    },\n    redirect: config.redirect || 'follow', // manual, *follow, error\n    referrer: config.referrer || 'no-referrer', // no-referrer, *client\n  };\n\n  async function emit(event, ...args) {\n    //clone the config so we can add a body\n    const config = Object.assign({}, fetchConfig);\n    //make a new RPC ID\n    const rpcid = key + '-' + (id++);\n    //populate the body\n    config.body = JSON.stringify(jsonrpc.request(rpcid, event, args));\n    //call it out\n    const response = await fetchMethod(endpoint, config);\n    //and fetch the results\n    const payload = await response.json();\n\n    if (payload.error) {\n      throw new Error(payload.error.message || 'Unknown Server Error');\n    }\n\n    return payload.result;\n  }\n\n  return emit;\n}\n\nif (typeof window !== 'undefined') {\n  window.eventrpc = createEmitter;\n}\n\nmodule.exports = createEmitter;\n\n\n//# sourceURL=webpack:///./src/client.js?");

/***/ })

/******/ });