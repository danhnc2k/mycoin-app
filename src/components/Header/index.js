import { AppBar, Typography } from '@mui/material';

function Header(props) {
  return (
    <AppBar
      sx={{
        p: '20px',
      }}
    >
      <Typography>My Coin ETH</Typography>
    </AppBar>
  );
}

export default Header;
