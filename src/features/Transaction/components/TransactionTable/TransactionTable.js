import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

function TransactionTable(props) {
  const { transactionList } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Txn Hash</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Txn Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!transactionList.length ? (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>No transaction</TableCell>
            </TableRow>
          ) : (
            transactionList.map((transaction, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {transaction.hash}
                </TableCell>
                <TableCell align="right">{transaction.blockNumber}</TableCell>
                <TableCell align="right">{transaction.time}</TableCell>
                <TableCell align="right">{transaction.from}</TableCell>
                <TableCell align="right">{transaction.to}</TableCell>
                <TableCell align="right">{transaction.value}</TableCell>
                <TableCell align="right">{transaction.txnFee}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;
