import { convertCurrency, getConversionRate } from './currency';

describe('getConversionRate', () => {
  it('should return the correct conversion rate', () => {
    const rates = {
      USD: '1.0',
      EUR: '0.8',
      GBP: '0.6',
    };
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const expected = '0.80';

    const result = getConversionRate(rates, fromCurrency, toCurrency).value;

    expect(result).toEqual(expected);
  });

  it('should return an error if the from currency is invalid', () => {
    const rates = {
      USD: '1.0',
      EUR: '0.8',
      GBP: '0.6',
    };
    const fromCurrency = 'INVALID';
    const toCurrency = 'EUR';
    const expected = { value: '0', error: 'Invalid from currency: INVALID' };

    const result = getConversionRate(rates, fromCurrency, toCurrency);

    expect(result).toEqual(expected);
  });

  it('should return an error if the to currency is invalid', () => {
    const rates = {
      USD: '1.0',
      EUR: '0.8',
      GBP: '0.6',
    };
    const fromCurrency = 'USD';
    const toCurrency = 'INVALID';
    const expected = { value: '0', error: 'Invalid to currency: INVALID' };

    const result = getConversionRate(rates, fromCurrency, toCurrency);

    expect(result).toEqual(expected);
  });
});

/** =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

describe('convertCurrency', () => {
  it('should convert the currency correctly', () => {
    const exchangeRates = {
      USD: '1.0',
      EUR: '0.8',
      GBP: '0.6',
    };
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const amount = '100';
    const expected = '80.00';

    const result = convertCurrency({
      exchangeRates,
      fromCurrency,
      toCurrency,
      amount,
    }).toString();

    expect(result).toEqual(expected);
  });

  it('should return 0 if the amount is 0', () => {
    const exchangeRates = {
      USD: '1.0',
      EUR: '0.8',
      GBP: '0.6',
    };
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const amount = '0';
    const expected = '0.00';

    const result = convertCurrency({
      exchangeRates,
      fromCurrency,
      toCurrency,
      amount,
    }).toString();

    expect(result).toEqual(expected);
  });

  it('should return the same amount if the currencies are the same', () => {
    const exchangeRates = {
      USD: '1.0',
      EUR: '0.8',
      GBP: '0.6',
    };
    const fromCurrency = 'USD';
    const toCurrency = 'USD';
    const amount = '100.00';
    const expected = '100.00';

    const result = convertCurrency({
      exchangeRates,
      fromCurrency,
      toCurrency,
      amount,
    }).toString();

    expect(result).toEqual(expected);
  });
});
