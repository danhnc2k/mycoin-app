import { Wallet, providers, utils } from 'ethers';

export const getProviderFromNetwork = (network) => {
  switch (network) {
    case 'homestead':
    case 'ropsten':
    case 'kovan':
    case 'goerli':
      return new providers.EtherscanProvider(network);
    default:
      return new providers.EtherscanProvider('rinkeby');
  }
};

export const getWalletFromMnemonic = (mnemonic, path) => {
  const wallet = Wallet.fromMnemonic(mnemonic, path);
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
