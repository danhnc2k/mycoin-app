import { Button, Stack, Typography, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateMnemonic, createNewAccount } from '../../walletSlice';

function ImportWalletPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.wallet.mnemonic);

  const handleMnemonicChange = (e) => {
    const updateMnemonicAction = updateMnemonic(e.target.value);
    dispatch(updateMnemonicAction);
  };

  const handleImportWallet = (e) => {
    const createNewAccountAction = createNewAccount(mnemonic);
    dispatch(createNewAccountAction);
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
      <Button variant="contained" onClick={handleImportWallet}>
        Import Wallet
      </Button>
    </Stack>
  );
}

export default ImportWalletPage;
