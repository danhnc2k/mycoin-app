import { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { generateRandomMnemonic } from '../../../../util/bip39';

function CreateWalletPage(props) {
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    randomNewMnemonic();
  }, []);

  const handleCreateWallet = (e) => {
    console.log('handleCreateWallet');
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
