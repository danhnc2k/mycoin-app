import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Stack, Typography } from '@mui/material';

import { generateRandomMnemonic } from '../../../../util/bip39';
import { createNewAccount } from '../../walletSlice';

function CreateWalletPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    randomNewMnemonic();
  }, []);

  const handleCreateWallet = (e) => {
    const createNewAccountAction = createNewAccount(mnemonic);
    dispatch(createNewAccountAction);
    navigate('/');
  };

  const handleGenerateNewMnemonic = (e) => {
    randomNewMnemonic();
  };

  const randomNewMnemonic = (e) => {
    const randomMnemonic = generateRandomMnemonic();
    setMnemonic(randomMnemonic);
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Typography>Here is your random Mnemonic</Typography>
      <Typography>{mnemonic}</Typography>
      <Button variant="outlined" onClick={handleGenerateNewMnemonic}>
        Generate New Mnemonic
      </Button>
      <Typography>Create wallet using this Mnemonic</Typography>
      <Button variant="contained" onClick={handleCreateWallet}>
        Create Wallet
      </Button>
    </Stack>
  );
}

export default CreateWalletPage;
