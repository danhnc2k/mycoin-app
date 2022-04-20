import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getWalletFromMnemonic, getProviderFromNetwork } from '../../util/ethers';
import { DERIVATION_PATH } from '../../util/constant';
import { formatEther } from 'ethers/lib/utils';

const initialWalletState = {
  isConnected: false,
  mnemonic: '',
  accountList: [],
  currentAccount: null,
};

export const getWalletBalance = createAsyncThunk(
  'wallet/getWalletBalance',
  async (address, network) => {
    const provider = getProviderFromNetwork(network);
    const balance = await provider.getBalance(address);
    console.log('debug balance: ', balance);
    return formatEther(balance);
  }
);

const wallet = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  reducers: {
    createNewAccount: (state, action) => {
      const mnemonic = action.payload;
      const account = getWalletFromMnemonic(mnemonic);
      account.balance = '0';
      state.currentAccount = account;
      state.accountList.push(account);
      state.mnemonic = mnemonic;
      state.isConnected = true;
    },
    addAddress: (state, action) => {
      const mnemonic = state.wallet.mnemonic;
      const addressIndex = state.accountList.length;
      const account = getWalletFromMnemonic(mnemonic, DERIVATION_PATH + addressIndex);
      account.balance = '0';
      state.currentAccount = account;
      state.accountList.push(account);
      state.isConnected = true;
    },
    updateMnemonic: (state, action) => {
      const newMnemonic = action.payload;
      state.mnemonic = newMnemonic;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWalletBalance.fulfilled, (state, action) => {
      const account = { ...state.currentAccount };
      account.balance = action.payload;
      state.currentAccount = account;
    });
  },
});

const { reducer, actions } = wallet;
export const { createNewAccount, addAddress, updateMnemonic } = actions;
export default reducer;
