import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { setCurrentAccount } from '../../walletSlice';

function AccountTable(props) {
  const { accountList } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToTransactionPage = (accountIndex) => {
    const setCurrentAccountAction = setCurrentAccount(accountList[accountIndex]);
    dispatch(setCurrentAccountAction);
    navigate(`/transaction/${accountList[accountIndex].address}`);
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
