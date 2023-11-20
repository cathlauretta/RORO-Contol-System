"use client";
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';

const LoginPage: React.FC = () => {
    const handleLogin = (username: string, password: string) => {
    // Your login logic here
    console.log('Logging in with:', { username, password });
};

return (
    <ChakraProvider>
        <Login onLogin={handleLogin} />
    </ChakraProvider>
);
};

export default LoginPage;