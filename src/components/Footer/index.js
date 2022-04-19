import { Stack, Typography } from '@mui/material';

function Footer(props) {
  return (
    <Stack
      sx={{ mt: 'auto', p: '20px', bgcolor: '#b3e5fc' }}
      direction="row"
      justifyContent="space-evenly"
    >
      <Typography>ETH My Coin Wallet</Typography>
      <Typography>Using ReactJS, Material UI, Redux Toolkit</Typography>
    </Stack>
  );
}

export default Footer;
