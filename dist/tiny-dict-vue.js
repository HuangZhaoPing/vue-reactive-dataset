/*!
 * tiny-dict-vue.js
 * version: 1.0.5
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["TINY-DICT-VUE"] = factory(require("vue"));
	else
		root["TINY-DICT-VUE"] = factory(root["vue"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__4103__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue         = __webpack_require__(5618)
  , isPlainFunction = __webpack_require__(7205)
  , assign          = __webpack_require__(7191)
  , normalizeOpts   = __webpack_require__(5516)
  , contains        = __webpack_require__(9981);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ 2041:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var numberIsNaN       = __webpack_require__(9980)
  , toPosInt          = __webpack_require__(3902)
  , value             = __webpack_require__(2745)
  , indexOf           = Array.prototype.indexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};


/***/ }),

/***/ 4616:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(7379)() ? Array.from : __webpack_require__(2669);


/***/ }),

/***/ 7379:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};


/***/ }),

/***/ 2669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var iteratorSymbol = __webpack_require__(8641).iterator
  , isArguments    = __webpack_require__(6766)
  , isFunction     = __webpack_require__(1216)
  , toPosInt       = __webpack_require__(3902)
  , callable       = __webpack_require__(1290)
  , validValue     = __webpack_require__(2745)
  , isValue        = __webpack_require__(6914)
  , isString       = __webpack_require__(4349)
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array((length = arrayLike.length));
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};


/***/ }),

/***/ 5083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var from    = __webpack_require__(4616)
  , isArray = Array.isArray;

module.exports = function (arrayLike) { return isArray(arrayLike) ? arrayLike : from(arrayLike); };


/***/ }),

/***/ 6380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var assign            = __webpack_require__(7191)
  , isObject          = __webpack_require__(6191)
  , isValue           = __webpack_require__(6914)
  , captureStackTrace = Error.captureStackTrace;

module.exports = function (message/*, code, ext*/) {
	var err = new Error(message), code = arguments[1], ext = arguments[2];
	if (!isValue(ext)) {
		if (isObject(code)) {
			ext = code;
			code = null;
		}
	}
	if (isValue(ext)) assign(err, ext);
	if (isValue(code)) err.code = code;
	if (captureStackTrace) captureStackTrace(err, module.exports);
	return err;
};


/***/ }),

/***/ 5459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPosInt = __webpack_require__(3902);

var test = function (arg1, arg2) { return arg2; };

var desc, defineProperty, generate, mixin;

try {
	Object.defineProperty(test, "length", {
		configurable: true,
		writable: false,
		enumerable: false,
		value: 1
	});
}
catch (ignore) {}

if (test.length === 1) {
	// ES6
	desc = { configurable: true, writable: false, enumerable: false };
	defineProperty = Object.defineProperty;
	module.exports = function (fn, length) {
		length = toPosInt(length);
		if (fn.length === length) return fn;
		desc.value = length;
		return defineProperty(fn, "length", desc);
	};
} else {
	mixin = __webpack_require__(1726);
	generate = (function () {
		var cache = [];
		return function (length) {
			var args, i = 0;
			if (cache[length]) return cache[length];
			args = [];
			while (length--) args.push("a" + (++i).toString(36));
			// eslint-disable-next-line no-new-func
			return new Function(
				"fn",
				"return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };"
			);
		};
	})();
	module.exports = function (src, length) {
		var target;
		length = toPosInt(length);
		if (src.length === length) return src;
		target = generate(length)(src);
		try { mixin(target, src); }
		catch (ignore) {}
		return target;
	};
}


/***/ }),

/***/ 6766:
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString
  , id = objToString.call((function () { return arguments; })());

module.exports = function (value) { return objToString.call(value) === id; };


/***/ }),

/***/ 1216:
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString
  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

module.exports = function (value) {
	return typeof value === "function" && isFunctionStringTag(objToString.call(value));
};


/***/ }),

/***/ 430:
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 5875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(5448)() ? Math.sign : __webpack_require__(4592);


/***/ }),

/***/ 5448:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};


/***/ }),

/***/ 4592:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};


/***/ }),

/***/ 9980:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(9496)() ? Number.isNaN : __webpack_require__(4517);


/***/ }),

/***/ 9496:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};


/***/ }),

/***/ 4517:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};


/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var sign  = __webpack_require__(5875)
  , abs   = Math.abs
  , floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),

/***/ 3902:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toInteger = __webpack_require__(3478)
  , max       = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),

/***/ 4214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable                = __webpack_require__(1290)
  , value                   = __webpack_require__(2745)
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),

/***/ 7191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(6560)() ? Object.assign : __webpack_require__(7346);


/***/ }),

/***/ 6560:
/***/ ((module) => {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ 7346:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys  = __webpack_require__(5103)
  , value = __webpack_require__(2745)
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ 7031:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(4214)("forEach");


/***/ }),

/***/ 6458:
/***/ ((module) => {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === "function"; };


/***/ }),

/***/ 6191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };


/***/ }),

/***/ 6914:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _undefined = __webpack_require__(430)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 5103:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(7446)() ? Object.keys : __webpack_require__(6137);


/***/ }),

/***/ 7446:
/***/ ((module) => {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ 6137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ 1465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callable = __webpack_require__(1290)
  , forEach  = __webpack_require__(7031)
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};


/***/ }),

/***/ 1726:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var value                    = __webpack_require__(2745)
  , defineProperty           = Object.defineProperty
  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  , getOwnPropertyNames      = Object.getOwnPropertyNames
  , getOwnPropertySymbols    = Object.getOwnPropertySymbols;

module.exports = function (target, source) {
	var error, sourceObject = Object(value(source));
	target = Object(value(target));
	getOwnPropertyNames(sourceObject).forEach(function (name) {
		try {
			defineProperty(target, name, getOwnPropertyDescriptor(source, name));
		} catch (e) { error = e; }
	});
	if (typeof getOwnPropertySymbols === "function") {
		getOwnPropertySymbols(sourceObject).forEach(function (symbol) {
			try {
				defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
			} catch (e) { error = e; }
		});
	}
	if (error !== undefined) throw error;
	return target;
};


/***/ }),

/***/ 5516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ 9474:
/***/ ((module) => {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};


/***/ }),

/***/ 1290:
/***/ ((module) => {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 2745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(6914);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 7197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ensureValue   = __webpack_require__(2745)
  , stringifiable = __webpack_require__(8553);

module.exports = function (value) { return stringifiable(ensureValue(value)); };


/***/ }),

/***/ 8553:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(6458);

module.exports = function (stringifiable) {
	try {
		if (stringifiable && isCallable(stringifiable.toString)) return stringifiable.toString();
		return String(stringifiable);
	} catch (e) {
		throw new TypeError("Passed argument cannot be stringifed");
	}
};


/***/ }),

/***/ 3947:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(6458);

module.exports = function (value) {
	try {
		if (value && isCallable(value.toString)) return value.toString();
		return String(value);
	} catch (e) {
		return "<Non-coercible to string value>";
	}
};


/***/ }),

/***/ 9981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(3591)() ? String.prototype.contains : __webpack_require__(6042);


/***/ }),

/***/ 3591:
/***/ ((module) => {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 6042:
/***/ ((module) => {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ 4349:
/***/ ((module) => {

"use strict";


var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};


/***/ }),

/***/ 8979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var safeToString = __webpack_require__(3947);

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		return JSON.stringify(char).slice(1, -1);
	});
	return string;
};


/***/ }),

/***/ 8641:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(8821)()
	? __webpack_require__(7933).Symbol
	: __webpack_require__(5127);


/***/ }),

/***/ 8821:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var global     = __webpack_require__(7933)
  , validTypes = { object: true, symbol: true };

module.exports = function () {
	var Symbol = global.Symbol;
	var symbol;
	if (typeof Symbol !== "function") return false;
	symbol = Symbol("test symbol");
	try { String(symbol); }
	catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),

/***/ 5386:
/***/ ((module) => {

"use strict";


module.exports = function (value) {
	if (!value) return false;
	if (typeof value === "symbol") return true;
	if (!value.constructor) return false;
	if (value.constructor.name !== "Symbol") return false;
	return value[value.constructor.toStringTag] === "Symbol";
};


/***/ }),

/***/ 7451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var d = __webpack_require__(1804);

var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

var created = create(null);
module.exports = function (desc) {
	var postfix = 0, name, ie11BugWorkaround;
	while (created[desc + (postfix || "")]) ++postfix;
	desc += postfix || "";
	created[desc] = true;
	name = "@@" + desc;
	defineProperty(
		objPrototype,
		name,
		d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		})
	);
	return name;
};


/***/ }),

/***/ 7628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var d            = __webpack_require__(1804)
  , NativeSymbol = __webpack_require__(7933).Symbol;

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d(
			"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
		),
		isConcatSpreadable: d(
			"",
			(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
				SymbolPolyfill("isConcatSpreadable")
		),
		iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
		match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
		replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
		search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
		species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
		split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
		toPrimitive: d(
			"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
		),
		toStringTag: d(
			"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
		),
		unscopables: d(
			"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
		)
	});
};


/***/ }),

/***/ 277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var d              = __webpack_require__(1804)
  , validateSymbol = __webpack_require__(8541);

var registry = Object.create(null);

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (registry[key]) return registry[key];
			return (registry[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (symbol) {
			var key;
			validateSymbol(symbol);
			for (key in registry) {
				if (registry[key] === symbol) return key;
			}
			return undefined;
		})
	});
};


/***/ }),

/***/ 5127:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d                    = __webpack_require__(1804)
  , validateSymbol       = __webpack_require__(8541)
  , NativeSymbol         = __webpack_require__(7933).Symbol
  , generateName         = __webpack_require__(7451)
  , setupStandardSymbols = __webpack_require__(7628)
  , setupSymbolRegistry  = __webpack_require__(277);

var create = Object.create
  , defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty;

var SymbolPolyfill, HiddenSymbol, isNativeSafe;

if (typeof NativeSymbol === "function") {
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
} else {
	NativeSymbol = null;
}

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? "" : String(description);
	return defineProperties(symbol, {
		__description__: d("", description),
		__name__: d("", generateName(description))
	});
};

setupStandardSymbols(SymbolPolyfill);
setupSymbolRegistry(SymbolPolyfill);

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d("", function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(
	SymbolPolyfill.prototype,
	SymbolPolyfill.toPrimitive,
	d("", function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === "symbol") return symbol;
		return symbol.toString();
	})
);
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
);

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
);


/***/ }),

/***/ 8541:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isSymbol = __webpack_require__(5386);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),

/***/ 8370:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var d        = __webpack_require__(1804)
  , callable = __webpack_require__(1290)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),

/***/ 7145:
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ is resolved with global context, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ 7933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(6344)() ? globalThis : __webpack_require__(7145);


/***/ }),

/***/ 6344:
/***/ ((module) => {

"use strict";


module.exports = function () {
	if (typeof globalThis !== "object") return false;
	if (!globalThis) return false;
	return globalThis.Array === Array;
};


/***/ }),

/***/ 6141:
/***/ ((module) => {

module.exports = isPromise;
module.exports.default = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ }),

/***/ 3390:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPosInt = __webpack_require__(3902)

  , create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (limit) {
	var size = 0, base = 1, queue = create(null), map = create(null), index = 0, del;
	limit = toPosInt(limit);
	return {
		hit: function (id) {
			var oldIndex = map[id], nuIndex = ++index;
			queue[nuIndex] = id;
			map[id] = nuIndex;
			if (!oldIndex) {
				++size;
				if (size <= limit) return;
				id = queue[base];
				del(id);
				return id;
			}
			delete queue[oldIndex];
			if (base !== oldIndex) return;
			while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
		},
		delete: del = function (id) {
			var oldIndex = map[id];
			if (!oldIndex) return;
			delete queue[oldIndex];
			delete map[id];
			--size;
			if (base !== oldIndex) return;
			if (!size) {
				index = 0;
				base = 1;
				return;
			}
			while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
		},
		clear: function () {
			size = 0;
			base = 1;
			queue = create(null);
			map = create(null);
			index = 0;
		}
	};
};


/***/ }),

/***/ 4758:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint consistent-this: 0, no-shadow:0, no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */

// Support for asynchronous functions



var aFrom        = __webpack_require__(4616)
  , objectMap    = __webpack_require__(1465)
  , mixin        = __webpack_require__(1726)
  , defineLength = __webpack_require__(5459)
  , nextTick     = __webpack_require__(7473);

var slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create;

__webpack_require__(3992).async = function (tbi, conf) {
	var waiting = create(null)
	  , cache = create(null)
	  , base = conf.memoized
	  , original = conf.original
	  , currentCallback
	  , currentContext
	  , currentArgs;

	// Initial
	conf.memoized = defineLength(function (arg) {
		var args = arguments, last = args[args.length - 1];
		if (typeof last === "function") {
			currentCallback = last;
			args = slice.call(args, 0, -1);
		}
		return base.apply(currentContext = this, currentArgs = args);
	}, base);
	try { mixin(conf.memoized, base); }
	catch (ignore) {}

	// From cache (sync)
	conf.on("get", function (id) {
		var cb, context, args;
		if (!currentCallback) return;

		// Unresolved
		if (waiting[id]) {
			if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback];
			else waiting[id].push(currentCallback);
			currentCallback = null;
			return;
		}

		// Resolved, assure next tick invocation
		cb = currentCallback;
		context = currentContext;
		args = currentArgs;
		currentCallback = currentContext = currentArgs = null;
		nextTick(function () {
			var data;
			if (hasOwnProperty.call(cache, id)) {
				data = cache[id];
				conf.emit("getasync", id, args, context);
				apply.call(cb, data.context, data.args);
			} else {
				// Purged in a meantime, we shouldn't rely on cached value, recall
				currentCallback = cb;
				currentContext = context;
				currentArgs = args;
				base.apply(context, args);
			}
		});
	});

	// Not from cache
	conf.original = function () {
		var args, cb, origCb, result;
		if (!currentCallback) return apply.call(original, this, arguments);
		args = aFrom(arguments);
		cb = function self(err) {
			var cb, args, id = self.id;
			if (id == null) {
				// Shouldn't happen, means async callback was called sync way
				nextTick(apply.bind(self, this, arguments));
				return undefined;
			}
			delete self.id;
			cb = waiting[id];
			delete waiting[id];
			if (!cb) {
				// Already processed,
				// outcome of race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
				return undefined;
			}
			args = aFrom(arguments);
			if (conf.has(id)) {
				if (err) {
					conf.delete(id);
				} else {
					cache[id] = { context: this, args: args };
					conf.emit("setasync", id, typeof cb === "function" ? 1 : cb.length);
				}
			}
			if (typeof cb === "function") {
				result = apply.call(cb, this, args);
			} else {
				cb.forEach(function (cb) { result = apply.call(cb, this, args); }, this);
			}
			return result;
		};
		origCb = currentCallback;
		currentCallback = currentContext = currentArgs = null;
		args.push(cb);
		result = apply.call(original, this, args);
		cb.cb = origCb;
		currentCallback = cb;
		return result;
	};

	// After not from cache call
	conf.on("set", function (id) {
		if (!currentCallback) {
			conf.delete(id);
			return;
		}
		if (waiting[id]) {
			// Race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
			if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback.cb];
			else waiting[id].push(currentCallback.cb);
		} else {
			waiting[id] = currentCallback.cb;
		}
		delete currentCallback.cb;
		currentCallback.id = id;
		currentCallback = null;
	});

	// On delete
	conf.on("delete", function (id) {
		var result;
		// If false, we don't have value yet, so we assume that intention is not
		// to memoize this call. After value is obtained we don't cache it but
		// gracefully pass to callback
		if (hasOwnProperty.call(waiting, id)) return;
		if (!cache[id]) return;
		result = cache[id];
		delete cache[id];
		conf.emit("deleteasync", id, slice.call(result.args, 1));
	});

	// On clear
	conf.on("clear", function () {
		var oldCache = cache;
		cache = create(null);
		conf.emit(
			"clearasync", objectMap(oldCache, function (data) { return slice.call(data.args, 1); })
		);
	});
};


/***/ }),

/***/ 5545:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Call dispose callback on each cache purge



var callable   = __webpack_require__(1290)
  , forEach    = __webpack_require__(7031)
  , extensions = __webpack_require__(3992)

  , apply = Function.prototype.apply;

extensions.dispose = function (dispose, conf, options) {
	var del;
	callable(dispose);
	if ((options.async && extensions.async) || (options.promise && extensions.promise)) {
		conf.on("deleteasync", del = function (id, resultArray) {
			apply.call(dispose, null, resultArray);
		});
		conf.on("clearasync", function (cache) {
			forEach(cache, function (result, id) {
 del(id, result);
});
		});
		return;
	}
	conf.on("delete", del = function (id, result) {
 dispose(result);
});
	conf.on("clear", function (cache) {
		forEach(cache, function (result, id) {
 del(id, result);
});
	});
};


/***/ }),

/***/ 9333:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint consistent-this: 0 */

// Timeout cached values



var aFrom      = __webpack_require__(4616)
  , forEach    = __webpack_require__(7031)
  , nextTick   = __webpack_require__(7473)
  , isPromise  = __webpack_require__(6141)
  , timeout    = __webpack_require__(4284)
  , extensions = __webpack_require__(3992);

var noop = Function.prototype, max = Math.max, min = Math.min, create = Object.create;

extensions.maxAge = function (maxAge, conf, options) {
	var timeouts, postfix, preFetchAge, preFetchTimeouts;

	maxAge = timeout(maxAge);
	if (!maxAge) return;

	timeouts = create(null);
	postfix =
		(options.async && extensions.async) || (options.promise && extensions.promise)
			? "async"
			: "";
	conf.on("set" + postfix, function (id) {
		timeouts[id] = setTimeout(function () { conf.delete(id); }, maxAge);
		if (typeof timeouts[id].unref === "function") timeouts[id].unref();
		if (!preFetchTimeouts) return;
		if (preFetchTimeouts[id]) {
			if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
		}
		preFetchTimeouts[id] = setTimeout(function () {
			delete preFetchTimeouts[id];
		}, preFetchAge);
		if (typeof preFetchTimeouts[id].unref === "function") preFetchTimeouts[id].unref();
	});
	conf.on("delete" + postfix, function (id) {
		clearTimeout(timeouts[id]);
		delete timeouts[id];
		if (!preFetchTimeouts) return;
		if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
		delete preFetchTimeouts[id];
	});

	if (options.preFetch) {
		if (options.preFetch === true || isNaN(options.preFetch)) {
			preFetchAge = 0.333;
		} else {
			preFetchAge = max(min(Number(options.preFetch), 1), 0);
		}
		if (preFetchAge) {
			preFetchTimeouts = {};
			preFetchAge = (1 - preFetchAge) * maxAge;
			conf.on("get" + postfix, function (id, args, context) {
				if (!preFetchTimeouts[id]) {
					preFetchTimeouts[id] = "nextTick";
					nextTick(function () {
						var result;
						if (preFetchTimeouts[id] !== "nextTick") return;
						delete preFetchTimeouts[id];
						conf.delete(id);
						if (options.async) {
							args = aFrom(args);
							args.push(noop);
						}
						result = conf.memoized.apply(context, args);
						if (options.promise) {
							// Supress eventual error warnings
							if (isPromise(result)) {
								if (typeof result.done === "function") result.done(noop, noop);
								else result.then(noop, noop);
							}
						}
					});
				}
			});
		}
	}

	conf.on("clear" + postfix, function () {
		forEach(timeouts, function (id) { clearTimeout(id); });
		timeouts = {};
		if (preFetchTimeouts) {
			forEach(preFetchTimeouts, function (id) { if (id !== "nextTick") clearTimeout(id); });
			preFetchTimeouts = {};
		}
	});
};


/***/ }),

/***/ 3896:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Limit cache size, LRU (least recently used) algorithm.



var toPosInteger = __webpack_require__(3902)
  , lruQueue     = __webpack_require__(3390)
  , extensions   = __webpack_require__(3992);

extensions.max = function (max, conf, options) {
	var postfix, queue, hit;

	max = toPosInteger(max);
	if (!max) return;

	queue = lruQueue(max);
	postfix = (options.async && extensions.async) || (options.promise && extensions.promise)
		? "async" : "";

	conf.on("set" + postfix, hit = function (id) {
		id = queue.hit(id);
		if (id === undefined) return;
		conf.delete(id);
	});
	conf.on("get" + postfix, hit);
	conf.on("delete" + postfix, queue.delete);
	conf.on("clear" + postfix, queue.clear);
};


/***/ }),

/***/ 3217:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint max-statements: 0 */

// Support for functions returning promise



var objectMap     = __webpack_require__(1465)
  , primitiveSet  = __webpack_require__(9474)
  , ensureString  = __webpack_require__(7197)
  , toShortString = __webpack_require__(8979)
  , isPromise     = __webpack_require__(6141)
  , nextTick      = __webpack_require__(7473);

var create = Object.create
  , supportedModes = primitiveSet("then", "then:finally", "done", "done:finally");

__webpack_require__(3992).promise = function (mode, conf) {
	var waiting = create(null), cache = create(null), promises = create(null);

	if (mode === true) {
		mode = null;
	} else {
		mode = ensureString(mode);
		if (!supportedModes[mode]) {
			throw new TypeError("'" + toShortString(mode) + "' is not valid promise mode");
		}
	}

	// After not from cache call
	conf.on("set", function (id, ignore, promise) {
		var isFailed = false;

		if (!isPromise(promise)) {
			// Non promise result
			cache[id] = promise;
			conf.emit("setasync", id, 1);
			return;
		}
		waiting[id] = 1;
		promises[id] = promise;
		var onSuccess = function (result) {
			var count = waiting[id];
			if (isFailed) {
				throw new Error(
					"Memoizee error: Detected unordered then|done & finally resolution, which " +
						"in turn makes proper detection of success/failure impossible (when in " +
						"'done:finally' mode)\n" +
						"Consider to rely on 'then' or 'done' mode instead."
				);
			}
			if (!count) return; // Deleted from cache before resolved
			delete waiting[id];
			cache[id] = result;
			conf.emit("setasync", id, count);
		};
		var onFailure = function () {
			isFailed = true;
			if (!waiting[id]) return; // Deleted from cache (or succeed in case of finally)
			delete waiting[id];
			delete promises[id];
			conf.delete(id);
		};

		var resolvedMode = mode;
		if (!resolvedMode) resolvedMode = "then";

		if (resolvedMode === "then") {
			var nextTickFailure = function () { nextTick(onFailure); };
			// Eventual finally needs to be attached to non rejected promise
			// (so we not force propagation of unhandled rejection)
			promise = promise.then(function (result) {
				nextTick(onSuccess.bind(this, result));
			}, nextTickFailure);
			// If `finally` is a function we attach to it to remove cancelled promises.
			if (typeof promise.finally === "function") {
				promise.finally(nextTickFailure);
			}
		} else if (resolvedMode === "done") {
			// Not recommended, as it may mute any eventual "Unhandled error" events
			if (typeof promise.done !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'done' " +
						"in 'done' mode"
				);
			}
			promise.done(onSuccess, onFailure);
		} else if (resolvedMode === "done:finally") {
			// The only mode with no side effects assuming library does not throw unconditionally
			// for rejected promises.
			if (typeof promise.done !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'done' " +
						"in 'done:finally' mode"
				);
			}
			if (typeof promise.finally !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'finally' " +
						"in 'done:finally' mode"
				);
			}
			promise.done(onSuccess);
			promise.finally(onFailure);
		}
	});

	// From cache (sync)
	conf.on("get", function (id, args, context) {
		var promise;
		if (waiting[id]) {
			++waiting[id]; // Still waiting
			return;
		}
		promise = promises[id];
		var emit = function () { conf.emit("getasync", id, args, context); };
		if (isPromise(promise)) {
			if (typeof promise.done === "function") promise.done(emit);
			else {
				promise.then(function () { nextTick(emit); });
			}
		} else {
			emit();
		}
	});

	// On delete
	conf.on("delete", function (id) {
		delete promises[id];
		if (waiting[id]) {
			delete waiting[id];
			return; // Not yet resolved
		}
		if (!hasOwnProperty.call(cache, id)) return;
		var result = cache[id];
		delete cache[id];
		conf.emit("deleteasync", id, [result]);
	});

	// On clear
	conf.on("clear", function () {
		var oldCache = cache;
		cache = create(null);
		waiting = create(null);
		promises = create(null);
		conf.emit("clearasync", objectMap(oldCache, function (data) { return [data]; }));
	});
};


/***/ }),

/***/ 9425:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Reference counter, useful for garbage collector like functionality



var d          = __webpack_require__(1804)
  , extensions = __webpack_require__(3992)

  , create = Object.create, defineProperties = Object.defineProperties;

extensions.refCounter = function (ignore, conf, options) {
	var cache, postfix;

	cache = create(null);
	postfix = (options.async && extensions.async) || (options.promise && extensions.promise)
		? "async" : "";

	conf.on("set" + postfix, function (id, length) {
 cache[id] = length || 1;
});
	conf.on("get" + postfix, function (id) {
 ++cache[id];
});
	conf.on("delete" + postfix, function (id) {
 delete cache[id];
});
	conf.on("clear" + postfix, function () {
 cache = {};
});

	defineProperties(conf.memoized, {
		deleteRef: d(function () {
			var id = conf.get(arguments);
			if (id === null) return null;
			if (!cache[id]) return null;
			if (!--cache[id]) {
				conf.delete(id);
				return true;
			}
			return false;
		}),
		getRefCount: d(function () {
			var id = conf.get(arguments);
			if (id === null) return 0;
			if (!cache[id]) return 0;
			return cache[id];
		})
	});
};


/***/ }),

/***/ 4156:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var normalizeOpts = __webpack_require__(5516)
  , resolveLength = __webpack_require__(5149)
  , plain         = __webpack_require__(5730);

module.exports = function (fn/*, options*/) {
	var options = normalizeOpts(arguments[1]), length;

	if (!options.normalizer) {
		length = options.length = resolveLength(options.length, fn.length, options.async);
		if (length !== 0) {
			if (options.primitive) {
				if (length === false) {
					options.normalizer = __webpack_require__(6289);
				} else if (length > 1) {
					options.normalizer = __webpack_require__(5398)(length);
				}
			} else if (length === false) options.normalizer = __webpack_require__(7996)();
				else if (length === 1) options.normalizer = __webpack_require__(9009)();
				else options.normalizer = __webpack_require__(1070)(length);
		}
	}

	// Assure extensions
	if (options.async) __webpack_require__(4758);
	if (options.promise) __webpack_require__(3217);
	if (options.dispose) __webpack_require__(5545);
	if (options.maxAge) __webpack_require__(9333);
	if (options.max) __webpack_require__(3896);
	if (options.refCounter) __webpack_require__(9425);

	return plain(fn, options);
};


/***/ }),

/***/ 5340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */



var customError      = __webpack_require__(6380)
  , defineLength     = __webpack_require__(5459)
  , d                = __webpack_require__(1804)
  , ee               = __webpack_require__(8370).methods
  , resolveResolve   = __webpack_require__(1923)
  , resolveNormalize = __webpack_require__(8544);

var apply = Function.prototype.apply
  , call = Function.prototype.call
  , create = Object.create
  , defineProperties = Object.defineProperties
  , on = ee.on
  , emit = ee.emit;

module.exports = function (original, length, options) {
	var cache = create(null)
	  , conf
	  , memLength
	  , get
	  , set
	  , del
	  , clear
	  , extDel
	  , extGet
	  , extHas
	  , normalizer
	  , getListeners
	  , setListeners
	  , deleteListeners
	  , memoized
	  , resolve;
	if (length !== false) memLength = length;
	else if (isNaN(original.length)) memLength = 1;
	else memLength = original.length;

	if (options.normalizer) {
		normalizer = resolveNormalize(options.normalizer);
		get = normalizer.get;
		set = normalizer.set;
		del = normalizer.delete;
		clear = normalizer.clear;
	}
	if (options.resolvers != null) resolve = resolveResolve(options.resolvers);

	if (get) {
		memoized = defineLength(function (arg) {
			var id, result, args = arguments;
			if (resolve) args = resolve(args);
			id = get(args);
			if (id !== null) {
				if (hasOwnProperty.call(cache, id)) {
					if (getListeners) conf.emit("get", id, args, this);
					return cache[id];
				}
			}
			if (args.length === 1) result = call.call(original, this, args[0]);
			else result = apply.call(original, this, args);
			if (id === null) {
				id = get(args);
				if (id !== null) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
				id = set(args);
			} else if (hasOwnProperty.call(cache, id)) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache[id] = result;
			if (setListeners) conf.emit("set", id, null, result);
			return result;
		}, memLength);
	} else if (length === 0) {
		memoized = function () {
			var result;
			if (hasOwnProperty.call(cache, "data")) {
				if (getListeners) conf.emit("get", "data", arguments, this);
				return cache.data;
			}
			if (arguments.length) result = apply.call(original, this, arguments);
			else result = call.call(original, this);
			if (hasOwnProperty.call(cache, "data")) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache.data = result;
			if (setListeners) conf.emit("set", "data", null, result);
			return result;
		};
	} else {
		memoized = function (arg) {
			var result, args = arguments, id;
			if (resolve) args = resolve(arguments);
			id = String(args[0]);
			if (hasOwnProperty.call(cache, id)) {
				if (getListeners) conf.emit("get", id, args, this);
				return cache[id];
			}
			if (args.length === 1) result = call.call(original, this, args[0]);
			else result = apply.call(original, this, args);
			if (hasOwnProperty.call(cache, id)) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache[id] = result;
			if (setListeners) conf.emit("set", id, null, result);
			return result;
		};
	}
	conf = {
		original: original,
		memoized: memoized,
		profileName: options.profileName,
		get: function (args) {
			if (resolve) args = resolve(args);
			if (get) return get(args);
			return String(args[0]);
		},
		has: function (id) { return hasOwnProperty.call(cache, id); },
		delete: function (id) {
			var result;
			if (!hasOwnProperty.call(cache, id)) return;
			if (del) del(id);
			result = cache[id];
			delete cache[id];
			if (deleteListeners) conf.emit("delete", id, result);
		},
		clear: function () {
			var oldCache = cache;
			if (clear) clear();
			cache = create(null);
			conf.emit("clear", oldCache);
		},
		on: function (type, listener) {
			if (type === "get") getListeners = true;
			else if (type === "set") setListeners = true;
			else if (type === "delete") deleteListeners = true;
			return on.call(this, type, listener);
		},
		emit: emit,
		updateEnv: function () { original = conf.original; }
	};
	if (get) {
		extDel = defineLength(function (arg) {
			var id, args = arguments;
			if (resolve) args = resolve(args);
			id = get(args);
			if (id === null) return;
			conf.delete(id);
		}, memLength);
	} else if (length === 0) {
		extDel = function () { return conf.delete("data"); };
	} else {
		extDel = function (arg) {
			if (resolve) arg = resolve(arguments)[0];
			return conf.delete(arg);
		};
	}
	extGet = defineLength(function () {
		var id, args = arguments;
		if (length === 0) return cache.data;
		if (resolve) args = resolve(args);
		if (get) id = get(args);
		else id = String(args[0]);
		return cache[id];
	});
	extHas = defineLength(function () {
		var id, args = arguments;
		if (length === 0) return conf.has("data");
		if (resolve) args = resolve(args);
		if (get) id = get(args);
		else id = String(args[0]);
		if (id === null) return false;
		return conf.has(id);
	});
	defineProperties(memoized, {
		__memoized__: d(true),
		delete: d(extDel),
		clear: d(conf.clear),
		_get: d(extGet),
		_has: d(extHas)
	});
	return conf;
};


/***/ }),

/***/ 3992:
/***/ (() => {

"use strict";



/***/ }),

/***/ 5149:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPosInt = __webpack_require__(3902);

module.exports = function (optsLength, fnLength, isAsync) {
	var length;
	if (isNaN(optsLength)) {
		length = fnLength;
		if (!(length >= 0)) return 1;
		if (isAsync && length) return length - 1;
		return length;
	}
	if (optsLength === false) return false;
	return toPosInt(optsLength);
};


/***/ }),

/***/ 8544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callable = __webpack_require__(1290);

module.exports = function (userNormalizer) {
	var normalizer;
	if (typeof userNormalizer === "function") return { set: userNormalizer, get: userNormalizer };
	normalizer = { get: callable(userNormalizer.get) };
	if (userNormalizer.set !== undefined) {
		normalizer.set = callable(userNormalizer.set);
		if (userNormalizer.delete) normalizer.delete = callable(userNormalizer.delete);
		if (userNormalizer.clear) normalizer.clear = callable(userNormalizer.clear);
		return normalizer;
	}
	normalizer.set = normalizer.get;
	return normalizer;
};


/***/ }),

/***/ 1923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toArray  = __webpack_require__(5083)
  , isValue  = __webpack_require__(6914)
  , callable = __webpack_require__(1290);

var slice = Array.prototype.slice, resolveArgs;

resolveArgs = function (args) {
	return this.map(function (resolve, i) {
		return resolve ? resolve(args[i]) : args[i];
	}).concat(slice.call(args, this.length));
};

module.exports = function (resolvers) {
	resolvers = toArray(resolvers);
	resolvers.forEach(function (resolve) {
		if (isValue(resolve)) callable(resolve);
	});
	return resolveArgs.bind(resolvers);
};


/***/ }),

/***/ 9009:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var indexOf = __webpack_require__(2041);

module.exports = function () {
	var lastId = 0, argsMap = [], cache = [];
	return {
		get: function (args) {
			var index = indexOf.call(argsMap, args[0]);
			return index === -1 ? null : cache[index];
		},
		set: function (args) {
			argsMap.push(args[0]);
			cache.push(++lastId);
			return lastId;
		},
		delete: function (id) {
			var index = indexOf.call(cache, id);
			if (index !== -1) {
				argsMap.splice(index, 1);
				cache.splice(index, 1);
			}
		},
		clear: function () {
			argsMap = [];
			cache = [];
		}
	};
};


/***/ }),

/***/ 1070:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var indexOf = __webpack_require__(2041)
  , create  = Object.create;

module.exports = function (length) {
	var lastId = 0, map = [[], []], cache = create(null);
	return {
		get: function (args) {
			var index = 0, set = map, i;
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) return null;
			return set[1][i] || null;
		},
		set: function (args) {
			var index = 0, set = map, i;
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
					set[1].push([[], []]);
				}
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) {
				i = set[0].push(args[index]) - 1;
			}
			set[1][i] = ++lastId;
			cache[lastId] = args;
			return lastId;
		},
		delete: function (id) {
			var index = 0, set = map, i, path = [], args = cache[id];
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				path.push(set, i);
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) {
				return;
			}
			id = set[1][i];
			set[0].splice(i, 1);
			set[1].splice(i, 1);
			while (!set[0].length && path.length) {
				i = path.pop();
				set = path.pop();
				set[0].splice(i, 1);
				set[1].splice(i, 1);
			}
			delete cache[id];
		},
		clear: function () {
			map = [[], []];
			cache = create(null);
		}
	};
};


/***/ }),

/***/ 5398:
/***/ ((module) => {

"use strict";


module.exports = function (length) {
	if (!length) {
		return function () {
			return "";
		};
	}
	return function (args) {
		var id = String(args[0]), i = 0, currentLength = length;
		while (--currentLength) {
			id += "\u0001" + args[++i];
		}
		return id;
	};
};


/***/ }),

/***/ 7996:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* eslint max-statements: 0 */



var indexOf = __webpack_require__(2041);

var create = Object.create;

module.exports = function () {
	var lastId = 0, map = [], cache = create(null);
	return {
		get: function (args) {
			var index = 0, set = map, i, length = args.length;
			if (length === 0) return set[length] || null;
			if ((set = set[length])) {
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) return null;
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				return set[1][i] || null;
			}
			return null;
		},
		set: function (args) {
			var index = 0, set = map, i, length = args.length;
			if (length === 0) {
				set[length] = ++lastId;
			} else {
				if (!set[length]) {
					set[length] = [[], []];
				}
				set = set[length];
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
						set[1].push([[], []]);
					}
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
				}
				set[1][i] = ++lastId;
			}
			cache[lastId] = args;
			return lastId;
		},
		delete: function (id) {
			var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
			if (length === 0) {
				delete set[length];
			} else if ((set = set[length])) {
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					path.push(set, i);
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				id = set[1][i];
				set[0].splice(i, 1);
				set[1].splice(i, 1);
				while (!set[0].length && path.length) {
					i = path.pop();
					set = path.pop();
					set[0].splice(i, 1);
					set[1].splice(i, 1);
				}
			}
			delete cache[id];
		},
		clear: function () {
			map = [];
			cache = create(null);
		}
	};
};


/***/ }),

/***/ 6289:
/***/ ((module) => {

"use strict";


module.exports = function (args) {
	var id, i, length = args.length;
	if (!length) return "\u0002";
	id = String(args[i = 0]);
	while (--length) id += "\u0001" + args[++i];
	return id;
};


/***/ }),

/***/ 5730:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callable      = __webpack_require__(1290)
  , forEach       = __webpack_require__(7031)
  , extensions    = __webpack_require__(3992)
  , configure     = __webpack_require__(5340)
  , resolveLength = __webpack_require__(5149);

module.exports = function self(fn /*, options */) {
	var options, length, conf;

	callable(fn);
	options = Object(arguments[1]);

	if (options.async && options.promise) {
		throw new Error("Options 'async' and 'promise' cannot be used together");
	}

	// Do not memoize already memoized function
	if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;

	// Resolve length;
	length = resolveLength(options.length, fn.length, options.async && extensions.async);

	// Configure cache map
	conf = configure(fn, length, options);

	// Bind eventual extensions
	forEach(extensions, function (extFn, name) {
		if (options[name]) extFn(options[name], conf, options);
	});

	if (self.__profiler__) self.__profiler__(conf);

	conf.updateEnv();
	return conf.memoized;
};


/***/ }),

/***/ 7473:
/***/ ((module) => {

"use strict";


var ensureCallable = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

var byObserver = function (Observer) {
	var node = document.createTextNode(''), queue, currentQueue, i = 0;
	new Observer(function () {
		var callback;
		if (!queue) {
			if (!currentQueue) return;
			queue = currentQueue;
		} else if (currentQueue) {
			queue = currentQueue.concat(queue);
		}
		currentQueue = queue;
		queue = null;
		if (typeof currentQueue === 'function') {
			callback = currentQueue;
			currentQueue = null;
			callback();
			return;
		}
		node.data = (i = ++i % 2); // Invoke other batch, to handle leftover callbacks in case of crash
		while (currentQueue) {
			callback = currentQueue.shift();
			if (!currentQueue.length) currentQueue = null;
			callback();
		}
	}).observe(node, { characterData: true });
	return function (fn) {
		ensureCallable(fn);
		if (queue) {
			if (typeof queue === 'function') queue = [queue, fn];
			else queue.push(fn);
			return;
		}
		queue = fn;
		node.data = (i = ++i % 2);
	};
};

module.exports = (function () {
	// Node.js
	if ((typeof process === 'object') && process && (typeof process.nextTick === 'function')) {
		return process.nextTick;
	}

	// queueMicrotask
	if (typeof queueMicrotask === "function") {
		return function (cb) { queueMicrotask(ensureCallable(cb)); };
	}

	// MutationObserver
	if ((typeof document === 'object') && document) {
		if (typeof MutationObserver === 'function') return byObserver(MutationObserver);
		if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver);
	}

	// W3C Draft
	// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
	if (typeof setImmediate === 'function') {
		return function (cb) { setImmediate(ensureCallable(cb)); };
	}

	// Wide available standard
	if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
		return function (cb) { setTimeout(ensureCallable(cb), 0); };
	}

	return null;
}());


/***/ }),

/***/ 596:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQueryString": () => (/* binding */ getQueryString),
/* harmony export */   "fillz": () => (/* binding */ fillz),
/* harmony export */   "toRawType": () => (/* binding */ toRawType),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isSymbol": () => (/* binding */ isSymbol),
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "toNumber": () => (/* binding */ toNumber),
/* harmony export */   "getFirstDateOfMonth": () => (/* binding */ getFirstDateOfMonth),
/* harmony export */   "getLastDateOfMonth": () => (/* binding */ getLastDateOfMonth),
/* harmony export */   "getRangeDateOfMonth": () => (/* binding */ getRangeDateOfMonth),
/* harmony export */   "getRangeDateOfWeek": () => (/* binding */ getRangeDateOfWeek),
/* harmony export */   "getSuffix": () => (/* binding */ getSuffix),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "pruneEmpty": () => (/* binding */ pruneEmpty),
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "encodeHTML": () => (/* binding */ encodeHTML),
/* harmony export */   "decodeHTML": () => (/* binding */ decodeHTML)
/* harmony export */ });
/**
 * @description 获取 url 查询参数
 * @param { string | string[] } name 参数 key，如果为数组，则返回多个
 * @param { string } [ href = location.href ] 目标 url，不传默认为当前 url，即 location.href
 * @return { string | string[] } 参数值 value，如果 name 为数组，则返回数组
 * @example
 * const href = 'https://www.baidu.com?name=tom&age=20'
 * getQueryString('name', href) // tom
 * getQueryString('age', href) // 20
 * getQueryString(['name', 'age'], href) // ['tom', '20']
 */
function getQueryString(name, href) {
    if (href === void 0) { href = location.href; }
    var getMatch = function (val) {
        var reg = new RegExp('(^|&)' + val + '=([^&]*)(&|$)', 'i');
        var match = query ? query.match(reg) : null;
        return match ? unescape(match[2]) : null;
    };
    var query = href.split('?')[1];
    if (isArray(name)) {
        return name.map(function (val) { return getMatch(val); });
    }
    return getMatch(name);
}
/**
 * @description 内容前补 0
 * @param { string | number } val 需要补 0 的内容
 * @param { number } [ count = 1 ] 0 的个数，默认为 1
 * @returns { string } 补 0 后的值
 * @example
 * fillz(1, 1) // '01'
 */
function fillz(val, count) {
    if (count === void 0) { count = 1; }
    return "" + Array(count).fill(0).join('') + val;
}
/**
 * @description 获取对象类型
 * @param { * } val 任意参数
 * @returns { string } 类型，Object、String 等
 * @example
 * toRawType({}) // Object
 * toRawType('') // String
 */
function toRawType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
}
/**
 * @description 是否为字符串
 * @param { * } val 任意参数
 * @returns { boolean } 结果
 * @example
 * isString('hello') // true
 */
function isString(val) {
    return toRawType(val) === 'String';
}
/**
 * @description 是否为对象
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */
function isObject(val) {
    return toRawType(val) === 'Object';
}
/**
 * @description 是否为数组
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */
function isArray(val) {
    return toRawType(val) === 'Array';
}
/**
 * @description 是否为日期
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */
function isDate(val) {
    return toRawType(val) === 'Date';
}
/**
 * @description 是否为数字
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */
function isNumber(val) {
    return toRawType(val) === 'Number';
}
/**
 * @description 是否为 Symbol
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */
function isSymbol(val) {
    return toRawType(val) === 'Symbol';
}
/**
 * @description Date 转字符串
 * @param { date } val Date 对象
 * @param { string } [ fmt = yyyy-MM-dd ] 格式，默认 yyyy-MM-dd
 * @returns { string } 转换后的日期
 * @example
 * formatDate(new Date()) // 2021-02-23
 * formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') // 2021-02-23 13:40:44
 */
function formatDate(val, fmt) {
    if (fmt === void 0) { fmt = 'yyyy-MM-dd'; }
    var map = {
        'y+': val.getFullYear(),
        'M+': val.getMonth() + 1,
        'd+': val.getDate(),
        'h+': val.getHours(),
        'm+': val.getMinutes(),
        's+': val.getSeconds()
    };
    Object.entries(map).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (new RegExp("(" + key + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (value < 10 ? fillz(value) : value));
        }
    });
    return fmt;
}
/**
 * @description 毫秒转时间
 * @param { string } val 毫秒数
 * @param { string } [ fmt = dd:hh:mm:ss ] 格式，默认 dd:hh:mm:ss
 * @returns { string } 转换后的时间
 * @example
 * formatTime(60 * 1000) // 00:00:01:00
 * formatTime(60 * 1000, 'dd 天 hh 小时 mm 分钟 ss 秒') // 00 天 00 小时 01 分钟 00 秒
 * formatTime(60 * 1000 * 1.5, 'dd 天 hh 小时 mm 分钟 ss 秒') // 00 天 00 小时 01 分钟 30 秒
 * formatTime(60 * 1000 * 1.5, 'mm 分钟 ss 秒') // 01 分钟 30 秒
 */
function formatTime(val, fmt) {
    if (fmt === void 0) { fmt = 'dd:hh:mm:ss'; }
    var secondMillisecond = 1000;
    var minuteMillisecond = secondMillisecond * 60;
    var hoursMillisecond = minuteMillisecond * 60;
    var dayMillisecond = hoursMillisecond * 24;
    var day = Math.floor(val / dayMillisecond);
    val = val - day * dayMillisecond;
    var hours = Math.floor(val / hoursMillisecond);
    val = val - hours * hoursMillisecond;
    var minute = Math.floor(val / minuteMillisecond);
    val = val - minute * minuteMillisecond;
    var second = Math.floor(val / secondMillisecond);
    var map = {
        'd+': day,
        'h+': hours,
        'm+': minute,
        's+': second
    };
    Object.entries(map).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (new RegExp("(" + key + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (value < 10 ? fillz(value) : value));
        }
    });
    return fmt;
}
/**
 * @description 将字符串转为数字，转换失败返回原参数
 * @param { * } val 要转换的对象
 * @returns { * } 成功返回数字，失败原样返回
 * @example
 * toNumber('1') // 1
 * toNumber('a') // 'a'
 */
function toNumber(val) {
    var fmt = Number(val);
    return isNaN(fmt) ? val : fmt;
}
/**
 * @description 获取当月第一天
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string | Date } 结果
 * @example
 * // 假设当前为 4 月
 * getFirstDateOfMonth() // Thu Apr 01 2021 00:00:00 GMT+0800 (中国标准时间)
 * getFirstDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-04-01 00:00:00
 * getFirstDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-05-01 00:00:00
 */
function getFirstDateOfMonth(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
    var date = new Date();
    date.setMonth(date.getMonth() + offset);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return fmt ? formatDate(date, fmt) : date;
}
/**
 * @description 获取当月最后一天
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string | Date } 结果
 * @example
 * // 假设当前为 4 月
 * getLastDateOfMonth() // Fri Apr 30 2021 23:59:59 GMT+0800 (中国标准时间)
 * getLastDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-04-30 23:59:59
 * getLastDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-05-31 23:59:59
 */
function getLastDateOfMonth(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
    var date = new Date();
    date.setMonth(date.getMonth() + 1 + offset);
    date.setDate(0);
    date.setHours(23, 59, 59, 999);
    return fmt ? formatDate(date, fmt) : date;
}
/**
 * @description 获取当月日期范围
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string[] | Date[] } 结果
 * @example
 * // 假设当前为 4 月
 * getRangeDateOfMonth() // [Thu Apr 01 2021 00:00:00 GMT+0800 (中国标准时间), Fri Apr 30 2021 23:59:59 GMT+0800 (中国标准时间)]
 * getRangeDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-01 00:00:00', '2021-04-30 23:59:59']
 * getRangeDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-05-01 00:00:00', '2021-05-31 23:59:59']
 */
function getRangeDateOfMonth(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
    var start = getFirstDateOfMonth({ offset: offset, fmt: fmt });
    var end = getLastDateOfMonth({ offset: offset, fmt: fmt });
    return [start, end];
}
/**
 * @description 获取当前日期所在周的日期范围，比如今天是 2021 年 4 月 22 日（周 4），那么就返回这周的开始日期和结束日期
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一周，1 表示下一周，默认为 0 当前周
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string[] | Date[] } 结果
 * @example
 * getRangeDateOfWeek() // [Mon Apr 19 2021 00:00:00 GMT+0800 (中国标准时间), Sun Apr 25 2021 23:59:59 GMT+0800 (中国标准时间)]
 * getRangeDateOfWeek({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-19 00:00:00', '2021-04-25 23:59:59']
 * getRangeDateOfWeek({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-26 00:00:00', '2021-05-02 23:59:59']
 */
function getRangeDateOfWeek(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
    var date = new Date();
    var current = date.getDate();
    var day = date.getDay() || 7;
    var start = new Date();
    start.setDate(current + (7 * offset + 1 - day));
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setDate(current + (7 * (offset + 1) - day));
    end.setHours(23, 59, 59, 999);
    return fmt ? [formatDate(start, fmt), formatDate(end, fmt)] : [start, end];
}
/**
 * @description 获取后缀
 * @param { string } val 路径
 * @param { boolean } [ toUpperCase = false ] 是否转大写，默认 false，即小写
 * @returns { string } 后缀
 * @example
 * getSuffix('xx.jpg') // jpg
 * getSuffix('xx.jpg', true) // JPG
 * getSuffix('xx.JPG') // jpg
 */
function getSuffix(val, toUpperCase) {
    if (toUpperCase === void 0) { toUpperCase = false; }
    var suffix = val.substr(val.lastIndexOf('.') + 1);
    return toUpperCase ? suffix.toUpperCase() : suffix.toLowerCase();
}
/**
 * @description 是否为 null、undefined 或者 ''
 * @param { * } val 任意参数
 * @returns { boolean } 结果
 * @example
 * isEmpty('') // true
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty(0) // false
 */
function isEmpty(val) {
    return val === null || val === undefined || val === '';
}
/**
 * @description 过滤对象空值属性
 * @param { object } val 要过滤的对象
 * @returns { object } 过滤后的对象
 * @example
 * const obj = {
 *   a: null,
 *   b: '',
 *   c: undefined,
 *   d: 'hello'
 * }
 * pruneEmpty(obj) // { d: hello }
 */
function pruneEmpty(val) {
    if (val) {
        var o_1 = {};
        Object.entries(val).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (!isEmpty(value)) {
                o_1[key] = value;
            }
        });
        return o_1;
    }
}
/**
 * @description 将对象内的对象、数组属性转成 json
 * @param { object } val 要转换的对象
 * @returns { object } 转换后的对象
 * @example
 * const obj = {
 *   a: [ 1, 2, 3 ],
 *   b: { a: 1 },
 *   c: 'hello'
 * }
 * serialize(obj) // { a: '[ 1, 2, 3 ]', b: '{ "a": 1 }', c: 'hello' }
 */
function serialize(val) {
    var o = {};
    Object.entries(val).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (isObject(value) || isArray(value)) {
            try {
                o[key] = JSON.stringify(value);
            }
            catch (error) {
                o[key] = value;
            }
        }
        else {
            o[key] = value;
        }
    });
    return o;
}
/**
 * @description 对 html 代码进行编码
 * @param { string } val html 代码
 * @returns { string } 编码后的字符串
 * @example
 * encodeHTML('<div>hello</div>') // &lt;div&gt;hello&lt;/div&gt;
 */
function encodeHTML(val) {
    var temp = document.createElement('div');
    temp.innerText = val;
    var output = temp.innerHTML;
    temp = null;
    return output;
}
/**
 * @description 与 encodeHTML 相反，对字符串进行 html 解码
 * @param { string } val 要解码的字符串
 * @returns { string } 解码后的 html
 * @example
 * decodeHTML('&lt;div&gt;hello&lt;/div&gt;') // <div>hello</div>
 */
function decodeHTML(val) {
    var temp = document.createElement('div');
    temp.innerHTML = val;
    var output = temp.innerText;
    temp = null;
    return output;
}


/***/ }),

/***/ 5506:
/***/ ((module) => {

"use strict";


module.exports = 2147483647;


/***/ }),

/***/ 4284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPosInt   = __webpack_require__(3902)
  , maxTimeout = __webpack_require__(5506);

module.exports = function (value) {
	value = toPosInt(value);
	if (value > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
	return value;
};


/***/ }),

/***/ 4417:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var memoize = __webpack_require__(4156);
var shared_js_api_1 = __webpack_require__(596);
// @ts-ignore
var vue_1 = __webpack_require__(4103);
// @ts-ignore
var vue_2 = __webpack_require__(4103);
var Dict = /** @class */ (function () {
    function Dict(config) {
        this.defaultConfig = {
            async: false,
            data: [],
            props: { label: 'label', value: 'value', children: 'children' }
        };
        this.isVue3 = !!vue_1.reactive;
        this.config = config;
        this.store = this.isVue3 ? vue_1.reactive({}) : vue_2.default.observable({});
        this.asyncMemo = this.createAsyncMemo();
        this.filterMemo = this.createFilterMemo();
    }
    Object.defineProperty(Dict.prototype, "reactive", {
        get: function () {
            var _this = this;
            return {
                get: function (key) {
                    if (!Reflect.has(_this.store, key))
                        _this.get(key);
                    return _this.store[key];
                },
                filter: function (options) {
                    var key = options.key;
                    if (!Reflect.has(_this.store, key)) {
                        _this.get(key);
                        return null;
                    }
                    return _this.getFilterValue(options);
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Dict.prototype.createAsyncMemo = function () {
        var _this = this;
        return memoize(function (key) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getConfig(key).data()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        this.deleteAsyncCache(key);
                        Promise.reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }, { promise: true });
    };
    Dict.prototype.createFilterMemo = function () {
        var _this = this;
        return memoize(function (key, value) {
            return _this.handleFilter(_this.store[key] || [], value, _this.getConfig(key).props);
        });
    };
    Dict.prototype.handleFilter = function (data, value, props) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (shared_js_api_1.toNumber(item[props.value]) === shared_js_api_1.toNumber(value))
                return item;
            var children = item[props.children];
            if (children) {
                var target = this.handleFilter(children, value, props);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Dict.prototype.addStoreProp = function (key, data) {
        if (!Reflect.has(this.store, key)) {
            this.isVue3 ? (this.store[key] = data) : vue_2.default.set(this.store, key, data);
        }
    };
    Dict.prototype.getFilterValue = function (options) {
        var key = options.key, value = options.value, returnLabel = options.returnLabel, propKey = options.propKey;
        var props = this.getConfig(key).props;
        var data = this.filterMemo(key, value);
        if (data) {
            if (returnLabel) {
                return data[props === null || props === void 0 ? void 0 : props.label];
            }
            if (propKey) {
                return Array.isArray(propKey) ? propKey.map(function (key) { return data[key]; }) : data[propKey];
            }
        }
        return data;
    };
    Dict.prototype.getConfig = function (key) {
        return __assign(__assign(__assign({}, this.defaultConfig), this.config[key]), { props: Object.assign({}, this.defaultConfig.props, this.config[key].props) });
    };
    Dict.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var target = _this.getConfig(key);
            if (target) {
                var async = target.async, data = target.data;
                if (async && typeof data === 'function') {
                    _this.asyncMemo(key).then(function (data) {
                        _this.addStoreProp(key, data);
                        resolve(data);
                    }).catch(function (err) { return reject(err); });
                }
                else {
                    _this.addStoreProp(key, data);
                    resolve(data);
                }
            }
        });
    };
    Dict.prototype.fetch = function (key) {
        this.deleteStoreProp(key);
        this.deleteAsyncCache(key);
        this.clearFilterCache();
        return this.get(key);
    };
    Dict.prototype.filter = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.get(options.key)
                .then(function () { return (resolve(_this.getFilterValue(options))); })
                .catch(function (err) { return reject(err); });
        });
    };
    Dict.prototype.deleteStoreProp = function (key) {
        return Reflect.deleteProperty(this.store, key);
    };
    Dict.prototype.deleteAsyncCache = function (key) {
        return this.asyncMemo.delete(key);
    };
    Dict.prototype.clearAsyncCache = function () {
        this.asyncMemo.clear();
    };
    Dict.prototype.clearFilterCache = function () {
        this.filterMemo.clear();
    };
    return Dict;
}());
exports.default = Dict;


/***/ }),

/***/ 372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isPrototype = __webpack_require__(6060);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ 3940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isValue = __webpack_require__(5618);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ 7205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isFunction = __webpack_require__(372);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ 6060:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isObject = __webpack_require__(3940);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ 5618:
/***/ ((module) => {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),

/***/ 4103:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__4103__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Dict_1 = __webpack_require__(4417);
exports.default = Dict_1.default;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});