"use client"
import React, {useState, useEffect} from 'react'

import {
  ChakraProvider,
  Flex,
  Select,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react'
import { AddButton } from '@/components/AddButton'
import type { Employee } from '@prisma/client'
import { SearchIcon } from '@chakra-ui/icons'
import { ButtonCust } from '@/components/ButtonCust';

const FLOOR_LIST = ['1', '2', '3', '4', '5']
const DEFAULT_BORDER_RADIUS = '6px'
const DEFAULT_TEXT_COLOR = '#082E4C'

const EmployeeTemp = () => {
  const [EmployeeData, setEmployeeData] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [floor, setFloor] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          name : searchQuery,
          floor_assigned : floor,
        }).toString();

        const response = await fetch(`/api/employeeManager?${queryParams}`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const employee: Employee[] = await response.json();
        setEmployeeData(employee);

      } catch (error) {
        alert ((error as Error).message);
      }
    };
    fetchData();
  },[searchQuery]);


  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handleFloor = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setFloor(e.target.value);
  }

  return (
    <ChakraProvider>
    <Flex
      padding={'40px'}
      width={'100%'}
      overflowX={'auto'}
      flexDir={'column'}
      gap={'40px'}
    >
      <Flex
        width={'1304px'}
        mx={'auto'}
        flexDir={'row'}
        gap={'30px'}
        alignItems={'center'}
      >
        {/* Searchbar */}
        <Input
          onChange={(e) => handleSearch(e)}
          placeholder={'Employee Name'}
          color={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
          width={'190px'}
          fontSize={'14px'}
          fontWeight={'400'}
        />

        {/* Dropdown Floor Assigned */}
        <Select
          placeholder='Floor'
          onChange={(e) => handleFloor(e)}
          bg={'white'}
          width={'100px'}
          textColor={DEFAULT_TEXT_COLOR}
          fontSize={'14px'}
          fontWeight={'400'}
          borderColor={'white'}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
        >
          {FLOOR_LIST.map((floor) => (
              <option value={floor}>{floor}</option>
          ))}
        </Select>
        
        <Spacer/>

        <AddButton url={'/employee/add-employee'} text={'Add New Employee'}/>
      </Flex>

      {/* Tabel */}
      <Flex
        width={'1304px'}
        flexDir={'column'}
        alignItems={'left'}
        justifyContent={'center'}
        mx={'auto'}
        border={'1px solid #247EC5'}
      >
        {/* Tabel Header */}
        <Flex
          width={'100%'}
          py={'12px'}
          pl={'48px'}
          pr={'96px'}
          gap={'64px'}
          bgColor={'#E0F4FF'}
          fontSize={'14px'}
          fontWeight={'500'}
          color={DEFAULT_TEXT_COLOR}
        >
            <Flex width='120px'>Employee ID</Flex>
            <Flex width='200px'>Employee Name</Flex>
            <Flex width='150px'>Contact</Flex>
            {/* <Flex width='100px'>Gender</Flex>
            <Flex width='100px'>Date of Birth</Flex>
            <Flex width='350px'>Address</Flex> */}
            <Flex width='100px'>Floor Assigned</Flex>
            <Flex width='121px'>Hire Date</Flex>
            <Flex width='138px'>Last Edit</Flex>
        </Flex>

        {/* Tabel Body */}
        {EmployeeData && EmployeeData.map((Employee) => 
        (
            <Flex
            key={Employee.employee_id}
            width={'100%'}
            alignItems={'center'}
            py={'12px'}
            pl={'48px'}
            pr={'36px'}
            gap={'36px'}
            fontSize={'14px'}
            fontWeight={'400'}
            color={DEFAULT_TEXT_COLOR}
            bgColor={'white'}
            borderTop={'1px solid #247EC5'}
            >
            <Flex width='148px'>{Employee.employee_id}</Flex>
            <Flex width='228px'>{Employee.name}</Flex>
            <Flex width='178px'>{Employee.contact}</Flex>
            {/* <Flex width='300px'>{Employee.gender}</Flex> */}
            {/* <Flex width='300px'>{(Employee.date_of_birth).toDateString()}</Flex> */}
            {/* <Flex width='350px'>{Employee.address}</Flex> */}
            <Flex width='128px'>{Employee.floor_assigned}</Flex>
            <Flex width='150px'>{((new Date (Employee.hire_date)).toISOString().substring(0, 10))}</Flex>
            <Flex width='147px'>{((new Date (Employee.last_edit)).toISOString().substring(0, 10))}</Flex>
            {/* <Flex width='225px'>{(new Date (Employee.hire_date)).toDateString()}</Flex>
            <Flex width='225px'>{(new Date (Employee.last_edit)).toDateString()}</Flex> */}

            <a href={`/Employee/edit/${Employee.employee_id.toLowerCase()}`}>
                <Image
                src='icons/edit.svg'
                alt='Edit'
                width={'24px'}
                height={'24px'}
                cursor='pointer'
                />
            </a>
            </Flex>
        ))}
        </Flex>
    </Flex>
    </ChakraProvider>
    //</Flex>
  )
}

export default EmployeeTemp;