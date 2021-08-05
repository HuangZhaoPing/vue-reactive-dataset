/* version: 1.1.0 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('mini-memoize')) :
    typeof define === 'function' && define.amd ? define(['vue', 'mini-memoize'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['TINY-DICT-VUE'] = factory(global.Vue, global['MINI-MEMOIZE']));
}(this, (function (Vue, memoize) { 'use strict';

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

    var defaultConfig = {
        async: false,
        props: { label: 'label', value: 'value', children: 'children' }
    };
    var Dict = /** @class */ (function () {
        function Dict(options) {
            this.config = options.config;
            this.max = options.max;
            this.store = new Store();
            this.asyncMemo = memoize__default['default'](this.asyncHandler, { max: this.max });
            this.filterMemo = memoize__default['default'](this.filterHandler);
        }
        Object.defineProperty(Dict.prototype, "reactive", {
            get: function () {
                var _this = this;
                return {
                    get: function (key) {
                        if (!_this.store.has(key))
                            _this.get(key);
                        return _this.store.get(key);
                    },
                    filter: function (options) {
                        var key = options.key;
                        if (!_this.store.has(key)) {
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
        Dict.prototype.asyncHandler = function (key) {
            return __awaiter(this, void 0, void 0, function () {
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
            });
        };
        Dict.prototype.filterHandler = function (key, value) {
            return this.excuteFilter(this.store.get(key), value, this.getConfig(key).props);
        };
        Dict.prototype.excuteFilter = function (data, value, props) {
            if (!data)
                return null;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (toNumber(item[props.value]) === toNumber(value))
                    return item;
                var children = item[props.children];
                if (children) {
                    var target = this.excuteFilter(children, value, props);
                    if (target)
                        return target;
                }
            }
            return null;
        };
        Dict.prototype.getFilterValue = function (options) {
            var key = options.key, value = options.value, returnLabel = options.returnLabel, propKey = options.propKey;
            var props = this.getConfig(key).props;
            var data = this.filterMemo(key, value);
            if (data) {
                if (returnLabel)
                    return data[props === null || props === void 0 ? void 0 : props.label];
                if (propKey)
                    return Array.isArray(propKey) ? propKey.map(function (key) { return data[key]; }) : data[propKey];
            }
            return data;
        };
        Dict.prototype.getConfig = function (key) {
            var config = Object.assign({}, defaultConfig, this.config[key]);
            config.props = Object.assign({}, defaultConfig.props, this.config[key].props);
            return config;
        };
        Dict.prototype.get = function (key) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var config = _this.getConfig(key);
                if (!config) {
                    resolve([]);
                }
                else {
                    var async = config.async, data = config.data;
                    if (async && typeof data === 'function') {
                        _this.asyncMemo(key)
                            .then(function (data) {
                            _this.store.set(key, data);
                            resolve(data);
                        })
                            .catch(function (err) { return reject(err); });
                    }
                    else {
                        _this.store.set(key, data);
                        resolve(data);
                    }
                }
            });
        };
        Dict.prototype.filter = function (options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this
                    .get(options.key)
                    .then(function () { return (resolve(_this.getFilterValue(options))); })
                    .catch(function (err) { return reject(err); });
            });
        };
        Dict.prototype.deleteFilterCache = function (key, value) {
            return this.filterMemo.delete(key, value);
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

    return Dict;

})));
