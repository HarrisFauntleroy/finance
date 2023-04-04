import currency, { Any } from 'currency.js';

type Input = Any;

export function divide(dividend: Input, divisor: Input): string {
  return currency(dividend).divide(currency(divisor)).toString();
}

export function add(augend: Input, addend: Input): string {
  return currency(augend).add(currency(addend)).toString();
}

export function subtract(minuend: Input, subtrahend: Input): string {
  return currency(minuend).subtract(currency(subtrahend)).toString();
}

export function multiply(multiplicand: Input, multiplier: Input): string {
  return currency(multiplicand).multiply(currency(multiplier)).toString();
}

export function greaterThan(n1: Input, n2: Input): boolean {
  return currency(n1).value > currency(n2).value;
}

export function lessThan(n1: Input, n2: Input): boolean {
  return currency(n1).value < currency(n2).value;
}

export function greaterThanOrEqualTo(n1: Input, n2: Input): boolean {
  return currency(n1).value >= currency(n2).value;
}

export function lessThanOrEqualTo(n1: Input, n2: Input): boolean {
  return currency(n1).value <= currency(n2).value;
}

export function equalTo(n1: Input, n2: Input): boolean {
  return currency(n1).value === currency(n2).value;
}

export function strictlyEqualTo(n1: Input, n2: Input): boolean {
  return currency(n1).value === currency(n2).value;
}
