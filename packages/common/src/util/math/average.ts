/** Arithmetic mean or Average */
export function average(array: number[]) {
  return array.length === 0
    ? 0
    : array.reduce((previous, next) => previous + next, 0) / array.length;
}
