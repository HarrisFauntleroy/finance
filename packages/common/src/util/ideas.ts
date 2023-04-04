export function compoundInterest(
  principal: number,
  interestRate: number,
  compoundingFrequency: number,
  timeInYears: number,
): number {
  // This function calculates the compound interest for a given principal amount, interest rate, compounding frequency, and time in years.
  // The formula used is: A = P(1 + r/n)^nt
  // where A is the final amount, P is the principal, r is the interest rate, n is the compounding frequency, and t is the time in years.
  return (
    principal *
    Math.pow(
      1 + interestRate / compoundingFrequency,
      compoundingFrequency * timeInYears,
    )
  );
}

export function retirementSavings(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  annualContribution: number,
  expectedRateOfReturn: number,
): number {
  // This function calculates the projected savings at retirement age given current age, retirement age, current savings, annual contribution and expected rate of return.
  const yearsUntilRetirement = retirementAge - currentAge;
  let futureValue = currentSavings;
  for (let i = 0; i < yearsUntilRetirement; i++) {
    futureValue = futureValue * (1 + expectedRateOfReturn) + annualContribution;
  }
  return futureValue;
}

export function mortgagePayment(
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
): number {
  // This function calculates the monthly mortgage payment for a given loan amount, interest rate, and loan term (in years).
  // The formula used is: M = P[i(1 + i)^n]/[(1 + i)^n – 1]
  // where M is the monthly mortgage payment, P is the loan amount, i is the interest rate per month, and n is the number of months
  const i = interestRate / 12;
  const n = loanTerm * 12;
  return (loanAmount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

export function taxCalculator(income: number, taxRate: number): number {
  // This function calculates the total tax amount for a given income and tax rate.
  return income * taxRate;
}

export function netIncomeCalculator(
  income: number,
  deductions: number,
): number {
  // This function calculates the net income after deductions for a given income and deductions.
  return income - deductions;
}

export function retirementWithdrawalCalculator(
  savings: number,
  withdrawalRate: number,
  inflationRate: number,
  yearsInRetirement: number,
): number {
  // This function calculates the annual withdrawal amount for a given savings, withdrawal rate, inflation rate, and years in retirement.
  const realWithdrawalRate = withdrawalRate - inflationRate;
  return (
    (savings * realWithdrawalRate) /
    (1 - Math.pow(1 + realWithdrawalRate, -yearsInRetirement))
  );
}

export function creditCardMinimumPayment(
  balance: number,
  interestRate: number,
  minimumPaymentRate: number,
): number {
  // This function calculates the minimum payment for a credit card balance given the interest rate and the minimum payment rate.
  return balance * minimumPaymentRate + balance * interestRate;
}

export function investmentReturn(
  initialValue: number,
  finalValue: number,
  years: number,
): number {
  // This function calculates the investment return given the initial value, final value and number of years.
  return (finalValue - initialValue) / initialValue / years;
}

export function futureValueCalculator(
  presentValue: number,
  interestRate: number,
  years: number,
): number {
  // This function calculates the future value of an investment given the present value, interest rate, and number of years.
  return presentValue * Math.pow(1 + interestRate, years);
}

export function inflationCalculator(
  initialValue: number,
  finalValue: number,
  initialYear: number,
  finalYear: number,
): number {
  // This function calculates the inflation rate given the initial value, final value, initial year and final year.
  const inflationRate =
    (finalValue / initialValue) ** (1 / (finalYear - initialYear)) - 1;
  return inflationRate;
}

export function breakEvenPoint(
  fixedCosts: number,
  variableCosts: number,
  revenue: number,
): number {
  // This function calculates the break-even point (in units) given the fixed costs, variable costs, and revenue.
  return fixedCosts / (revenue - variableCosts);
}

export function depreciationCalculator(
  cost: number,
  salvageValue: number,
  life: number,
  year: number,
): number {
  // This function calculates the depreciation of an asset given the cost, salvage value, life, and the current year.
  // The calculation uses the straight-line method.
  return ((cost - salvageValue) / life) * (year <= life ? 1 : 0);
}
