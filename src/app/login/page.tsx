// "use client";
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

const LoginPage = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session?.user);
    return (
        <ChakraProvider>
            <Login/>
        </ChakraProvider>
    );
};

export default LoginPage;