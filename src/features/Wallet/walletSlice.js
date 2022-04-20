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
      state.isConnected = true;
    },
    addAddress: (state, action) => {
      const mnemonic = state.mnemonic;
      const addressIndex = state.accountList.length;
      const account = getWalletFromMnemonic(mnemonic, DERIVATION_PATH + addressIndex);
      account.balance = '0';
      state.accountList.push(account);
      state.isConnected = true;
    },
    updateMnemonic: (state, action) => {
      const newMnemonic = action.payload;
      state.mnemonic = newMnemonic;
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBalances.fulfilled, (state, action) => {
      const balanceList = action.payload;
      const accountList = [];
      state.accountList.forEach((account, index) => {
        account.balance = balanceList[index];
        accountList.push(account);
      });
      state.accountList = accountList;
    });
  },
});

const { reducer, actions } = wallet;
export const { createNewAccount, addAddress, updateMnemonic, setCurrentAccount } = actions;
export default reducer;
