export interface SwyftxAsset {
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
}

export interface Balance {
  assetId: number;
  name: string;
  availableBalance: string;
  stakingBalance: string;
  marketId: string;
}

export interface SwyftxJWT {
  accessToken: string;
  scope: string;
}

export interface Transaction {
  amount: number;
  trigger: number;
  quantity: number;
  primaryAsset: number;
  quantityAsset: number;
  asset: string;
  updated: Date;
  actionType: string;
  status: string;
}

export interface Secrets {
  userId: string;
  id: string;
  apiKey: string | null;
  apiSecret: string | null;
}

export interface SwyftxAccount {
  id: string;
  balance: Balance[];
  history: Transaction[];
}
