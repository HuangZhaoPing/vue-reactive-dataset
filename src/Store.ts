import { reactive } from 'vue'

export default class Store {
  private store: any

  constructor () {
    this.store = reactive({})
  }

  set (key: string, value: any) {
    this.store[key] = value
  }

  get (key: string): any {
    return this.store[key]
  }

  has (key: string): boolean {
    return Reflect.has(this.store, key)
  }

  delete (key: string): boolean {
    return Reflect.deleteProperty(this.store, key)
  }
}
