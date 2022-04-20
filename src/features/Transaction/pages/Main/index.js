import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MainPage(props) {
  const navigate = useNavigate();
  const handleSendTransaction = (e) => {
    navigate('send');
  };
  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Button onClick={handleSendTransaction} variant="contained">
        Send Transaction
      </Button>
    </Stack>
  );
}
export default MainPage;
