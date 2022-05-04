import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Stack, TextField, Button, Typography } from '@mui/material';

import { getProviderFromNetwork, parseEther } from '../../../../util/ethers';
import { TRANSACTION_STATUS } from '../../../../util/constant';

function SendTransactionPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');
  const [transactionState, setTransactionState] = useState(TRANSACTION_STATUS.start);
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
      console.log('transaction success: ', transaction);
      setTransactionState(TRANSACTION_STATUS.success);
    } catch (err) {
      console.log('transaction failed: ', err);
      setTransactionState(TRANSACTION_STATUS.failed);
    }
    setLoading(false);
  };

  const handleCancelTransaction = (e) => {
    navigate(-1);
  };
  const handleGotoTransactionHistory = (e) => {
    navigate(`/transaction/${fromAddress}`);
  };

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  if (transactionState !== TRANSACTION_STATUS.start) {
    return (
      <Stack direction="column" justifyContent="center" spacing={10}>
        {transactionState === TRANSACTION_STATUS.success ? (
          <Typography variant="h6" sx={{ color: 'green' }}>
            Transaction Success
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ color: 'red' }}>
            Transaction Failed
          </Typography>
        )}
        <Button color="secondary" onClick={handleGotoTransactionHistory} variant="contained">
          Go to Transaction History Page
        </Button>
      </Stack>
    );
  } else {
    return (
      <Stack direction="column" justifyContent="center" spacing={10}>
        <Typography variant="h6">
          Your current balance <b>{`${currentBalance} Ether`}</b>
        </Typography>
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
          {loading ? 'Sending' : 'Send'}
        </Button>
        <Button color="secondary" onClick={handleCancelTransaction} variant="contained">
          Cancel
        </Button>
      </Stack>
    );
  }
}

export default SendTransactionPage;
