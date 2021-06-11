// @ts-ignore
import Vue from 'vue'
// @ts-ignore
import { reactive } from 'vue'

const isVue3: boolean = !!reactive

class Store {
  private store: any

  constructor () {
    // @ts-ignore
    this.store = isVue3 ? reactive({}) : Vue.observable({})
  }

  set (key: string, value: any): void {
    // @ts-ignore
    isVue3 ? (this.store[key] = value) : (Vue.set(this.store, key, value))
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

export default Store
