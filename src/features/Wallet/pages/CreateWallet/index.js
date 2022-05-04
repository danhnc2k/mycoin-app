import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { generateRandomMnemonic } from '../../../../util/bip39';
import { createNewAccount, updatePasswordToEncrypt } from '../../walletSlice';

function CreateWalletPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    randomNewMnemonic();
  }, []);

  const handleCreateWallet = async (e) => {
    if (!password) {
      setPasswordError('You must enter password');
    } else {
      const createNewAccountAction = createNewAccount(mnemonic);
      dispatch(createNewAccountAction);
      const updatePasswordAction = updatePasswordToEncrypt(password);
      dispatch(updatePasswordAction);
      navigate('/');
    }
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
      <Typography variant="h6">Here is your random Mnemonic:</Typography>
      <Typography>
        <b>{mnemonic}</b>
      </Typography>
      <Button variant="outlined" onClick={handleGenerateNewMnemonic}>
        Generate New Mnemonic
      </Button>
      <Typography variant="h6">Enter password to save your session on this device:</Typography>
      <TextField
        required
        id="outlined-required-password"
        label="Required"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {passwordError !== '' && <Typography sx={{ color: 'red' }}>{passwordError}</Typography>}
      <Typography variant="h6">Create wallet using Mnemonic above</Typography>
      <Button variant="contained" onClick={handleCreateWallet}>
        Create Wallet
      </Button>
    </Stack>
  );
}

export default CreateWalletPage;
