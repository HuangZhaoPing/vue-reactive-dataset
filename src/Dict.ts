import { DictConfig, DictOptions, DictProps, ReactiveOptions, FilterOptions, AsyncMemo, FilterMemo } from 'types'
import Store from './Store'
import memoize from 'mini-memoize'
import { toNumber } from 'shared-js-api'

const defaultConfig = {
  async: false,
  props: { label: 'label', value: 'value', children: 'children' }
}

export default class Dict {
  private config: Record<string, DictConfig>
  private store: Store
  private asyncMemo: AsyncMemo
  private filterMemo: FilterMemo
  private max: number | undefined
  
  constructor (options: DictOptions) {
    this.config = options.config
    this.max = options.max
    this.store = new Store()
    this.asyncMemo = memoize(this.asyncHandler, { max: <number>this.max })
    this.filterMemo = memoize(this.filterHandler)
  }

  get reactive (): ReactiveOptions {
    return {
      get: (key: string): any => {
        if (!this.store.has(key)) this.get(key)
        return this.store.get(key)
      },
      filter: (options: FilterOptions): any => {
        const key = options.key
        if (!this.store.has(key)) {
          this.get(key)
          return null
        }
        return this.getFilterValue(options)
      }
    }
  }

  private async asyncHandler (key: string) {
    try {
      return await this.getConfig(key).data()
    } catch (error) {
      this.deleteAsyncCache(key)
      Promise.reject(error)
    }
  }

  private filterHandler (key: string, value: string | number) {
    return this.excuteFilter(this.store.get(key), value, this.getConfig(key).props!)
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
              this.store.set(key, data)
              resolve(data)
            })
            .catch((err: Error) => reject(err))
        } else {
          this.store.set(key, data)
          resolve(data)
        }
      }
    })
  }

  filter (options: FilterOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this
        .get(options.key)
        .then(() => (resolve(this.getFilterValue(options))))
        .catch(err => reject(err))
    })
  }

  deleteFilterCache (key: string, value: string | number): boolean {
    return this.filterMemo.delete(key, value)
  }
  
  deleteAsyncCache (key: string): boolean {
    return this.asyncMemo.delete(key)
  }

  clearAsyncCache () {
    this.asyncMemo.clear()
  }
  
  clearFilterCache () {
    this.filterMemo.clear()
  }
}
