import currency from 'currency.js';

export function sumArrayByKey(
  input: Record<string, string | number>[],
  key: string,
  precision = 2,
) {
  return input
    .reduce(
      (acc, next) => acc.add(currency(next[key], { precision: precision })),
      currency(0, { precision: precision }),
    )
    .toString();
}
