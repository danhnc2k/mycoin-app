import { createSlice } from '@reduxjs/toolkit';

const initialWalletState = {

}

const wallet = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  reducers: {
    doing: (state, action) => {
      //
    },
  }
});

const { reducer, actions } = wallet;
export const { doing } = actions;
export default reducer;