import { updateCosmosBalances } from './cosmos';
import { updateEthereumBalances } from './ethereum';
import { updateHarmonyBalances } from './harmonyone';

export const cryptocurrency = async () => {
  updateCosmosBalances();
  updateEthereumBalances();
  updateHarmonyBalances();
};
