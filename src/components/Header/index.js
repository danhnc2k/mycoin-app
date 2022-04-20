import { AppBar, Typography, Stack } from '@mui/material';

import Network from '../../features/Network';

function Header(props) {
  return (
    <AppBar
      sx={{
        p: '20px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={10}>
        <Typography>My Coin ETH</Typography>
        <Network />
      </Stack>
    </AppBar>
  );
}

export default Header;
