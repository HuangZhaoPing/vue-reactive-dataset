import { DictConfig, DictOptions, DictProps, ReactiveOptions, FilterOptions, MaxOptions } from 'types'
import * as memoize from 'memoizee'
import { toNumber } from 'shared-js-api'
// @ts-ignore
import { reactive } from 'vue'
// @ts-ignore
import Vue from 'vue'

const isVue3: boolean = !!reactive
const defaultConfig: DictConfig = {
  async: false,
  data: [],
  props: { label: 'label', value: 'value', children: 'children' }
}
const defaultMax: MaxOptions = {
  async: 50,
  filter: 100
}

export default class Dict {
  private config: Record<string, DictConfig>
  private store: any
  private asyncMemo: ((key: string) => Promise<any>) & memoize.Memoized<(key: string) => Promise<any>>
  private filterMemo: ((key: string, value: string | number) => any) & memoize.Memoized<(key: string, value: string | number) => any>
  private max: MaxOptions
  
  constructor (options: DictOptions) {
    this.config = options.config
    this.max = Object.assign(defaultMax, options.max)
    this.store = isVue3 ? reactive({}) : Vue.observable({})
    this.asyncMemo = this.createAsyncMemo()
    this.filterMemo = this.createFilterMemo()
  }
  get reactive (): ReactiveOptions {
    return {
      get: (key: string): any => {
        if (!Reflect.has(this.store, key)) this.get(key)
        return this.store[key]
      },
      filter: (options: FilterOptions): any => {
        const key = options.key
        if (!Reflect.has(this.store, key)) {
          this.get(key)
          return null
        }
        return this.getFilterValue(options)
      }
    }
  }
  private createAsyncMemo () {
    const func = async (key: string) => {
      try {
        return await this.getConfig(key).data()
      } catch (error) {
        this.deleteAsyncCache(key)
        Promise.reject(error)
      }
    }
    const options = { promise: true, max: this.max.async }
    return memoize(func, options) 
  }
  private createFilterMemo () {
    const func = (key: string, value: string | number) => {
      return this.excuteFilter(this.store[key], value, this.getConfig(key).props!)
    }
    const options = { max: this.max.filter }
    return memoize(func, options)
  }
  private excuteFilter (data: any, value: string | number, props: DictProps): any {
    if (!data) return null
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (toNumber(item[props.value!]) === toNumber(value)) return item
      const children = item[props.children!]
      if (children) {
        const target = this.excuteFilter(children, value, props)
        if (target) return target
      }
    }
    return null
  }
  private addStoreProp (key: string, data: any) {
    if (!Reflect.has(this.store, key)) isVue3 ? (this.store[key] = data) : Vue.set(this.store, key, data)
  }
  private deleteStoreProp (key: string): boolean {
    return Reflect.deleteProperty(this.store, key)
  }
  private getFilterValue (options: FilterOptions) {
    const { key, value, returnLabel, propKey } = options
    const props = this.getConfig(key).props
    const data = this.filterMemo(key, value)
    if (data) {
      if (returnLabel) return data[props?.label!]
      if (propKey) return Array.isArray(propKey) ? propKey.map((key: string) => data[key]) : data[propKey]
    }
    return data
  }
  getConfig (key: string): DictConfig {
    const config = Object.assign({}, defaultConfig, this.config[key])
    config.props = Object.assign({}, defaultConfig.props, this.config[key].props)
    return config
  }
  get (key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = this.getConfig(key)
      if (!config) {
        resolve([])
      } else {
        const { async, data } = config
        if (async && typeof data === 'function') {
          this.asyncMemo(key)
            .then((data: any) => {
              this.addStoreProp(key, data)
              resolve(data)
            })
            .catch((err: Error) => reject(err))
        } else {
          this.addStoreProp(key, data)
          resolve(data)
        }
      }
    })
  }
  fetch (key: string): Promise<any> {
    this.deleteStoreProp(key)
    this.deleteAsyncCache(key)
    this.clearFilterCache()
    return this.get(key)
  }
  filter (options: FilterOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this
        .get(options.key)
        .then(() => (resolve(this.getFilterValue(options))))
        .catch(err => reject(err))
    })
  }
  deleteAsyncCache (key: string): Promise<any> {
    return this.asyncMemo.delete(key)
  }
  clearAsyncCache () {
    this.asyncMemo.clear()
  }
  clearFilterCache () {
    this.filterMemo.clear()
  }
}
