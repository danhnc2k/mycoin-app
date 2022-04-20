import { createSlice } from '@reduxjs/toolkit';

import { NETWORK_LIST } from '../../util/constant';

const initialNetworkState = {
  networkList: NETWORK_LIST,
  currentNetwork: NETWORK_LIST[0].value,
};

const network = createSlice({
  name: 'network',
  initialState: initialNetworkState,
  reducers: {
    changeNetwork: (state, action) => {
      const value = action.payload;
      state.currentNetwork = value;
    },
  },
});

const { reducer, actions } = network;
export const { changeNetwork } = actions;
export default reducer;
