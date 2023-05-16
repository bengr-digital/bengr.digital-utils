import { arrayToNestedObject } from './utils.array.js'
import { mergeObjects } from './utils.object.js'
import { splitAt, stringToType } from './utils.string.js'

/**
 * Reverse process for serialize. Load object from string in right format.
 * ```js
 * unSerialize("user[name]=matej&user[address][city]=Prague")
 * ==> return { user: { name: 'matej', address: { city: 'Prague' } } }
 * ```
 *
 * @param string string in right format
 * @returns {Object} object
 */
export const unSerialize = (string: string) => {
  return string
    ? mergeObjects(
        ...string
          .split('&')
          .map((v) => v.split('=') as [string, string])
          .map((v) => [splitAt(v[0], v[0].indexOf('[')), v[1]] as [string[], string])
          .map((v) => [v[0][0], arrayToNestedObject(v[0][1].match(/\[.*?\]/g)?.map((v: string) => v.slice(1, -1)) || [], stringToType(decodeURI(v[1])))])
          .map((v) => Object.fromEntries([v]))
      )
    : {}
}

/**
 * Convert object to string. Usefull for save object to URL.
 * ```js
 * serialize({ user: { name: 'matej', address: { city: 'Prague' } } })
 * ==> return "user[name]=matej&user[address][city]=Prague"
 * ```
 *
 * @param obj whatever object
 * @param prefix **(optional)** prefix for first key
 * @returns string
 */
export const serialize = (obj: { [x: string]: any }, prefix: string = ''): string => {
  let str = [],
    p

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p]

      if (v !== undefined && v !== '' && v !== false) {
        str.push(v !== null && typeof v === 'object' ? serialize(v, k) : k + '=' + v)
      }
    }
  }
  return str.filter((v) => v).join('&')
}
