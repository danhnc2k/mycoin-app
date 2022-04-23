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
import { updateCurrentAccount, updateCurrentBalance } from '../../walletSlice';

function AccountTable(props) {
  const { accountList, balanceList } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToTransactionPage = (index) => {
    const updateCurrentAccountAction = updateCurrentAccount(accountList[index]);
    dispatch(updateCurrentAccountAction);
    const updateCurrentBalanceAction = updateCurrentBalance(balanceList[index]);
    dispatch(updateCurrentBalanceAction);
    navigate(`/transaction/${accountList[index].address}`);
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
              <TableCell align="right">{balanceList[index]}</TableCell>
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
