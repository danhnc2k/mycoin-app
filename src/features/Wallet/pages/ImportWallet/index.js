import { useState } from 'react';
import { Button, Stack, Typography, TextField } from '@mui/material';

function ImportWalletPage(props) {
  const [mnemonic, setMnemonic] = useState('');

  const handleMnemonicChange = (e) => {
    setMnemonic(e.target.value);
  };
  const handleImportWallet = (e) => {
    console.log('handleImportWallet');
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Typography>Enter your Mnemonic</Typography>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
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
