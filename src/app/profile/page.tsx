'use client'

import React, { useState } from 'react'
import {
  Flex,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  Input,
  ChakraProvider
} from '@chakra-ui/react'

export default function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const InputPass = ({text} : {text: string}) => {
    return (
      <FormControl mt={4}>
      <InputGroup>
        <Input
            placeholder={text}
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
    )
  }

  return (
    <ChakraProvider>
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
          py={4}
          textAlign="left"
          size="lg"
          width="300px"
          fontSize={'32px'}
          fontWeight={'700'}
          color={'#28293D'}
        >
          Room Repair and Occupancy Control System
        </Heading>
        <InputPass text={'Old Password'}/>
        <InputPass text={'New Password'}/>
        <InputPass text={'Confirm New Password'}/>
      </Flex>
    </Flex>
    </ChakraProvider>
  )
}