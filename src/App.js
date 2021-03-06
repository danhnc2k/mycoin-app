import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';

import Header from './components/Header';
import Footer from './components/Footer';

import Wallet from './features/Wallet';
import Transaction from './features/Transaction';

import './App.css';
import { Container } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container
        sx={{
          height: '100%',
          py: '10%',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Wallet />} />
            <Route path="/transaction/:address/*" element={<Transaction />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
