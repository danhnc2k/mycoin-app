import { createSlice } from '@reduxjs/toolkit';

import { getWalletFromMnemonic } from '../../util/ethers';
import { DERIVATION_PATH } from '../../util/constant';

const initialWalletState = {
  isConnected: false,
  mnemonic: '',
  accountList: [],
  currentAccount: null,
};

const wallet = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  reducers: {
    createNewAccount: (state, action) => {
      const mnemonic = action.payload;
      const account = getWalletFromMnemonic(mnemonic);
      state.currentAccount = account;
      state.accountList.push(account);
      state.mnemonic = mnemonic;
      state.isConnected = true;
    },
    addAddress: (state, action) => {
      const mnemonic = state.wallet.mnemonic;
      const addressIndex = state.wallet.accountList.length;
      const account = getWalletFromMnemonic(mnemonic, DERIVATION_PATH + addressIndex);
      state.currentAccount = account;
      state.accountList.push(account);
      state.isConnected = true;
    },
  },
});

const { reducer, actions } = wallet;
export const { createNewAccount } = actions;
export default reducer;
