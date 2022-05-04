import { AppBar, Typography, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Network from '../../features/Network';
import { removeWallet } from '../../features/Wallet/walletSlice';
import { WALLET_STATUS } from '../../util/constant';

function Header(props) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.wallet.status);

  const handleLogout = (e) => {
    const removeWalletAction = removeWallet();
    dispatch(removeWalletAction);
    window.location.replace('/');
  };

  return (
    <AppBar
      sx={{
        p: '20px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={10}>
        <Typography sx={{ my: 'auto' }}>MyCoin Wallet</Typography>
        <Network />
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={status !== WALLET_STATUS.connected}
        >
          Logout
        </Button>
      </Stack>
    </AppBar>
  );
}

export default Header;
