import currency from 'currency.js';

/**
 * sumArrayByKey function takes an array of objects, a key to use for summing values, and an optional precision parameter
 */
export function sumArrayByKey(
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  input: Record<string, any>[],
  key: string,
  precision = 2,
) {
  // the function uses the reduce method to sum the values in the array using the specified key, and returns the result as a string
  return input
    .reduce(
      (acc, next) => acc.add(currency(next[key], { precision: precision })),
      currency(0, { precision: precision }),
    )
    .toString();
}
