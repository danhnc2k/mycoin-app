import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function MainPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.wallet.isConnected);
  const currentAccount = useSelector((state) => state.wallet.currentAccount);

  const handleCreateWallet = (e) => {
    navigate('create-wallet');
  };

  const handleImportWallet = (e) => {
    navigate('import-wallet');
  };

  if (isConnected) {
    return (
      <Stack direction="row" justifyContent="center" spacing={10}>
        <Typography>{currentAccount.address}</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" justifyContent="center" spacing={10}>
        <Button variant="contained" onClick={handleCreateWallet}>
          Create Wallet
        </Button>
        <Button variant="outlined" onClick={handleImportWallet}>
          Import Wallet
        </Button>
      </Stack>
    );
  }
}

export default MainPage;
