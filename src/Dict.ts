import { DictOptions, DictConfig, AsyncMemo, FilterMemo, FilterOptions, DictProps, ValueType } from 'types'
import Store from './Store'
import { isArray, isFunction } from 'shared-js-api'
import memoize from 'mini-memoize'

const defaultProps: DictProps = {
  name: 'name',
  value: 'value',
  children: 'children'
}

export default class Dict {
  private store: Store
  private config: Record<string, DictConfig>
  private max: number
  private asyncMemo: AsyncMemo
  private filterMemo: FilterMemo

  constructor (options: DictOptions) {
    const { max, config } = options
    this.store = new Store()
    this.config = config
    this.max = max || 100
    this.asyncMemo = memoize(this.asyncMemoHandler, { max: this.max })
    this.filterMemo = memoize(this.filterMemoHandler, { max: 1000 })
  }

  get reactive () {
    return {
      get: (key: string): any => {
        if (!this.store.has(key)) {
          this.get(key)
          return null
        }
        return this.store.get(key)
      },
      filter: (options: FilterOptions): any => {
        if (!this.store.has(options.key)) {
          this.get(options.key)
          return null
        }
        return this.handleFilter(options)
      }
    }
  }

  get (key: string) {
    const { data } = this.config[key]
    if (isArray(data)) {
      this.store.set(key, data)
      return data
    }
    if (isFunction(data)) {
      return this.asyncMemo(key).then((res: any) => {
        this.store.set(key, res)
        return res
      })
    }
  }

  filter (options: FilterOptions) {
    const data = this.get(options.key)
    if (isArray(data)) {
      return this.handleFilter(options)
    }
    if (isFunction(data)) {
      return data.then(() => {
        return this.handleFilter(options)
      })
    }
  }

  private async asyncMemoHandler (key: string) {
    return await this.config[key].data()
  }

  private filterMemoHandler (key: string, value: ValueType) {
    const data = this.store.get(key)
    const props = Object.assign(defaultProps, this.config[key].props || {})
    return this.getFilterResult(data, value, props)
  }

  private getFilterResult (data: any, value: ValueType, props: DictProps): any {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (item[props.value!] === value) return item
      if (item[props.children!]) {
        const result = this.getFilterResult(item[props.children!], value, props)
        if (result) return result
      }
    }
    return null
  }

  private handleFilter (options: FilterOptions) {
    const { key, value, fields } = options
    const result = this.filterMemo(key, value)
    if (result && fields) {
      return Array.isArray(fields) ? fields.map(key => result[key]) : result[fields];
    }
    return result
  }

  getProps (key: string): DictProps {
    return Object.assign(defaultProps, this.config[key].props)
  }

  deleteCache (key: string): boolean {
    const result = this.asyncMemo.delete(key)
    if (result) {
      this.filterMemo.delete((args: any[]) => args.includes(key))
    }
    return result
  }

  clearCache () {
    this.filterMemo.clear()
    this.asyncMemo.clear()
  }
}
