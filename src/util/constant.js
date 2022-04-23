export const DERIVATION_PATH = "m/44'/60'/0'/0/";

export const NETWORK_LIST = [
  {
    name: 'Rinkeby',
    value: 'rinkeby',
  },
  {
    name: 'Mainnet',
    value: 'homestead',
  },
  {
    name: 'Ropsten',
    value: 'ropsten',
  },
  {
    name: 'Kovan',
    value: 'kovan',
  },
  {
    name: 'Goerli',
    value: 'goerli',
  },
];

export const WALLET_STATUS = {
  notConnected: 'NOT_CONNECTED',
  locked: 'LOCKED',
  connected: 'CONNECTED',
};

export const TRANSACTION_STATUS = {
  start: 'START',
  success: 'SUCCESS',
  failed: 'FAILED',
};
