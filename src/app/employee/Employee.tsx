"use client"
import React, {useState, useEffect} from 'react'

import {
  Flex,
  Image,
  Select,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import type { Employee } from '@prisma/client'
import { SearchIcon } from '@chakra-ui/icons'
import { ButtonCust } from '@/components/ButtonCust';

// const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
// const FLOOR_LIST = ['1', '2', '3', '4', '5']

const EmployeeTemp = () => {
  const [EmployeeData, setEmployeeData] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [type, setType] = useState<string>('');
  // const [floor, setFloor] = useState<string>('');
  // const [availability, setAvailability] = useState<boolean>(false);
  // const [undercons, setUndercons] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          name : searchQuery,
        }).toString();

        const response = await fetch(`/api/employeeManager?${queryParams}`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const employee: Employee[] = await response.json();
        // console.log(employee);
        setEmployeeData(employee);

      } catch (error) {
        alert ((error as Error).message);
      }
    };
    fetchData();
  },[searchQuery]);


  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // console.log(searchQuery);
  }

  return (
    <Flex
        width={'1200px'}
        py={30}
        // px={40}
        mx={"auto"}
        overflowX={'auto'}
        flexDir={'column'}
        gap={30}
        alignItems={'center'}
        // justifyContent={'center'}
    >
    {/* Searchbar */}
    <Input
        onChange={(e) => handleSearch(e)}
        placeholder={'Employee Name'}
        alignSelf={'flex-start'}
        width={'190px'}
        color={'#082E4C'}
        bgColor={'white'}
        padding={12}
        borderRadius={'6px'}
        border={'1px solid #247EC5'}
        fontSize={'14px'}
        fontWeight={'400'}
    />

    {/* Bungkus Tabel */}
    <Flex
        paddingX={'40px'}
        paddingBottom={'40px'}
        width={'100%'}
        overflowX={'auto'}
        flexDir={'column'}
        alignItems={'flex-start'} // Updated: Align items to the left
    >

        {/* Tabel */}
        <Flex
        width={'1200px'}
        flexDir={'column'}
        alignItems={'left'}
        justifyContent={'center'}
        mx={'auto'}
        border={'1px solid #247EC5;'}
        >
        {/* Tabel Header */}
        <Flex
            width={'100%'}
            py={12}
            pl={48}
            pr={96}
            gap={64}
            bgColor={'#E0F4FF'}
            fontSize={'14px'}
            fontWeight={'500'}
            color={'#082E4C'}
            overflowX={'auto'}
        >
            <Flex width='105px'>Employee ID</Flex>
            <Flex width='235px'>Employee Name</Flex>
            <Flex width='160px'>Contact</Flex>
            {/* <Flex width='100px'>Gender</Flex>
            <Flex width='100px'>Date of Birth</Flex>
            <Flex width='350px'>Address</Flex> */}
            <Flex width='150px'>Hire Date</Flex>
            <Flex width='150px'>Last Edit</Flex>
        </Flex>

        {/* Tabel Body */}
        {EmployeeData && EmployeeData.map((Employee) => 
        (
            <Flex
            key={Employee.employee_id}
            width={'100%'}
            alignItems={'center'}
            py={12}
            pl={48}
            pr={36}
            gap={36}
            fontSize={'14px'}
            fontWeight={'400'}
            color={'#082E4C'}
            bgColor={'white'}
            borderTop={'1px solid #247EC5;'}
            >
            <Flex width='133px'>{Employee.employee_id}</Flex>
            <Flex width='253px'>{Employee.name}</Flex>
            <Flex width='188px'>{Employee.contact}</Flex>
            {/* <Flex width='300px'>{Employee.gender}</Flex> */}
            {/* <Flex width='300px'>{(Employee.date_of_birth).toDateString()}</Flex> */}
            {/* <Flex width='350px'>{Employee.address}</Flex> */}
            <Flex width='178px'>{((new Date (Employee.hire_date)).toISOString().substring(0, 10))}</Flex>
            <Flex width='178px'>{((new Date (Employee.last_edit)).toISOString().substring(0, 10))}</Flex>
            {/* <Flex width='225px'>{(new Date (Employee.hire_date)).toDateString()}</Flex>
            <Flex width='225px'>{(new Date (Employee.last_edit)).toDateString()}</Flex> */}

            <a href={`/Employee/edit/${Employee.employee_id.toLowerCase()}`}>
                <Image
                src='icons/edit.svg'
                alt='Edit'
                width={24}
                height={24}
                cursor='pointer'
                />
            </a>
            </Flex>
        ))}
        </Flex>
    </Flex>
    </Flex>
  )
}

export default EmployeeTemp;