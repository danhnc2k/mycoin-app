import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/Main';

function Transaction(props) {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default Transaction;
