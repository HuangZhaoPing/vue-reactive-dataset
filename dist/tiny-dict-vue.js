/* version: 1.1.3 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('shared-js-api'), require('mini-memoize')) :
    typeof define === 'function' && define.amd ? define(['vue', 'shared-js-api', 'mini-memoize'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['TINY-DICT-VUE'] = factory(global.Vue, global['SHARED-JS-API'], global['MINI-MEMOIZE']));
}(this, (function (Vue, sharedJsApi, memoize) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var memoize__default = /*#__PURE__*/_interopDefaultLegacy(memoize);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    // @ts-ignore
    var isVue3 = !!Vue.reactive;
    var Store = /** @class */ (function () {
        function Store() {
            // @ts-ignore
            this.store = isVue3 ? Vue.reactive({}) : Vue__default['default'].observable({});
        }
        Store.prototype.set = function (key, value) {
            // @ts-ignore
            isVue3 ? (this.store[key] = value) : (Vue__default['default'].set(this.store, key, value));
        };
        Store.prototype.get = function (key) {
            return this.store[key];
        };
        Store.prototype.has = function (key) {
            return Reflect.has(this.store, key);
        };
        Store.prototype.delete = function (key) {
            return Reflect.deleteProperty(this.store, key);
        };
        return Store;
    }());

    var defaultProps = {
        name: 'name',
        value: 'value',
        children: 'children'
    };
    var Dict = /** @class */ (function () {
        function Dict(options) {
            var max = options.max, config = options.config;
            this.store = new Store();
            this.config = config;
            this.max = max || 100;
            this.asyncMemo = memoize__default['default'](this.asyncMemoHandler, { max: this.max });
            this.filterMemo = memoize__default['default'](this.filterMemoHandler, { max: 1000 });
        }
        Object.defineProperty(Dict.prototype, "reactive", {
            get: function () {
                var _this = this;
                return {
                    get: function (key) {
                        if (!_this.store.has(key)) {
                            _this.get(key);
                            return null;
                        }
                        return _this.store.get(key);
                    },
                    filter: function (options) {
                        if (!_this.store.has(options.key)) {
                            _this.get(options.key);
                            return null;
                        }
                        return _this.handleFilter(options);
                    }
                };
            },
            enumerable: false,
            configurable: true
        });
        Dict.prototype.get = function (key) {
            var _this = this;
            var data = this.config[key].data;
            if (sharedJsApi.isArray(data)) {
                this.store.set(key, data);
                return data;
            }
            if (sharedJsApi.isFunction(data)) {
                return this.asyncMemo(key).then(function (res) {
                    _this.store.set(key, res);
                    return res;
                });
            }
        };
        Dict.prototype.filter = function (options) {
            var _this = this;
            var data = this.get(options.key);
            if (sharedJsApi.isArray(data)) {
                return this.handleFilter(options);
            }
            if (sharedJsApi.isFunction(data)) {
                return data.then(function () {
                    return _this.handleFilter(options);
                });
            }
        };
        Dict.prototype.asyncMemoHandler = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.config[key].data()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Dict.prototype.filterMemoHandler = function (key, value) {
            var data = this.store.get(key);
            var props = Object.assign(defaultProps, this.config[key].props || {});
            return this.getFilterResult(data, value, props);
        };
        Dict.prototype.getFilterResult = function (data, value, props) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item[props.value] === value)
                    return item;
                if (item[props.children]) {
                    var result = this.getFilterResult(item[props.children], value, props);
                    if (result)
                        return result;
                }
            }
            return null;
        };
        Dict.prototype.handleFilter = function (options) {
            var key = options.key, value = options.value, fields = options.fields;
            var result = this.filterMemo(key, value);
            if (result && fields) {
                return Array.isArray(fields) ? fields.map(function (key) { return result[key]; }) : result[fields];
            }
            return result;
        };
        Dict.prototype.getProps = function (key) {
            return Object.assign(defaultProps, this.config[key].props);
        };
        Dict.prototype.deleteCache = function (key) {
            var result = this.asyncMemo.delete(key);
            if (result) {
                this.filterMemo.delete(function (args) { return args.includes(key); });
            }
            return result;
        };
        Dict.prototype.clearCache = function () {
            this.filterMemo.clear();
            this.asyncMemo.clear();
        };
        return Dict;
    }());

    return Dict;

})));
