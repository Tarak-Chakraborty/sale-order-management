import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'Ram' && email === 'jesus_christ@church.com') {
      setAuthenticated(true);
      navigate('/');
    } else {
      toast({
        title: 'Invalid credentials',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">Login</Heading>
      <FormControl id="username" mb="4">
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl id="password" mb="4">
        <FormLabel>Email</FormLabel>
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
