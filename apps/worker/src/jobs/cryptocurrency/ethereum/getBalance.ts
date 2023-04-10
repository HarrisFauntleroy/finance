import { createWeb3Instance } from './web3';

export async function getBalance(walletAddress: string): Promise<string> {
  const web3 = createWeb3Instance();

  if (web3.utils.isAddress(walletAddress)) {
    const balance = await web3.eth.getBalance(walletAddress);

    return web3.utils.fromWei(balance, 'ether');
  }
  throw new Error('Invalid address!');
}
