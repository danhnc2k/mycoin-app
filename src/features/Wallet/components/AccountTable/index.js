import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@mui/material';

function AccountTable(props) {
  const { accountList } = props;

  const handleGoToTransactionPage = (accountIndex) => {
    console.log('handleGoToTransactionPage', accountIndex);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Transactions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountList.map((account, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {account.address}
              </TableCell>
              <TableCell align="right">{account.balance}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleGoToTransactionPage(index)}>Go To Detail page</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AccountTable;
