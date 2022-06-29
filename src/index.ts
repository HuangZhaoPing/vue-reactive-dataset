
import memoize from './memoize'
import Store from './store'
import { DatasetOptions, GetOptions, FilterOptions } from '../types'

class Dataset {
  private options
  private store
  private memoFetch
  private memoFilter

  constructor (options: DatasetOptions) {
    options.max = options.max || 50
    this.options = options
    this.store = new Store()
    this.memoFetch = memoize(this.fetch, this.options.max)
    this.memoFilter = memoize(this.handleFilter, 1000)
  }

  get (options: GetOptions) {
    const { name, promise, params } = options
    const value = this.memoFetch(name, JSON.stringify(params))
    if (promise) {
      return value
    } else {
      return this.store.get(name)
    }
  }

  private async fetch (name: string, val: string) {
    const params = val ? JSON.parse(val) : val
    const data = this.options.config?.[name]?.data
    if (typeof data === 'function') {
      const value = await data(params)
      !this.store.has(name) && this.store.set(name, value)
      return value
    }
  }

  deleteCache (name: string) {
    this.memoFetch.delete(name)
    this.memoFilter.clear()
  }

  filter (options: FilterOptions) {
    const { name, promise, params } = options
    if (promise) {
      return this.get({ name, promise, params }).then(() => (
        this.getValue(options)
      ))
    } else {
      this.get({ name, promise, params })
      if (!this.store.get(name)) {
        return options.defaultValue
      } else {
        return this.getValue(options)
      }
    }
  }

  private handleFilter (name: string, value: any) {
    const props = this.getProps(name)
    const data = [...this.store.get(name)]
    let node = null
    /* eslint no-cond-assign: "off" */
    while (node = data.shift()) {
      if (node[props.value] === value) {
        return node
      } else {
        const children = node[props.children] || []
        data.push(...children)
      }
    }
    return null
  }

  getProps (name: string) {
    const defaultProps = {
      name: 'name',
      value: 'value',
      children: 'children'
    }
    return Object.assign({}, defaultProps, this.options.config[name].props)
  }

  private getValue (options: FilterOptions) {
    const { name, value, original, fields } = options
    const props = this.getProps(name)
    const target = this.memoFilter(name, value)
    if (!target) return null
    if (original) return target
    if (Array.isArray(fields)) return fields.map((key: string) => target[key])
    return target[props.name]
  }
}

export default Dataset
