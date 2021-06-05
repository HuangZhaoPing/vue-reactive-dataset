import { DictConfig, DictOptions, DictProps, ReactiveOptions, FilterOptions } from 'types'
import * as memoize from 'memoizee'
import { toNumber } from 'shared-js-api'
// @ts-ignore
import { reactive } from 'vue'
// @ts-ignore
import Vue from 'vue'

export default class Dict {
  private defaultProps: DictProps = { label: 'label', value: 'value', children: 'children' }
  private isVue3: boolean = !!reactive
  private config: DictOptions
  private store: any
  private asyncMemo: ((key: string) => Promise<any>) & memoize.Memoized<(key: string) => Promise<any>>
  private filterMemo: ((key: string, value: string | number) => any) & memoize.Memoized<(key: string, value: string | number) => any>
  
  constructor (config: DictOptions) {
    this.config = config
    this.store = this.isVue3 ? reactive({}) : Vue.observable({})
    this.asyncMemo = this.createAsyncMemo()
    this.filterMemo = this.createFilterMemo()
  }
  get reactive () {
    return {
      get: (key: string): ReactiveOptions => {
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
  private createAsyncMemo (): ((key: string) => Promise<any>) & memoize.Memoized<(key: string) => Promise<any>> {
    return memoize(async (key: string) => {
      try {
        return await this.getConfig(key).data()
      } catch (error) {
        this.deleteAsyncCache(key)
        Promise.reject(error)
      }
    }, { promise: true }) 
  }
  private createFilterMemo (): ((key: string, value: string | number) => any) & memoize.Memoized<(key: string, value: string | number) => any> {
    return memoize((key: string, value: string | number) => {
      return this.handleFilter(this.store[key] || [], value, this.getMergeProps(key))
    })
  }
  private handleFilter (data: any, value: string | number, props: DictProps): any {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (toNumber(item[props.value as string]) === toNumber(value)) return item
      const children = item[props.children as string]
      if (children) {
        const target = this.handleFilter(children, value, props)
        if (target) return target
      }
    }
    return null
  }
  private addStoreProp (key: string, data: any) {
    if (!Reflect.has(this.store, key)) {
      this.isVue3 ? (this.store[key] = data) : Vue.set(this.store, key, data)
    }
  }
  private getFilterValue (options: FilterOptions): any {
    const { key, value, returnLabel, propKey } = options
    const data = this.filterMemo(key, value)
    if (data) {
      if (returnLabel) {
        return data[this.getMergeProps(key).label as string]
      }
      if (propKey) {
        console.log(propKey)
        return Array.isArray(propKey) ? propKey.map((key: string) => data[key]) : data[propKey]
      }
    }
    return data
  }
  private getMergeProps (key: string): DictProps {
    return Object.assign({}, this.defaultProps, this.getConfig(key).props)
  }
  getConfig (key: string): DictConfig {
    return this.config[key]
  }
  get (key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const target = this.getConfig(key)
      if (target) {
        const { async, data } = target
        if (async && typeof data === 'function') {
          this.asyncMemo(key).then((data: any) => {
            this.addStoreProp(key, data)
            resolve(data)
          }).catch((err: Error) => reject(err))
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
      this.get(options.key)
        .then(() => (resolve(this.getFilterValue(options))))
        .catch(err => reject(err))
    })
  }
  deleteStoreProp (key: string): boolean {
    return Reflect.deleteProperty(this.store, key)
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
