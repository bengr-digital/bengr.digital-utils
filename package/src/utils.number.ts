let lastId = 0

/**
 * Function for creating ids. The biggest advantage is that IDs will be EVERY render SAME.
 *
 * @param prefix
 * @returns
 */
export const newId = (prefix = 'id-') => {
  lastId++
  return `${prefix}${lastId}`
}

/**
 * Function that converts px to rem.
 * @param number
 * @returns number
 */
export const pxToRem = (number: number) => Math.floor((number / 16) * 10000) / 10000
