import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, TextField, Typography } from '@mui/material';

import {
  addAddress,
  removeWallet,
  updateAccountList,
  updateBalances,
  updateMnemonic,
  updateStatus,
} from '../../walletSlice';
import AccountTable from '../../components/AccountTable';

import {
  loadEncryptedWalletsFromLocalStorage,
  saveEncryptedWalletsToLocalStorage,
  removeEncryptedWalletsFromLocalStorage,
} from '../../../../util/storage';
import { getWalletFromEncryptedJson } from '../../../../util/ethers';
import { WALLET_STATUS } from '../../../../util/constant';

function MainPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.wallet.status);
  const currentNetwork = useSelector((state) => state.network.currentNetwork);
  const accountList = useSelector((state) => state.wallet.accountList);
  const balanceList = useSelector((state) => state.wallet.balanceList);
  const passwordToEncrypt = useSelector((state) => state.wallet.passwordToEncrypt);
  const [password, setPassword] = useState('');
  const [encryptedWallets, setEncryptedWallets] = useState([]);
  const [passwordError, setPasswordError] = useState('');

  // run once to check if wallet is stored in local storage
  useEffect(() => {
    const wallets = loadEncryptedWalletsFromLocalStorage();
    setEncryptedWallets(wallets);
    if (wallets.length) {
      const updateStatusAction = updateStatus(WALLET_STATUS.locked);
      dispatch(updateStatusAction);
    }
  }, []);

  // run to check balance if network change
  useEffect(() => {
    if (accountList.length > 0) {
      handleCheckBalances();
    }
  }, [currentNetwork]);

  //run to save account list to local storage if accountList change
  useEffect(() => {
    if (accountList.length > 0 && passwordToEncrypt !== '') {
      const saveSession = async () => {
        // encrypt wallet and save to local storage
        const encryptedWallets = [];
        for (const account of accountList) {
          const encryptedAccount = await account.encrypt(passwordToEncrypt);
          encryptedWallets.push(encryptedAccount);
        }
        saveEncryptedWalletsToLocalStorage(encryptedWallets);
      };
      saveSession();
    }
    handleCheckBalances();
  }, [accountList]);

  //

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUnlockWallet = async (e) => {
    const walletList = [];
    setPasswordError('');
    try {
      for (const encryptedWallet of encryptedWallets) {
        const wallet = await getWalletFromEncryptedJson(encryptedWallet, password);
        walletList.push(wallet);
      }
      if (walletList.length) {
        const updateAccountListAction = updateAccountList(walletList);
        dispatch(updateAccountListAction);
        const updateMnemonicAction = updateMnemonic(walletList[0].mnemonic.phrase);
        dispatch(updateMnemonicAction);
      }
    } catch (err) {
      console.log('incorrect password', err);
      setPasswordError(err.toString());
    }
  };

  const handleRemoveWallet = (e) => {
    const removeWalletAction = removeWallet();
    dispatch(removeWalletAction);
    removeEncryptedWalletsFromLocalStorage();
    window.location.reload();
  };

  //

  const handleAddNewAddress = (e) => {
    const addNewAddressAction = addAddress();
    dispatch(addNewAddressAction);
  };

  const handleCheckBalances = (e) => {
    //console.log('handle check balance: ', accountList, currentNetwork);
    if (accountList && accountList.length > 0) {
      const addressList = accountList.map((account) => account.address);
      const updateBalanceAction = updateBalances({
        addressList: addressList,
        network: currentNetwork,
      });
      dispatch(updateBalanceAction);
    }
  };

  //

  const handleCreateWallet = (e) => {
    navigate('create-wallet');
  };

  const handleImportWallet = (e) => {
    navigate('import-wallet');
  };

  if (status === 'LOCKED') {
    return (
      <Stack direction="column" justifyContent="center" spacing={10}>
        <Typography variant="h6">Enter password to unlock wallet</Typography>
        <TextField
          required
          id="outlined-required"
          label="Required"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError !== '' && <Typography sx={{ color: 'red' }}>{passwordError}</Typography>}
        <Button variant="contained" color="primary" onClick={handleUnlockWallet}>
          Unlock Wallet
        </Button>
        <Typography variant="h6">Remove wallet from this device</Typography>
        <Button variant="contained" color="secondary" onClick={handleRemoveWallet}>
          Remove Wallet
        </Button>
      </Stack>
    );
  } else if (status === 'CONNECTED') {
    return (
      <Stack direction="column" justifyContent="center" spacing={10}>
        <AccountTable accountList={accountList} balanceList={balanceList} />
        <Stack direction="row" justifyContent="center" spacing={10}>
          <Button variant="contained" color="secondary" onClick={handleAddNewAddress}>
            Add new Address
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCheckBalances}>
            Check balances
          </Button>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" justifyContent="center" spacing={10}>
        <Button variant="contained" color="primary" onClick={handleCreateWallet}>
          Create Wallet
        </Button>
        <Button variant="contained" color="secondary" onClick={handleImportWallet}>
          Import Wallet
        </Button>
      </Stack>
    );
  }
}

export default MainPage;
