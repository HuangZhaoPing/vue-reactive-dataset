import { Memoize } from 'mini-memoize'

type ValueType = string | number | boolean
declare interface DictProps {
  name?: string
  value?: string
  children?: string
}

declare interface DictConfig {
  props?: DictProps,
  data: any | Promise<any>
}

declare interface DictOptions {
  max?: number
  config: Record<string, DictConfig>
}

declare interface ReactiveOptions {
  get (key: string): any
  filter (options: FilterOptions): any
}

declare class Dict {
  constructor (options: DictOptions)
  get reactive (): ReactiveOptions
  getProps (key: string): DictProps
  get (key: string): any | Promise<any>
  filter (options: FilterOptions): any | Promise<any>
  deleteCache (key: string): boolean
  clearCache (): void
}

declare interface FilterOptions {
  key: string
  value: ValueType
  fields?: string | string[]
}

declare class Store {
  constructor()
  set (key: string, value: any): void
  get (key: string): any
  has (key: string): boolean
  delete (key: string): boolean
}

declare type AsyncMemo = Memoize<(key: string) => Promise<any>>
declare type FilterMemo = Memoize<(key: string, value: ValueType) => any>

export {
  ReactiveOptions,
  DictConfig,
  DictOptions,
  DictProps,
  FilterOptions,
  Store,
  AsyncMemo,
  FilterMemo,
  ValueType
}

export default Dict
