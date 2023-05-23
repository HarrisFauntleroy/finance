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
  value: string;
  costBasis: string;
  targetBalance: string;
  incomeRate: string;
  interestBearingBalance: string;

  constructor(input?: AssetInput) {
    this.price = input?.market?.price || "0";
    this.balance = input?.balance || "0";
    this.value = this.calculateValue();
    this.costBasis = input?.costBasis || "0";
    this.targetBalance = input?.targetBalance || "0";
    this.incomeRate = input?.incomeRate || "0";
    this.interestBearingBalance = input?.interestBearingBalance || "0";
  }

  static create(options: AssetInput): AssetBuilder {
    return new AssetBuilder(options);
  }

  toString(value?: string | null) {
    return String(value);
  }

  calculateValue(): string {
    return multiply(this.price, this.balance);
  }

  get unrealizedGain(): string {
    return subtract(this.value, this.costBasis);
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
    return {
      ...this,
      unrealizedGain: this.unrealizedGain,
      averageCost: this.averageCost,
      saleable: this.saleable,
      saleableValue: this.saleableValue,
      estimatedStakingYield: this.estimatedStakingYield,
      estimatedYearlyReturn: this.estimatedYearlyReturn,
      belowTargetBalance: this.belowTargetBalance,
      shouldSell: this.shouldSell,
    };
  }
}
