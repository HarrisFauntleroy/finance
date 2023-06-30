import currency from "currency.js";

export function sumArrayByKey<T>(input: T[], key: keyof T, precision = 2) {
  const options = { precision: precision };
  return input
    .reduce(
      (accumulator, next) =>
        accumulator.add(currency(String(next[key]), options)),
      currency(0, options)
    )
    .toString();
}
