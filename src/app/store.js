import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import walletReducer from '../features/Wallet/walletSlice';
import networkReducer from '../features/Network/networkSlice';

const customizeMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    network: networkReducer,
  },
  middleware: customizeMiddleware,
});
