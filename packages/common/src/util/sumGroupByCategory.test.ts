import { Item, sumGroupByCategory } from "./sumGroupByCategory";

describe("sumGroupByCategory", () => {
  const items: Item[] = [
    { category: "fruit", value: "10" },
    { category: "vegetable", value: "20" },
    { category: "fruit", value: "5" },
    { category: "meat", value: "15" },
  ];

  test("should return correct totals for each category", () => {
    const expected = {
      fruit: "15.00",
      vegetable: "20.00",
      meat: "15.00",
    };
    const result = sumGroupByCategory(items, "category");
    expect(result).toEqual(expected);
  });

  test("should return empty object if array is empty", () => {
    const expected = {};
    const result = sumGroupByCategory([], "category");
    expect(result).toEqual(expected);
  });

  test("should handle items with zero values", () => {
    const itemsWithZeroValue: Item[] = [
      { category: "fruit", value: "10" },
      { category: "vegetable", value: "0" },
      { category: "fruit", value: "0" },
      { category: "meat", value: "15" },
    ];
    const expected = {
      fruit: "10.00",
      vegetable: "0.00",
      meat: "15.00",
    };
    const result = sumGroupByCategory(itemsWithZeroValue, "category");
    expect(result).toEqual(expected);
  });
});
