"use client";
import { useState, useEffect } from "react";
import { Flex, Box, InputGroup, InputRightElement, Heading, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ButtonCust } from "@/components/ButtonCust";
// import type { Employee } from '@prisma/client'
import { signIn } from "next-auth/react"

export const handleLoginMod = async ({ username, password } : { username: string, password: string }) => {
    try {
        const signInData = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        });
        // console.log(username);
        // console.log(password);
        // console.log(signInData);
        if (signInData?.status === 200) {
            return "Login"
        } else {
            return "Unauthorized"
        }
    } catch (error) {
        return "Unauthorized"
    }
    
    // const queryParams = new URLSearchParams({
    //     username : username,
    //     password : password
    // }).toString();

    // const response = await fetch(`http://localhost:3000/api/employeeManager?${queryParams}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // const empl:Employee[] = await response.json();

    // if (empl.length > 0) {
    //     return "Login";
    // } else {
    //     return "Unauthorized";
    // }
}

const LoginMod = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [currDir, setCurrDir] = useState("");
    useEffect(() => {
        const checkCurrDir = async () => {
            const dir = await handleLoginMod({ username, password });
            setCurrDir(dir);
        }
        checkCurrDir();
    });
    console.log(currDir);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Flex
                bg="#E0F4FF"
                p={12}
                borderRadius="20px"
                boxShadow="md"
                textAlign="center"
                flexDir={'column'}
            >
                <Heading
                    paddingTop={4}
                    textAlign="left"
                    size="lg"
                    width="300px"
                    fontSize={'32px'}
                    fontWeight={'700'}
                    color={'#28293D'}
                >
                    Room Repair and Occupancy Control System
                </Heading>
                <FormControl mt={5}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        bgColor={'#F1FAFF'}
                        color="#082E4C"
                        borderRadius={'6px'}
                        border={'1px solid #247EC5'}
                        fontSize={'14px'}
                        fontWeight={'400'}
                        _placeholder={{
                            fontSize: "14px",
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
                            bgColor={'#F1FAFF'}
                            color="#082E4C"
                            borderRadius={'6px'}
                            border={'1px solid #247EC5'}
                            fontSize={'14px'}
                            fontWeight={'400'}
                            _placeholder={{
                                fontSize: "14px",
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
            </Flex>
        </Flex>
    );
};

export default LoginMod;
