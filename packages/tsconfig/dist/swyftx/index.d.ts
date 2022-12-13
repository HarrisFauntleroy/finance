import { Balance } from "./balance";
import { Transaction } from "./history";

/** Default GET request for Swyftx API, adds authorisation */
export declare const fetchFromSwyftx: (
  url: string,
  accessToken: string
) => Promise<any>;
export declare const getApiKeyAndSecret: (userId: string) => Promise<{
  id: string;
  apiKey: string | null;
  apiSecret: string | null;
}>;
interface Secrets {
  id: string;
  apiKey: string | null;
  apiSecret: string | null;
}
/** Get complete Swyftx account including balances & transaction history */
export declare const getSwyftxAccount: ({ id, apiKey }: Secrets) => Promise<{
  id: string;
  balance: Balance[];
  history: (
    | Transaction
    | {
        name: string;
        marketId: string;
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
  )[];
}>;
declare const swyftx: () => Promise<void>;
export default swyftx;
//# sourceMappingURL=index.d.ts.map
