import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import TransactionTable from '../../components/TransactionTable/TransactionTable';

import { fetchTransactionList } from '../../../../api/transaction';

import { formatEther } from '../../../../util/ethers';
import { convertTimestampToDateTime } from '../../../../util/time';

function MainPage(props) {
  const navigate = useNavigate();
  const currentNetwork = useSelector((state) => state.network.currentNetwork);
  const currentAccount = useSelector((state) => state.wallet.currentAccount);
  const [loading, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    const getTransactionList = async () => {
      setLoading(true);
      try {
        const transactions = await fetchTransactionList(currentNetwork, currentAccount.address);
        const formattedTransactions = formatTransactionList(transactions);
        setTransactionList(formattedTransactions);
      } catch (err) {
        console.log('fetch transaction list failed: ', err);
      }
      setLoading(false);
    };
    getTransactionList();
  }, [currentNetwork]);

  const formatTransactionList = (transactions) => {
    return transactions.map((transaction) => ({
      ...transaction,
      time: convertTimestampToDateTime(transaction.timeStamp),
      value: formatEther(transaction.value.toString()) + ' Ether',
      txnFee: formatEther((transaction.gasUsed * transaction.gasPrice).toString()),
    }));
  };

  const handleSendTransaction = (e) => {
    navigate('send');
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={10}>
      <Button onClick={handleSendTransaction} variant="contained">
        Go to Send Transaction Page
      </Button>
      <Typography align="center" variant="h5">
        Transaction history
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TransactionTable transactionList={transactionList} />
      )}
    </Stack>
  );
}
export default MainPage;
