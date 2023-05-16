import { NestedPaths, TypeFromPath, GenericObject, Split, NestedValues } from './utils.types.js'

/**
 * Map nested object
 * @returns mapped object
 */
/*
export const mapObject = <T extends GenericObject>(object: T, map: (value: NestedValues<T>) => any): T & GenericObject => {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(object).map((entry: any) => {
      const key = entry[0]
      const value = entry[1]
      // @ts-ignore
      if (typeof value === 'object') return [key, mapObject(value, map)]
      else return [key, map(value)]
    })
  )
}
*/

/**
 * Function will merge more object to one.
 *
 * Cant handle object with same keyes and values.
 *
 * ```js
 * mergeObjects(
 * { user: { name: 'Pepa', address: { code: 74453 } } },
 * { user: { name: 'Franta', age: 30, address: { city: 'Praque' } }}
 * )
 * ==> return { name: 'Pepa', age: 30, address: { code: 74453, city: 'Praque' } }
 * ```
 * @param objects array
 * @returns object
 */
export function mergeObjects(...objects: GenericObject[]) {
  let result = {} as any,
    obj

  for (var i = 0; i < arguments.length; i++) {
    obj = arguments[i]
    for (let key in obj) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        if (typeof result[key] === 'undefined') {
          result[key] = {}
        }
        result[key] = mergeObjects(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

/**
 * This function can remove some property from nested object, just with string of her path
 * ```js
 * removeProperty({ user: { name: 'Pepa', address: { code: 74453 } } }, "address.code")
 * ==> return {user: { name: 'Pepa', address: {} } }
 * ```
 *
 * @param object some object
 * @param path path of property
 * @returns object wthout property
 */
export function removeProperty<T extends GenericObject>(object: T, path: string) {
  let copy = JSON.parse(JSON.stringify(object))
  // @ts-ignore
  let arr = path.split('.')
  let last = arr.pop()
  delete arr.reduce((o: any, k: any) => o[k] || {}, copy)[last as string]

  return copy
}

/**
 * Function that can return nexted object with new property.
 *
 * If property dont exist, it will create it. If property exist, it will edit it.
 * ```js
 * setProperty({ user: { name: 'Pepa' } }, "user.address.city", "Prague")
 * ==> return { user: { name: 'Pepa', address: { city: 'Prague' } } }
 * ```
 *
 * @param object some object
 * @param path path of property
 * @param value value of property
 * @returns object with new property
 */
export function setProperty<T extends GenericObject, P extends string>(
  path: P,
  // @ts-ignore
  value: TypeFromPath<T, P> extends never ? unknown : TypeFromPath<T, P>,
  object?: T
) {
  if (!object) object = {} as any
  let schema: any = object // a moving reference to internal objects within obj
  const keys = (path as any).split('.')
  for (let i = 0; i < keys.length - 1; i++) {
    let elem = keys[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }

  schema[keys[keys.length - 1]] = value

  return object as T & GenericObject
}

/**
 * For getting value from nested object.
 *
 * ```js
 * getProperty("user.address.city", { user: { address: { city: "Prague" } } })
 * ==> return "Prague"
 * ```
 *
 * @param path path of property
 * @param object some object
 * @param separator **(optional)** separator in path
 * @returns value of property
 */
export const getProperty = (path: string, obj = self, separator = '.') => {
  var properties = Array.isArray(path) ? path : path.split(separator)
  return properties.reduce((prev, curr) => prev?.[curr as any], obj as any)
}

function traverseAndFlatten(object: GenericObject, target: GenericObject, prefix?: string) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var newKey
      if (prefix === undefined) {
        newKey = key
      } else {
        newKey = prefix + '.' + key
      }

      var value = object[key]
      if (typeof value === 'object') {
        traverseAndFlatten(value as any, target, newKey)
      } else {
        target[newKey] = value
      }
    }
  }
}

/**
 * Function will convert object to flat object
 * ```js
 * { bob: { name: 'Bob', age: 12 } }
 * ==> return { bob.name: 'Bob', bob.age: 12 }
 * ```
 * @param object GenericObject
 * @returns flat object
 */
export function flatten(object: GenericObject) {
  var container = {}
  traverseAndFlatten(object, container)
  return container
}
