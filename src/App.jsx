import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import Login from './Login';
import SaleOrders from './SaleOrders';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('authenticated');
    setAuthenticated(isLoggedIn === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  return (
    <Box p={4}>
      <Button onClick={toggleColorMode} mb={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route
          path="/"
          element={
            authenticated ? <SaleOrders /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
