import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getWalletFromMnemonic, getProviderFromNetwork } from '../../util/ethers';
import { DERIVATION_PATH, WALLET_STATUS } from '../../util/constant';
import { formatEther } from 'ethers/lib/utils';

const initialWalletState = {
  status: WALLET_STATUS.notConnected, // has 3 states: 'NOT_CONNECTED', 'LOCKED', 'CONNECTED'
  mnemonic: '',
  accountList: [],
  balanceList: [],
  currentAccount: null,
  currentBalance: '0',
  passwordToEncrypt: '',
};

export const updateBalances = createAsyncThunk(
  'wallet/updateBalances',
  async ({ addressList, network }) => {
    const provider = getProviderFromNetwork(network);
    const result = [];
    for (const address of addressList) {
      const balance = await provider.getBalance(address);
      result.push(formatEther(balance));
    }
    return result;
  }
);

const wallet = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  reducers: {
    createNewAccount: (state, action) => {
      const mnemonic = action.payload;
      const account = getWalletFromMnemonic(mnemonic);
      state.accountList.push(account);
      state.mnemonic = mnemonic;
      state.status = WALLET_STATUS.connected;
    },
    addAddress: (state, action) => {
      const mnemonic = state.mnemonic;
      const addressIndex = state.accountList.length;
      const account = getWalletFromMnemonic(mnemonic, DERIVATION_PATH + addressIndex);
      state.accountList.push(account);
      state.status = WALLET_STATUS.connected;
    },
    updateAccountList: (state, action) => {
      state.accountList = action.payload;
      state.status = WALLET_STATUS.connected;
    },
    updatePasswordToEncrypt: (state, action) => {
      state.passwordToEncrypt = action.payload;
    },
    updateMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
    updateCurrentBalance: (state, action) => {
      state.currentBalance = action.payload;
    },
    removeWallet: (state, action) => {
      state = initialWalletState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBalances.fulfilled, (state, action) => {
      state.balanceList = action.payload;
    });
  },
});

const { reducer, actions } = wallet;
export const {
  createNewAccount,
  addAddress,
  updateAccountList,
  updatePasswordToEncrypt,
  updateMnemonic,
  updateStatus,
  updateCurrentAccount,
  updateCurrentBalance,
  removeWallet,
} = actions;
export default reducer;
