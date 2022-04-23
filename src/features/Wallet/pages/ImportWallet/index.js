import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, Typography, TextField } from '@mui/material';

import { updateMnemonic, createNewAccount, updatePasswordToEncrypt } from '../../walletSlice';

function ImportWalletPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.wallet.mnemonic);
  const [password, setPassword] = useState('');

  const handleMnemonicChange = (e) => {
    const updateMnemonicAction = updateMnemonic(e.target.value);
    dispatch(updateMnemonicAction);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImportWallet = (e) => {
    const createNewAccountAction = createNewAccount(mnemonic);
    dispatch(createNewAccountAction);
    const updatePasswordAction = updatePasswordToEncrypt(password);
    dispatch(updatePasswordAction);
    navigate('/');
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Typography>Enter your Mnemonic</Typography>
      <TextField
        required
        id="outlined-required"
        label="Required"
        value={mnemonic}
        onChange={handleMnemonicChange}
      />
      <Typography>Enter password to save your session on this device</Typography>
      <TextField
        required
        id="outlined-required"
        label="Required"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={handleImportWallet}>
        Import Wallet
      </Button>
    </Stack>
  );
}

export default ImportWalletPage;
