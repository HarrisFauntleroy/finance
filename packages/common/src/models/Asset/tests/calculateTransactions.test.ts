import { AssetTransaction } from 'database/generated/prisma-client';

import { calculateTransactions } from '../calculateTransactions';

const transactionBuilder = (overrides = {}) => ({
  id: '1',
  timestamp: new Date(),
  pricePerUnit: '1.50',
  baseCurrency: 'USD',
  quantity: '10',
  quantityFilled: '10',
  fee: '0.25',
  valueInBaseCurrency: '15',
  fromAsset: null,
  toAsset: 'BTC',
  market: null,
  transactionType: 'BUY',
  expiry: null,
  status: 'COMPLETED',
  transactionHash: null,
  description: null,
  memo: null,
  relatedAssetId: null,
  userId: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
  deletedAt: null,
  ...overrides,
});

describe('calculateTransactions', () => {
  it('should calculate the correct totalValue, totalFees, averagePrice and totalQuantity', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder(),
      transactionBuilder({
        id: '2',
        pricePerUnit: '2.00',
        quantity: '20',
        quantityFilled: '20',
        fee: '0.50',
        valueInBaseCurrency: '40',
      }),
    ];

    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('55.00');
    expect(result.totalFees).toEqual('0.75');
    expect(result.averagePrice).toEqual('1.83');
    expect(result.totalQuantity).toEqual('30.00');
  });

  it('should return 0 for all stats when there are no transactions', () => {
    const transactions: AssetTransaction[] = [];
    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('0.00');
    expect(result.totalFees).toEqual('0.00');
    expect(result.averagePrice).toBeNull();
    expect(result.totalQuantity).toEqual('0.00');
  });

  it('should handle a single transaction with quantityFilled and pricePerUnit as 0', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder({
        pricePerUnit: '0',
        quantityFilled: '0',
        valueInBaseCurrency: '0',
      }),
    ];

    const result = calculateTransactions(transactions);

    expect(result.totalValue).toEqual('0.00');
    expect(result.totalFees).toEqual('0.25');
    expect(result.averagePrice).toBeNull();
    expect(result.totalQuantity).toEqual('0.00');
  });

  it('should handle a single transaction with quantityFilled and pricePerUnit as null', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder({
        pricePerUnit: null,
        quantityFilled: null,
        valueInBaseCurrency: null,
      }),
    ];

    const result = calculateTransactions(transactions);

    expect(result.totalValue).toEqual('0.00');
    expect(result.totalFees).toEqual('0.25');
    expect(result.averagePrice).toBeNull();
    expect(result.totalQuantity).toEqual('0.00');
  });

  it('should handle a single transaction with fee as null', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder({ fee: null }),
    ];

    const result = calculateTransactions(transactions);

    expect(result.totalValue).toEqual('15.00');
    expect(result.totalFees).toEqual('0.00');
    expect(result.averagePrice).toEqual('1.50');
    expect(result.totalQuantity).toEqual('10.00');
  });

  it('should handle a single transaction with all fields as null', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder({
        pricePerUnit: null,
        quantityFilled: null,
        valueInBaseCurrency: null,
        fee: null,
      }),
    ];

    const result = calculateTransactions(transactions);

    expect(result.totalValue).toEqual('0.00');
    expect(result.totalFees).toEqual('0.00');
    expect(result.averagePrice).toBeNull();
    expect(result.totalQuantity).toEqual('0.00');
  });

  it('should handle multiple transactions with some values as null or 0', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder(),
      transactionBuilder({
        id: '2',
        pricePerUnit: '0',
        quantityFilled: '0',
        valueInBaseCurrency: '0',
      }),
    ];

    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('15.00');
    expect(result.totalFees).toEqual('0.50');
    expect(result.averagePrice).toEqual('1.50');
    expect(result.totalQuantity).toEqual('10.00');
  });

  it('should handle multiple transactions with quantityFilled and pricePerUnit as fractional values', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder({
        pricePerUnit: '1.25',
        quantityFilled: '5.5',
        valueInBaseCurrency: '6.875',
      }),
      transactionBuilder({
        id: '2',
        pricePerUnit: '2.10',
        quantityFilled: '3.5',
        valueInBaseCurrency: '7.35',
      }),
    ];

    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('14.23');
    expect(result.totalFees).toEqual('0.50');
    expect(result.averagePrice).toEqual('1.58');
    expect(result.totalQuantity).toEqual('9.00');
  });

  it('should handle multiple transactions with fee as fractional values', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder({ fee: '0.15' }),
      transactionBuilder({ id: '2', fee: '0.35', valueInBaseCurrency: '40' }),
    ];

    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('30.00');
    expect(result.totalFees).toEqual('0.50');
    expect(result.averagePrice).toEqual('1.50');
    expect(result.totalQuantity).toEqual('20.00');
  });

  it('should handle multiple transactions with different baseCurrency', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder(),
      transactionBuilder({
        id: '2',
        pricePerUnit: '2.00',
        baseCurrency: 'AUD',
        quantity: '20',
        quantityFilled: '20',
        fee: '0.50',
        valueInBaseCurrency: '40',
      }),
    ];

    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('55.00');
    expect(result.totalFees).toEqual('0.75');
    expect(result.averagePrice).toEqual('1.83');
    expect(result.totalQuantity).toEqual('30.00');
  });

  it('should handle multiple transactions with different transactionTypes', () => {
    const transactions: AssetTransaction[] = [
      transactionBuilder(),
      transactionBuilder({
        id: '2',
        pricePerUnit: '2.00',
        quantity: '20',
        quantityFilled: '20',
        fee: '0.50',
        valueInBaseCurrency: '40',
        transactionType: 'SELL',
      }),
    ];

    const result = calculateTransactions(transactions);
    expect(result.totalValue).toEqual('55.00');
    expect(result.totalFees).toEqual('0.75');
    expect(result.averagePrice).toEqual('1.83');
    expect(result.totalQuantity).toEqual('30.00');
  });
});
