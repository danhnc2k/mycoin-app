import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

function CreateWalletPage(props) {
  const [mnemonic, setMnemonic] = useState('init mnemonic');
  const handleCreateWallet = (e) => {
    console.log('handleCreateWallet');
  };

  const handleGenerateNewMnemonic = (e) => {
    console.log('handleGenerateNewMnemonic');
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Typography>Here is your random Mnemonic</Typography>
      <Typography>{mnemonic}</Typography>
      <Typography>Create wallet using this Mnemonic</Typography>
      <Button variant="contained" onClick={handleCreateWallet}>
        Create Wallet
      </Button>
      <Typography>Generate new Mnemonic here</Typography>
      <Button variant="outlined" onClick={handleGenerateNewMnemonic}>
        Generate Mnemonic
      </Button>
    </Stack>
  );
}

export default CreateWalletPage;
