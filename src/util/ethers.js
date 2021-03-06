import { Wallet, providers, utils } from 'ethers';

export const getProviderFromNetwork = (network) => {
  switch (network) {
    case 'homestead':
    case 'goerli':
    case 'kovan':
    case 'ropsten':
      return new providers.EtherscanProvider(network, process.env.REACT_APP_API_KEY);
    default:
      return new providers.EtherscanProvider('rinkeby', process.env.REACT_APP_API_KEY);
  }
};

export const getWalletFromMnemonic = (mnemonic, path) => {
  const wallet = Wallet.fromMnemonic(mnemonic, path);
  return wallet;
};

export const getWalletFromEncryptedJson = async (json, password) => {
  const wallet = await Wallet.fromEncryptedJson(json, password);
  return wallet;
};

//format string from unit 10^18 to string of ether unit
export const formatEther = (balance) => {
  return utils.formatEther(balance);
};

//format string from ether unit to string of 10^18 unit
export const parseEther = (value) => {
  return utils.parseEther(value);
};
