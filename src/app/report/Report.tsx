"use client"
import React, { useEffect } from 'react'
import {
  ChakraProvider,
  Flex,
  Image,
  Input,
  Spacer
} from '@chakra-ui/react'
import { AddButton } from '@/components/AddButton'
import { Report } from '@prisma/client'

const DEFAULT_BORDER_RADIUS = '6px'
const DEFAULT_TEXT_COLOR = '#082E4C'

export default function ReportPageTemp() {
  const [reportData, setReportData] = React.useState<Report[]>([]);
  const [searchReportQuery, setSearchReportQuery] = React.useState<string>('');
  const [searchRoomQuery, setSearchRoomQuery] = React.useState<string>('');
  const [searchEmployeeQuery, setSearchEmployeeQuery] = React.useState<string>('');
  const [inspect, setInspect] = React.useState<string>('');
  const [repair, setRepair] = React.useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          report_title : searchReportQuery,
          room_repaired : searchRoomQuery,
          eic : searchEmployeeQuery,
          type : inspect ? 'Inspect' : repair ? 'Repair' : '',
        }).toString();

        const response = await fetch(`/api/reportManager?${queryParams}`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const reports: Report[] = await response.json();
        setReportData(reports);

      } catch (error) {
        alert ((error as Error).message);
      }
    };
    fetchData();
  },[searchReportQuery, searchRoomQuery, searchEmployeeQuery, inspect, repair]);

  const handleSearchReport = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchReportQuery(e.target.value);
  }

  const handleSearchRoom = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchRoomQuery(e.target.value);
  }

  const handleSearchEmployee = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmployeeQuery(e.target.value);
  }

  const handleType = (type : string) => {
    if (type === "Inspect") {
      setInspect(inspect === "Inspect" ? '' : type);
      setRepair('');
    }
    else if (type === "Repair") {
      setRepair(repair === "Repair" ? '' : type);
      setInspect('');
    }

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
      {/* Search and Filtering */}
      <Flex
        width={'1304px'}
        mx={'auto'}
        flexDir={'row'}
        gap={'30px'}
        alignItems={'center'}
      >
        {/* Report Title Search Bar */}
        <Input
          onChange={(e) => handleSearchReport(e)}
          placeholder={'Report Title'}
          color={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
          width={'210px'}
          fontSize={'14px'}
          fontWeight={'400'}
        />

        {/* Room Name Search Bar */}
        <Input
          onChange={(e) => handleSearchRoom(e)}
          placeholder={'Room Name'}
          color={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
          width={'210px'}
          fontSize={'14px'}
          fontWeight={'400'}
        />

        {/* Employee in Charge Search Bar */}
        <Input
          onChange={(e) => handleSearchEmployee(e)}
          placeholder={'Employee In Charge'}
          color={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
          width={'210px'}
          fontSize={'14px'}
          fontWeight={'400'}
        />

        {/* Type Button */}
        <Flex
          flexDir={'row'}
          border={'1px solid #247EC5'}
          borderRadius={DEFAULT_BORDER_RADIUS}
        >
          {/* Inspect */}
          <Flex
            onClick={() => handleType("Inspect")}
            px={'16px'}
            height={'40px'}
            color={DEFAULT_TEXT_COLOR}
            fontSize={'14px'}
            fontWeight={'400'}
            borderRight={'1px solid #247EC5'}
            cursor={'pointer'}
            alignItems={'center'}
            justifyContent={'center'}
            borderTopLeftRadius={DEFAULT_BORDER_RADIUS}
            borderBottomLeftRadius={DEFAULT_BORDER_RADIUS}
            bgColor={inspect? '#FFF6E0' : 'transparent'	}
            _hover={
              {
                bgColor:'#FFF6E0',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'ease-in-out',
                borderTopLeftRadius: DEFAULT_BORDER_RADIUS,
                borderBottomLeftRadius: DEFAULT_BORDER_RADIUS,
              }
            }
          >
            Inspect
          </Flex>
          
          {/* Repair */}
          <Flex
            onClick={() => handleType("Repair")}
            px={'16px'}
            height={'40px'}
            color={DEFAULT_TEXT_COLOR}
            fontSize={'14px'}
            fontWeight={'400'}
            cursor={'pointer'}
            alignItems={'center'}
            justifyContent={'center'}
            borderTopRightRadius={DEFAULT_BORDER_RADIUS}
            borderBottomRightRadius={DEFAULT_BORDER_RADIUS}
            bgColor={repair? '#DBECF5' : 'transparent'	}
            _hover={
              {
                bgColor:'#DBECF5',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'ease-in-out',
                borderTopRightRadius: DEFAULT_BORDER_RADIUS,
                borderBottomRightRadius: DEFAULT_BORDER_RADIUS,
              }
            }
          >
            Repair
          </Flex>
        </Flex>

        <Spacer/>

        <AddButton url={'/report/add-report'} text={'Add New Report'}/>
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
          gap={'36px'}
          bgColor={'#E0F4FF'}
          fontSize={'14px'}
          fontWeight={'500'}
          color={DEFAULT_TEXT_COLOR}
        >
          <Flex width='120px'>Report ID</Flex>
          <Flex width='316px'>Report Title</Flex>
          <Flex width='100px'>Type</Flex>
          <Flex width='140px'>Room Name</Flex>
          <Flex width='140px'>Date</Flex>
          <Flex width='150px'>Employee</Flex>
        </Flex>

        {/* Tabel Body */}
        {reportData && reportData.map((report) => {
          const date = new Date(report.date).toLocaleDateString('en-GB');

          return (
            <Flex
              key={report.report_id}
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
              <Flex width='120px'>{report.report_id}</Flex>
              <Flex width='316px'>{report.report_title}</Flex>
              <Flex width='100px'>{report.type}</Flex>
              <Flex width='140px'>{report.room_repaired}</Flex>
              <Flex width='140px'>{date}</Flex>
              <Flex width='150px'>{report.eic}</Flex>
              {/* <a href={`/report/edit/${report.report_id}`}>
                <Image
                  src='icons/edit.svg'
                  alt='Edit'
                  width={'24px'}
                  height={'24px'}
                  cursor='pointer'
                />
              </a> */}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
    </ChakraProvider>
  )
}