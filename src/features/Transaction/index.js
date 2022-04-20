import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/Main';
import SendTransactionPage from './pages/SendTransaction';

function Transaction(props) {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="send" element={<SendTransactionPage />} />
    </Routes>
  );
}

export default Transaction;
