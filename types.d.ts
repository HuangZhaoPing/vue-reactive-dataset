import { Memoize } from 'mini-memoize'

declare interface DictProps {
  label?: string
  value?: string
  children?: string
}

declare interface DictConfig {
  async?: boolean,
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
  getConfig (key: string): DictConfig
  get (key: string): Promise<any>
  filter (options: FilterOptions): Promise<any>
  deleteFilterCache (key: string, value: string | number): boolean
  deleteAsyncCache (key: string): Promise<any>
  clearAsyncCache (): void
  clearFilterCache (): void
}

declare interface FilterOptions {
  key: string
  value: string | number
  returnLabel?: boolean
  propKey?: string | string[]
}

declare class Store {
  constructor()
  set (key: string, value: any): void
  get (key: string): any
  has (key: string): boolean
  delete (key: string): boolean
}

declare type AsyncMemo = Memoize<(key: string) => Promise<any>>
declare type FilterMemo = Memoize<(key: string, value: string | number) => any>

export {
  ReactiveOptions,
  DictConfig,
  DictOptions,
  DictProps,
  FilterOptions,
  Store,
  AsyncMemo,
  FilterMemo
}

export default Dict
