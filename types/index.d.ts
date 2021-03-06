
interface DatasetProps {
  name?: string
  value?: string
  children?: string
}

interface DatasetConfig {
  data (params?: Record<string, any>): any
  props?: DatasetProps
}

interface DatasetOptions {
  max?: number
  config: Record<string, DatasetConfig>
}

interface GetOptions {
  name: string,
  params?: Record<string, any>,
  promise?: boolean
}

interface DeleteCacheOptions {
  name: string,
  params?: Record<string, any>
}

interface FilterOptions {
  name: string
  value: any,
  params?: Record<string, any>,
  promise?: boolean,
  original?: boolean,
  fields?: string[],
  defaultValue?: string
}

type Memoize<T> = T & {
  delete (...args: any[]): boolean
  clear (): void
}

declare class Dataset {
  constructor (options: DatasetOptions)
  get (options: GetOptions): any
  delete (name: string): void
  clear (): void
  filter (options: FilterOptions): any
  getProps (name: string): DatasetProps
}

export {
  DatasetProps,
  DatasetConfig,
  DatasetOptions,
  FilterOptions,
  GetOptions,
  Memoize,
  Dataset,
  DeleteCacheOptions
}

export default Dataset
