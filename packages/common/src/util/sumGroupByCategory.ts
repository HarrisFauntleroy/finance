/* eslint-disable @typescript-eslint/no-explicit-any */
import { add } from './math';

type Grouped<T> = {
  [key: string]: T;
};

export type Item = {
  [key: string]: string | number;
  value: string;
};

export function sumGroupByCategory<T extends Item>(
  arr: any[],
  category: keyof T,
): any {
  return arr.reduce((grouped: Grouped<string>, obj: T) => {
    if (!grouped[obj[category]]) {
      grouped[obj[category]] = String(0);
    }
    grouped[obj[category]] = add(grouped[obj[category]], obj.value);
    return grouped;
  }, {});
}
