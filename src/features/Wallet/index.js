import { Routes, Route } from 'react-router-dom';

import NotFound from '../../components/NotFound';

import MainPage from './pages/Main';
import CreateWalletPage from './pages/CreateWallet';
import ImportWalletPage from './pages/ImportWallet';

function Wallet(props) {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="create-wallet" element={<CreateWalletPage />} />
      <Route path="import-wallet" element={<ImportWalletPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Wallet;
