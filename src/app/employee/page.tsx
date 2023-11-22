"use client";
import React from 'react'
import { Flex } from '@chakra-ui/react'
import Employee from '@/app/employee/Employee'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'

export default function EmployeePage() {
  return (
    <Flex width="100vw" flexDir={"column"} bg = "white">
        <Navbar/>
        <Flex
            pt = {40}
            pb = {40}
            alignItems={'center'}
            justify={'center'}
        >
            <NavPage active='Employee' isAdmin={true}/>
        </Flex>
        <Employee/>
    </Flex>
  );
}

      // {/* DELETE LATER */}
      // {/* First Data */} + 45px
      // <Flex left="100px" top="170px" position="absolute" border="1px #000000 solid" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" display="inline-flex">
      //   {/* Employee table header */}
      //   <Flex width="85vw" paddingTop="12px" paddingBottom="12px" paddingLeft="24px" paddingRight="24px" background="#FFFFFF" border="1px" justifyContent="center" alignItems="center" gap="2vw" display="inline-flex">
      //       <Text width="8vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">12</Text>
      //       <Text width="20vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Martin Lonfat</Text>
      //       <Text width="15vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">081244445555</Text>
      //       <Text width="10vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">3</Text>
      //       <Text width="17vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 3, 2022</Text>
      //       <Text width="18vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 4, 2022</Text>
      //   </Flex>
      //   {/* Employee table divider */}
      //   <Box width="85vw" height="0px" border="1px" />
      // </Flex>

      // {/* Second Data and so on */}
      // {/* DELETE LATER */} / + 40 px
      // <Flex left="100px" top="210px" position="absolute" border="1px #000000 solid" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" display="inline-flex">
      //   {/* Employee table header */}
      //   <Flex width="85vw" paddingTop="12px" paddingBottom="12px" paddingLeft="24px" paddingRight="24px" background="#FFFFFF" border="1px" justifyContent="center" alignItems="center" gap="2vw" display="inline-flex">
      //       <Text width="8vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">12</Text>
      //       <Text width="20vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Martin Lonfat</Text>
      //       <Text width="15vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">081244445555</Text>
      //       <Text width="10vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">3</Text>
      //       <Text width="17vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 3, 2022</Text>
      //       <Text width="18vw" color="#082E4C" fontSize="14px" fontFamily="Inter" fontWeight="400" textAlign="center">Dec 4, 2022</Text>
      //   </Flex>

      //   {/* Employee table divider */}
      //   <Box width="85vw" height="0px" border="1px" />

      // </Flex>