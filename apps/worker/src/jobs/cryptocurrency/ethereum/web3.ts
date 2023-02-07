import Web3 from "web3"

let instance: Web3

export const createWeb3Instance = () => {
	if (!instance) {
		instance = new Web3(
			new Web3.providers.HttpProvider("https://rpc.ankr.com/eth")
		)
	}
	return instance
}
