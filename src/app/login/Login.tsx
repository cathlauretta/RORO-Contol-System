import { useState, useEffect } from "react";
import { Box, InputGroup, InputRightElement, Heading, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ButtonCust } from "../../components/ButtonCust";
import type { Employee } from '@prisma/client'

async function handleLogin({ username, password } : { username: string, password: string }) {
    const queryParams = new URLSearchParams({
        username : username,
        password : password
    }).toString();

    const response = await fetch(`http://localhost:3000/api/employeeManager?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const empl:Employee[] = await response.json();

    if (empl.length > 0) {
        return "Login";
    } else {
        return "Unauthorized";
    }
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [currDir, setCurrDir] = useState("");
    useEffect(() => {
        const checkCurrDir = async () => {
            const dir = await handleLogin({ username, password });
            setCurrDir(dir);
        }
        checkCurrDir();
    });

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Box maxW="md" mx="auto" p={4}>
                <Box bg="#E0F4FF" p={4} borderRadius="md" boxShadow="md" textAlign="center">
                    <Heading mb={4} textAlign="center" size="lg" width="300px">
                        Room Repair and Occupancy (RORO) Control System
                    </Heading>
                    <FormControl mt={5}>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            color="082E4C"
                            borderColor="#247EC5"
                            _placeholder={{
                                fontSize: "12px",
                                color: "#082E4C",  // Placeholder text color
                            }}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                color="082E4C"
                                borderColor="#247EC5"
                                _placeholder={{
                                    fontSize: "12px",
                                    color: "#082E4C",  // Placeholder text color
                                }}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="xs" onClick={toggleShowPassword} variant="outline">
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                <ButtonCust currDir={currDir}/>
                {/* <Box width="100%">
                        <Button bg="#39A7FF" color="#FFFFFF" mt={4} onClick={handleLogin} width="100%">
                                Login
                        </Button>
                </Box> */}
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
