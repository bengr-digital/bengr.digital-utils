/**
 * Function returns array of unique values
 * ```
 * unique([1, 2, 3, 3, 2, 1]) // => [1, 2, 3]
 * ```
 * @param {unknown[]} array array of values
 * @return {unknown[]} unique array
 */
export const unique = <V>(array: V[]) => [...new Set(array)]

/**
 *  Function will create from array of strings object with object on property of next string
 * ```js
 * arrayToNestedObject(['one', 'two', 'three']) // => { one: { two: { three: 'x' } } }
 * ```
 *
 * @param {string[]} array array of strings
 * @param {unknown} value value that will be passed to to last key
 * @param {number} index start point. You dont have to pass this parameter
 * @returns {object} object with nested object
 */
export const arrayToNestedObject = (array: string[], value: unknown, index: number = 0): { [x: string]: any } => {
  return array.length ? Object.fromEntries([[array[index], index + 1 !== array.length ? { ...arrayToNestedObject(array, value, index + 1) } : value]]) : {}
}

/**
 * Functin for generating ARRAY of numbers from 0 to length
 * ```js
 * newArray(3) // => [0, 1, 2]
 * ```
 * @param {number} length length of array
 * @returns {number[]} array of numbers
 */
export const newArray = (length: number) => Array.from({ length }, (_, i) => i)
