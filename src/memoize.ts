import Cache from './cache'
import { Memoize } from '../types'

const { stringify } = JSON

export default function <T extends (...args: any[]) => any> (fn: T, max?: number): Memoize<T> {
  const cache = new Cache(max)

  const memoize = <Memoize<T>> function (...args: any[]) {
    if (args.length === 0) return fn.call(this)
    const key = stringify(args)
    let value = cache.get(key)
    if (!value) {
      value = fn.call(this, ...args)
      cache.set(key, value)
    }
    return value
  }

  memoize.delete = function (...args: any[]) {
    return cache.delete(stringify(args))
  }

  memoize.clear = function () {
    return cache.clear()
  }

  return memoize
}
