export function percentageDifference(value1: number, value2: number) {
  const range = value2 - value1;
  const average = (value2 + value1) / 2;
  return (range / average) * 100;
}
