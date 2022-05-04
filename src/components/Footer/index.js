import { Stack, Typography } from '@mui/material';

function Footer(props) {
  return (
    <Stack
      sx={{ mt: 'auto', p: '20px', bgcolor: '#b3e5fc' }}
      direction="row"
      justifyContent="space-evenly"
    >
      <Typography>
        Using{' '}
        <a href="https://docs.ethers.io/v5/" target="_blank" rel="noreferrer">
          Ethers.js
        </a>
        ,{' '}
        <a href="https://www.npmjs.com/package/bip39" target="_blank" rel="noreferrer">
          bip39
        </a>{' '}
        to create core features
      </Typography>
      <Typography>
        UI built on{' '}
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
          ReactJS
        </a>
        ,{' '}
        <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">
          Redux Toolkit
        </a>
        ,{' '}
        <a href="https://mui.com/" target="_blank" rel="noreferrer">
          Material UI
        </a>
      </Typography>
    </Stack>
  );
}

export default Footer;
