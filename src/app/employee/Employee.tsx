import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react';
import { ButtonCust } from '@/components/ButtonCust';

const Employee: React.FC = () => {
  // const [value1, setValue1] = useState("");
  // const [value2, setValue2] = useState("");
  // const [resultComponent, setResultComponent] = useState<React.ReactNode | null>(null);

  // const processInputs = (value1: string, value2: string) => {
  //   console.log('Processed Inputs:', value1, value2);
  //   if (value1 === "test") {
  //     setResultComponent (
  //         <Flex left="100px" top="170px" position="absolute" border="1px #000000 solid" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" display="inline-flex">
  //           {/* Employee table header */}
  //           <Flex width="85vw" paddingTop="12px" paddingBottom="12px" paddingLeft="24px" paddingRight="24px" background="#FFFFFF" border="1px" justifyContent="center" alignItems="center" gap="2vw" display="inline-flex">
  //             <Text width="8vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">12</Text>
  //             <Text width="20vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Martin Lonfat</Text>
  //             <Text width="15vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">081244445555</Text>
  //             <Text width="10vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">3</Text>
  //             <Text width="17vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 3, 2022</Text>
  //             <Text width="18vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 4, 2022</Text>
  //           </Flex>
  //           {/* Employee table divider */}
  //           <Box width="85vw" height="0px" border="1px" />
  //         </Flex>
  //     );
  //   }
  //   if (value2 === "test") {
  //     setResultComponent (
  //       <Flex left="100px" top="210px" position="absolute" border="1px #000000 solid" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" display="inline-flex">
  //         {/* Employee table header */}
  //         <Flex width="85vw" paddingTop="12px" paddingBottom="12px" paddingLeft="24px" paddingRight="24px" background="#FFFFFF" border="1px" justifyContent="center" alignItems="center" gap="2vw" display="inline-flex">
  //           <Text width="8vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">12</Text>
  //           <Text width="20vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Martin Lonfat</Text>
  //           <Text width="15vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">081244445555</Text>
  //           <Text width="10vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">3</Text>
  //           <Text width="17vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 3, 2022</Text>
  //           <Text width="18vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 4, 2022</Text>
  //         </Flex>

  //         {/* Employee table divider */}
  //         <Box width="85vw" height="0px" border="1px" />

  //       </Flex>
  //     );
  //   }
  // };

  // const handleInputChange1 = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue1(event.target.value);
  // };

  // const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue2(event.target.value);
  // };

  return (
    <Box width="85vw" height="100vw" position="relative" background="white">

      <Flex left="100px" top="125px" position="absolute" border="1px #247EC5 solid" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" display="inline-flex">
        {/* Employee table header */}
        <Flex width="85vw" paddingTop="12px" paddingBottom="12px" paddingLeft="24px" paddingRight="24px" background="#E0F4FF" border="1px solid" justifyContent="center" alignItems="center" gap="2vw" display="inline-flex">
          <Text width="8vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">ID</Text>
          <Text width="20vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Employee Name</Text>
          <Text width="15vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Contact</Text>
          <Text width="10vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Floor Assigned</Text>
          <Text width="17vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Hire Date</Text>
          <Text width="18vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Last Edit</Text>
        </Flex>

        {/* Employee table divider */}
        <Box width="85vw" height="0px" border="1px #247EC5 solid" />

      </Flex>

      {/* Add Employee button */}
      <Flex height="44px" paddingLeft="15px" paddingRight="15px" paddingTop="10px" paddingBottom="10px" left="79.5vw" top="50px" position="absolute" background="#39A7FF" borderRadius="6px" overflow="hidden" justifyContent="flex-start" alignItems="center" gap="12px" display="inline-flex">
        <ButtonCust currDir="Employee" />
      </Flex>

      {/* <Flex flexDirection="column" alignItems="center" marginTop="20px">
        <Input value={value1} onChange={handleInputChange1} placeholder="Input 1" />
        <Input value={value2} onChange={handleInputChange2} placeholder="Input 2" />
        <Button onClick={() => processInputs(value1, value2)}>Submit</Button>
      </Flex>

      {resultComponent} */}
    </Box>
  );
};

export default Employee;