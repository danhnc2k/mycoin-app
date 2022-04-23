import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { generateRandomMnemonic } from '../../../../util/bip39';
import { createNewAccount, updatePasswordToEncrypt } from '../../walletSlice';

function CreateWalletPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    randomNewMnemonic();
  }, []);

  const handleCreateWallet = async (e) => {
    const createNewAccountAction = createNewAccount(mnemonic);
    dispatch(createNewAccountAction);
    const updatePasswordAction = updatePasswordToEncrypt(password);
    dispatch(updatePasswordAction);
    navigate('/');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      <Typography>Enter password to save your session on this device</Typography>
      <TextField
        required
        id="outlined-required-password"
        label="Required"
        value={password}
        onChange={handlePasswordChange}
      />
      <Typography>Create wallet using Mnemonic above</Typography>
      <Button variant="contained" onClick={handleCreateWallet}>
        Create Wallet
      </Button>
    </Stack>
  );
}

export default CreateWalletPage;
