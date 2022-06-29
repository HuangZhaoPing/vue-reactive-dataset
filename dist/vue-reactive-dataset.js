/* version: 1.0.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["VUE-REACTIVE-DATASET"] = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  class Cache {
      max;
      cache;
      constructor(max = 0) {
          this.max = max;
          this.cache = new Map();
      }
      get(key) {
          const value = this.cache.get(key);
          if (value) {
              this.delete(key);
              this.set(key, value);
          }
          return value;
      }
      set(key, value) {
          if (this.max !== 0 && this.cache.size === this.max) {
              this.delete(this.keys()[0]);
          }
          this.cache.set(key, value);
      }
      delete(key) {
          return this.cache.delete(key);
      }
      clear() {
          return this.cache.clear();
      }
      has(key) {
          return this.cache.has(key);
      }
      keys() {
          return Array.from(this.cache.keys());
      }
  }

  const { stringify } = JSON;
  function memoize (fn, max) {
      const cache = new Cache(max);
      const memoize = function (...args) {
          if (args.length === 0)
              return fn.call(this);
          const key = stringify(args);
          let value = cache.get(key);
          if (!value) {
              value = fn.call(this, ...args);
              cache.set(key, value);
          }
          return value;
      };
      memoize.delete = function (...args) {
          return cache.delete(stringify(args));
      };
      memoize.clear = function () {
          return cache.clear();
      };
      return memoize;
  }

  class Store {
      store;
      constructor() {
          this.store = vue.reactive({});
      }
      set(key, value) {
          this.store[key] = value;
      }
      get(key) {
          return this.store[key];
      }
      has(key) {
          return Reflect.has(this.store, key);
      }
      delete(key) {
          return Reflect.deleteProperty(this.store, key);
      }
  }

  class Dataset {
      options;
      store;
      memoFetch;
      memoFilter;
      constructor(options) {
          options.max = options.max || 50;
          this.options = options;
          this.store = new Store();
          this.memoFetch = memoize(this.fetch, this.options.max);
          this.memoFilter = memoize(this.handleFilter, 1000);
      }
      get(options) {
          const { name, promise, params } = options;
          const value = this.memoFetch(name, JSON.stringify(params));
          if (promise) {
              return value;
          }
          else {
              return this.store.get(name);
          }
      }
      async fetch(name, val) {
          const params = val ? JSON.parse(val) : val;
          const data = this.options.config?.[name]?.data;
          if (typeof data === 'function') {
              const value = await data(params);
              !this.store.has(name) && this.store.set(name, value);
              return value;
          }
      }
      deleteCache(name) {
          this.memoFetch.delete(name);
          this.memoFilter.clear();
      }
      filter(options) {
          const { name, promise, params } = options;
          if (promise) {
              return this.get({ name, promise, params }).then(() => (this.getValue(options)));
          }
          else {
              this.get({ name, promise, params });
              if (!this.store.get(name)) {
                  return options.defaultValue;
              }
              else {
                  return this.getValue(options);
              }
          }
      }
      handleFilter(name, value) {
          const props = this.getProps(name);
          const data = [...this.store.get(name)];
          let node = null;
          /* eslint no-cond-assign: "off" */
          while (node = data.shift()) {
              if (node[props.value] === value) {
                  return node;
              }
              else {
                  const children = node[props.children] || [];
                  data.push(...children);
              }
          }
          return null;
      }
      getProps(name) {
          const defaultProps = {
              name: 'name',
              value: 'value',
              children: 'children'
          };
          return Object.assign({}, defaultProps, this.options.config[name].props);
      }
      getValue(options) {
          const { name, value, original, fields } = options;
          const props = this.getProps(name);
          const target = this.memoFilter(name, value);
          if (!target)
              return null;
          if (original)
              return target;
          if (Array.isArray(fields))
              return fields.map((key) => target[key]);
          return target[props.name];
      }
  }

  return Dataset;

}));
