import { add } from './math';

interface Grouped<T> {
  [key: string]: T;
}

export interface Item {
  [key: string]: string | number;
  value: string;
}

export function sumGroupByCategory<T extends Item>(
  arr: T[],
  category: keyof T,
): Grouped<string> {
  return arr.reduce((grouped: Grouped<string>, obj: T) => {
    if (!grouped[obj[category]]) {
      grouped[obj[category]] = String(0);
    }
    grouped[obj[category]] = add(grouped[obj[category]], obj.value);
    return grouped;
  }, {});
}
