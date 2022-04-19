import { Button, Stack } from '@mui/material';

function MainPage(props) {
  const handleCreateWallet = (e) => {
    console.log('create wallet');
  };

  const handleImportWallet = (e) => {
    console.log('import wallet');
  };

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

export default MainPage;
