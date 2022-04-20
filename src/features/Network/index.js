import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

import { changeNetwork } from './networkSlice';

function Network(props) {
  const dispatch = useDispatch();
  const networkList = useSelector((state) => state.network.networkList);
  const currentNetwork = useSelector((state) => state.network.currentNetwork);
  const chooseNetwork = (e) => {
    const network = e.target.value;
    const changeNetworkAction = changeNetwork(network);
    dispatch(changeNetworkAction);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="demo-select-small">Choose network</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={currentNetwork}
          label="Network"
          onChange={chooseNetwork}
        >
          {networkList?.map((network, index) => {
            return (
              <MenuItem key={index} value={network.value}>
                <Typography>{network.name}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Network;
