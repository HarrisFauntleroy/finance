import { isNegative } from './isNegative';

describe('isNegative', () => {
  it('should return true for negative numbers', () => {
    expect(isNegative(-10)).toBe(true);
    expect(isNegative(-1)).toBe(true);
    expect(isNegative(-0.0001)).toBe(true);
  });

  it('should return false for positive numbers', () => {
    expect(isNegative(0)).toBe(false);
    expect(isNegative(1)).toBe(false);
    expect(isNegative(10)).toBe(false);
  });

  it('should return false for NaN inputs', () => {
    expect(isNegative(NaN)).toBe(false);
  });
});
