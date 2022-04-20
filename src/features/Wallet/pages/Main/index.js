import { useNavigate } from 'react-router-dom';
import { Button, Stack, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addAddress, updateBalances } from '../../walletSlice';
import AccountTable from '../../components/AccountTable';

function MainPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.wallet.isConnected);
  const currentNetwork = useSelector((state) => state.network.currentNetwork);
  const accountList = useSelector((state) => state.wallet.accountList);

  useEffect(() => {
    console.log('run effect');
    handleCheckBalances();
  }, [accountList]);

  const handleCreateWallet = (e) => {
    navigate('create-wallet');
  };

  const handleImportWallet = (e) => {
    navigate('import-wallet');
  };

  const handleAddNewAddress = (e) => {
    const addNewAddressAction = addAddress();
    dispatch(addNewAddressAction);
  };

  const handleCheckBalances = (e) => {
    if (accountList && accountList.length > 0) {
      const addressList = accountList.map((account) => account.address);
      const getBalanceAction = updateBalances(addressList, currentNetwork);
      dispatch(getBalanceAction);
    }
  };

  if (isConnected) {
    return (
      <Stack direction="column" justifyContent="center" spacing={10}>
        <AccountTable accountList={accountList} />
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={handleAddNewAddress}>Add new Address</Button>
          <Button onClick={handleCheckBalances}>Check balances</Button>
        </ButtonGroup>
      </Stack>
    );
  } else {
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
}

export default MainPage;
