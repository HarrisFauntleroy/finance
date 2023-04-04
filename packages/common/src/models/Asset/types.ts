import { Prisma } from 'database/generated/prisma-client';

// #?: Explain this
export type AssetWithRelated = Prisma.AssetGetPayload<{
  include: {
    market: true;
    transactions: true;
    user: {
      select: {
        settings: { select: { userCurrency: true } };
      };
    };
    subAssets: {
      include: {
        market: true;
        transactions: true;
        user: {
          select: {
            settings: { select: { userCurrency: true } };
          };
        };
      };
    };
  };
}>;

// #?: Explain this
// Because we only want subassets one level deep?
export type AssetWithRelatedChild = Prisma.AssetGetPayload<{
  include: {
    market: true;
    transactions: true;
    user: {
      select: {
        settings: { select: { userCurrency: true } };
      };
    };
    subAssets: {
      include: {
        market: true;
        transactions: true;
        user: {
          select: {
            settings: { select: { userCurrency: true } };
          };
        };
      };
    };
  };
}>;

/** Calculated values */
export interface AssetWithCalculatedValues extends AssetWithRelated {
  calculatedSubAssets?: AssetWithRelated[];
  unrealisedGainPercentage: string;
  estimatedStakingYield: string;
  estimatedYearlyReturn: string;
  belowTargetBalance: boolean;
  unrealisedGain: string;
  saleableValue: string;
  amountStaked: string;
  averageCost: string;
  costBasis: string;
  shouldSell: boolean;
  saleable: string;
  value: string;
  price: string;
}

// #?: Explain this
export interface SubAssetValueTotals {
  value: string;
  subAssets: AssetWithCalculatedValues[];
  averageCost: string;
  costBasis: string;
  saleableValue: string;
  unrealisedGain: string;
  unrealisedGainPercentage: string;
}

// #?: Explain this
export interface AssetSummaryInput {
  assets: AssetWithRelated[];
  exchangeRates: Record<string, string>;
  userCurrency: string;
}
