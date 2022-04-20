import { useParams } from 'react-router-dom';
import { Stack, TextField, Button } from '@mui/material';
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
    await currentAccount.signTransaction(tx);
    const transaction = await walletSigner.sendTransaction(tx);
    setLoading(false);
    console.log('transaction finished: ', transaction);
  };

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
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
        color="secondary"
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
