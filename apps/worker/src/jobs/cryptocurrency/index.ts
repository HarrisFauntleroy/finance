import { updateCosmosBalances } from "./cosmos";
import { updateEthereumBalances } from "./ethereum";
import { updateHarmonyBalances } from "./harmony-one";

export const cryptocurrency = async () => {
  updateCosmosBalances();
  updateEthereumBalances();
  updateHarmonyBalances();
};
