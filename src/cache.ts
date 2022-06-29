export default class Cache <K, V> {
  private max: number
  private cache: Map<K, V>

  constructor (max: number = 0) {
    this.max = max
    this.cache = new Map()
  }

  get (key: K) {
    const value = this.cache.get(key)
    if (value) {
      this.delete(key)
      this.set(key, value)
    }
    return value
  }

  set (key: K, value: V) {
    if (this.max !== 0 && this.cache.size === this.max) {
      this.delete(this.keys()[0])
    }
    this.cache.set(key, value)
  }

  delete (key: K) {
    return this.cache.delete(key)
  }

  clear () {
    return this.cache.clear()
  }

  has (key: K) {
    return this.cache.has(key)
  }

  keys () {
    return Array.from(this.cache.keys())
  }
}
