import { updateAtomBalances } from './atom';
import { updateOsmosisBalances } from './osmosis';

export const updateCosmosBalances = async () => {
  updateAtomBalances();
  updateOsmosisBalances();
};
