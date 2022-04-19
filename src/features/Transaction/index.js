import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/Main';

function Transaction(props) {
  return (
    <Routes>
      <Route index element={<MainPage />} />
    </Routes>
  );
}

export default Transaction;
