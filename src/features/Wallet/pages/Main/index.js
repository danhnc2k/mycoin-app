import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

function MainPage(props) {
  const navigate = useNavigate();

  const handleCreateWallet = (e) => {
    navigate('create-wallet');
  };

  const handleImportWallet = (e) => {
    navigate('import-wallet');
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
