/**
 *
 * @param {Number[]} arr1 Array of numbers
 * @param {Number[]} arr2 Array of numbers
 * @returns {Number[]} Array of numbers that are sum of two arrays before.
 */
export const merge = (arr1: number[], arr2: number[]) => {
	return arr1.map((v, i) => v + arr2[i]);
};
