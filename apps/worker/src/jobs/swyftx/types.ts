export type SwyftxAsset = {
  id: string;
  name: string;
  code: string;
  minimum_order: string;
  price_scale: number;
  deposit_enabled: boolean;
  withdraw_enabled: boolean;
  min_confirmations: number;
  min_withdrawal: number;
  minimum_order_increment: number;
  mining_fee: number;
  primary: boolean;
  secondary: boolean;
};

export type Balance = {
  assetId: number;
  name: string;
  availableBalance: string;
  stakingBalance: string;
  marketId: string;
};

export type SwyftxJWT = {
  accessToken: string;
  scope: string;
};

export type Transaction = {
  amount: number;
  trigger: number;
  quantity: number;
  primaryAsset: number;
  quantityAsset: number;
  asset: string;
  updated: Date;
  actionType: string;
  status: string;
};

export type Secrets = {
  userId: string;
  id: string;
  apiKey: string | null;
  apiSecret: string | null;
};

export type SwyftxAccount = {
  id: string;
  balance: Balance[];
  history: Transaction[];
};
