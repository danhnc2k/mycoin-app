import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/Main';

function Wallet(props) {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default Wallet;
