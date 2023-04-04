/**
 * Flattens an object by moving all keys from nested objects to the top level of the output object.
 * @param object The object to flatten.
 * @returns A flattened version of the input object.
 */

// This version doesnt concatenate keys like a.b: 3 it will show b: 3
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function flattenObject(obj: any): object {
  return Object.keys(obj)
    .flatMap((key) => {
      const value = obj[key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        return flattenObject(value);
      } else {
        return [{ [key]: value }];
      }
    })
    .reduce((acc, cur) => Object.assign(acc, cur), {});
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function flattenObjectWithPrefix(obj: any): Record<string, unknown> {
  const result = new Map();

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  function flatten(obj: any, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        flatten(value, `${prefix}${key}.`);
      } else {
        result.set(prefix + key, value);
      }
    }
  }

  flatten(obj);
  return Object.fromEntries(result);
}

// So you can already go arr -> obj with Object.from(arr) ? maybe
// What does this do
export const flattenArrToObj = (
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  arr: Record<string, any>[],
  key: string | number,
  value: string,
) =>
  arr.reduce(
    (acc, val) => ({
      ...acc,
      [`${val[key]}`]: val[value],
    }),
    {},
  );
