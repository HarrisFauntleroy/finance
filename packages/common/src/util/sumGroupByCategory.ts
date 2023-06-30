/* eslint-disable @typescript-eslint/no-explicit-any */

import { add } from "./math";

type Grouped<T> = {
  [key: string]: T;
};

export type Item = {
  [key: string]: string | number;
  value: string;
};

export function sumGroupByCategory<T extends Item>(
  array: any[],
  category: keyof T
): any {
  return array.reduce((grouped: Grouped<string>, object: T) => {
    if (!grouped[object[category]]) {
      grouped[object[category]] = String(0);
    }
    grouped[object[category]] = add(grouped[object[category]], object.value);
    return grouped;
  }, {});
}
