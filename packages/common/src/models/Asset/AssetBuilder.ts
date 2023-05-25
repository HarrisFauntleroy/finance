import { Prisma } from "database/generated/prisma-client";

import { divide, lessThan, multiply, subtract } from "../../util/math";

export type AssetInput = Prisma.AssetGetPayload<{
  include: {
    market: true;
    user: { select: { settings: { select: { userCurrency: true } } } };
  };
}>;

export class AssetBuilder {
  price: string;
  balance: string;
  costBasis: string;
  targetBalance: string;
  incomeRate: string;
  interestBearingBalance: string;

  constructor(input?: AssetInput) {
    this.price = input?.market?.price || "0";
    this.balance = input?.balance || "0";
    this.costBasis = input?.costBasis || "0";
    this.targetBalance = input?.targetBalance || "0";
    this.incomeRate = input?.incomeRate || "0";
    this.interestBearingBalance = input?.interestBearingBalance || "0";
  }

  static create(options: AssetInput): AssetBuilder {
    return new AssetBuilder(options);
  }

  calculateValue(): string {
    return multiply(this.price, this.balance);
  }

  get unrealizedGain(): string {
    return subtract(this.calculateValue(), this.costBasis);
  }

  get averageCost() {
    return divide(this.costBasis, this.balance);
  }

  get saleable() {
    return subtract(this.balance, this.targetBalance);
  }

  get saleableValue() {
    return multiply(this.saleable, this.price);
  }

  get estimatedStakingYield() {
    return divide(multiply(this.incomeRate, this.interestBearingBalance), 100);
  }

  get estimatedYearlyReturn() {
    return multiply(this.estimatedStakingYield, this.price);
  }

  get belowTargetBalance() {
    return lessThan(this.saleable, this.targetBalance);
  }

  get shouldSell() {
    return this.averageCost < this.price;
  }

  get computedProperties() {
    const unrealizedGain = this.unrealizedGain;
    const averageCost = this.averageCost;
    const saleable = this.saleable;
    const saleableValue = this.saleableValue;
    const estimatedStakingYield = this.estimatedStakingYield;
    const estimatedYearlyReturn = this.estimatedYearlyReturn;
    const belowTargetBalance = this.belowTargetBalance;
    const shouldSell = this.shouldSell;

    return {
      ...this,
      unrealizedGain,
      averageCost,
      saleable,
      saleableValue,
      estimatedStakingYield,
      estimatedYearlyReturn,
      belowTargetBalance,
      shouldSell,
    };
  }
}
