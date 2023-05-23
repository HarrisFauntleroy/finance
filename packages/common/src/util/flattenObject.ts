export function flattenObject(obj: object | null): object {
  if (obj)
    return Object.keys(obj)
      .flatMap((key) => {
        const value = (obj as Record<string, unknown>)[key];
        return typeof value === "object" && !Array.isArray(value)
          ? flattenObject(value)
          : [{ [key]: value }];
      })
      .reduce((acc, cur) => Object.assign(acc, cur), {});
  return {};
}

export function flattenObjectWithPrefix(obj: object): object {
  const result = new Map();

  function flatten(obj: object, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        flatten(value, `${prefix}${key}.`);
      } else {
        result.set(prefix + key, value);
      }
    }
  }

  flatten(obj);
  return Object.fromEntries(result);
}

export function flattenArrToObj<T extends Record<string, unknown>>(
  arr: T[],
  key: string | number,
  value: string
) {
  return arr.reduce(
    (acc, val) => ({
      ...acc,
      [`${val[key]}`]: val[value],
    }),
    {}
  );
}
