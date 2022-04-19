import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../features/Wallet/walletSlice'

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});
