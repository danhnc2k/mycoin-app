import { createSlice } from '@reduxjs/toolkit';

import { getWalletFromMnemonic } from '../../util/ethers';

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
    // get account from mnemonic. Need to add to accountList ? Need to pass mnemonic or get from state ?
    getAccount: (state, action) => {
      const mnemonic = action.payload.mnemonic;
      const account = getWalletFromMnemonic(mnemonic);
      state.currentAccount = account;
    },
  },
});

const { reducer, actions } = wallet;
export const { doing } = actions;
export default reducer;
