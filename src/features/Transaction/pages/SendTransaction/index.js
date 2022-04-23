import { useParams } from 'react-router-dom';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { getProviderFromNetwork, parseEther } from '../../../../util/ethers';
import { useSelector } from 'react-redux';
import { Signer } from 'ethers';

function SendTransactionPage(props) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');
  const fromAddress = params.address;

  const currentAccount = useSelector((state) => state.wallet.currentAccount);
  const currentBalance = useSelector((state) => state.wallet.currentBalance);
  const currentNetwork = useSelector((state) => state.network.currentNetwork);
  const provider = getProviderFromNetwork(currentNetwork);

  const handleSendTransaction = async (e) => {
    const amountToSend = parseEther(amount);
    const walletSigner = currentAccount.connect(provider);
    const tx = {
      to: toAddress,
      value: amountToSend,
    };
    setLoading(true);
    try {
      await currentAccount.signTransaction(tx);
      const transaction = await walletSigner.sendTransaction(tx);
      console.log('transaction completed: ', transaction);
    } catch (err) {
      console.log('transaction failed: ', err);
    }
    setLoading(false);
  };

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Typography>{`Your current balance: ${currentBalance} Ether`}</Typography>
      <TextField name="from" label="From" value={fromAddress} variant="outlined" disabled />
      <TextField
        name="to"
        label="To"
        value={toAddress}
        variant="outlined"
        onChange={handleToAddressChange}
      />
      <TextField
        name="amount"
        label="Amount"
        value={amount}
        onChange={handleAmountChange}
        variant="outlined"
        type="number"
      />
      <Button
        color="primary"
        onClick={handleSendTransaction}
        disabled={loading}
        variant="contained"
      >
        Send
      </Button>
    </Stack>
  );
}

export default SendTransactionPage;
