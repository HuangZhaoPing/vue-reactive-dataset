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

declare interface MaxOptions {
  filter?: number
  async?: number
}

declare interface DictOptions {
  max?: MaxOptions
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
  fetch (key: string): Promise<any>
  filter (options: FilterOptions): Promise<any>
  deleteStoreProp (key: string): boolean
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

export {
  ReactiveOptions,
  DictConfig,
  DictOptions,
  DictProps,
  FilterOptions,
  MaxOptions
}

export default Dict
