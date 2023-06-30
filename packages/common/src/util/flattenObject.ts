export function flattenObject(object: object | null): object {
  if (object)
    return Object.keys(object)
      .flatMap((key) => {
        const value = (object as Record<string, unknown>)[key];
        return typeof value === "object" && !Array.isArray(value)
          ? flattenObject(value)
          : [{ [key]: value }];
      })
      .reduce(
        (accumulator, current) => Object.assign(accumulator, current),
        {}
      );
  return {};
}

export function flattenObjectWithPrefix(object: object): object {
  const result = new Map();

  function flatten(object_: object, prefix = "") {
    for (const [key, value] of Object.entries(object_)) {
      if (typeof value === "object") {
        flatten(value, `${prefix}${key}.`);
      } else {
        result.set(prefix + key, value);
      }
    }
  }

  flatten(object);
  return Object.fromEntries(result);
}

export function flattenArrToObj<T extends Record<string, unknown>>(
  array: T[],
  key: string,
  value: string
): Record<string, string> {
  return Object.fromEntries(
    array.map((value_) => [`${value_[key]}`, String(value_[value])])
  );
}
