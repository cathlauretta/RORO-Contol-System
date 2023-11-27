"use client"
import React, { useEffect } from 'react'
import {
  Flex,
  Image,
  Input
} from '@chakra-ui/react'
import { Report } from '@prisma/client'

export default function ReportPageTemp() {
  const [reportData, setReportData] = React.useState<Report[]>([]);
  const [searchReportQuery, setSearchReportQuery] = React.useState<string>('');
  const [searchRoomQuery, setSearchRoomQuery] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [inspect, setInspect] = React.useState<string>('');
  const [repair, setRepair] = React.useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          report_title : searchReportQuery,
          room_repaired : searchRoomQuery,
          date : date,
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
  },[searchReportQuery, searchRoomQuery, date, inspect, repair]);

  const handleSearchReport = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchReportQuery(e.target.value);
  }

  const handleSearchRoom = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchRoomQuery(e.target.value);
  }

  const handleDate = (e : React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
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
    <Flex
      //paddingX={'40px'}
      paddingBottom={'20px'}
      width={'100%'}
      overflowX={'auto'}
      flexDir={'column'}
    >

          {/* Search and Filtering */}
          <Flex
            width={'1304px'}
            py={30}
            mx={'auto'}
            flexDir={'row'}
            gap={30}
          >
            <Input
              onChange={(e) => handleSearchReport(e)}
              placeholder={'Report Title'}
              color={'#082E4C'}
              bgColor={'white'}
              padding={12}
              borderRadius={'6px'}
              border={'1px solid #247EC5'}
              fontSize={'14px'}
              fontWeight={'400'}
            />

            <Input
              onChange={(e) => handleSearchRoom(e)}
              placeholder={'Room Name'}
              color={'#082E4C'}
              bgColor={'white'}
              padding={12}
              borderRadius={'6px'}
              border={'1px solid #247EC5'}
              fontSize={'14px'}
              fontWeight={'400'}
            />

            <Input
              onChange={(e) => handleDate(e)}
              placeholder={'Date'}
              color={'#082E4C'}
              bgColor={'white'}
              padding={12}
              borderRadius={'6px'}
              border={'1px solid #247EC5'}
              fontSize={'14px'}
              fontWeight={'400'}
            />

            {/* Type Button */}
            <Flex
              flexDir={'row'}
              border={'1px solid #247EC5'}
              borderRadius={'6px'}
            >
              {/* Inspect */}
              <Flex
                onClick={() => handleType("Inspect")}
                px={16}
                py={12}
                color={'#082E4C'}
                fontSize={'14px'}
                fontWeight={'400'}
                borderRight={'1px solid #247EC5'}
                cursor={'pointer'}
                borderTopLeftRadius={'6px'}
                borderBottomLeftRadius={'6px'}
                bgColor={inspect? '#FFF6E0' : 'transparent'	}
                _hover={
                  {
                    bgColor:'#FFF6E0',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'ease-in-out',
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                  }
                }
              >
                Inspect
              </Flex>
              
              {/* Repair */}
              <Flex
                onClick={() => handleType("Repair")}
                px={16}
                py={12}
                color={'#082E4C'}
                fontSize={'14px'}
                fontWeight={'400'}
                cursor={'pointer'}
                borderTopRightRadius={'6px'}
                borderBottomRightRadius={'6px'}
                bgColor={repair? '#DBECF5' : 'transparent'	}
                _hover={
                  {
                    bgColor:'#DBECF5',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'ease-in-out',
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                  }
                }
              >
                Repair
              </Flex>
            </Flex>
          </Flex>

          {/* Tabel */}
          <Flex
            width={'1304px'}
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
              gap={36}
              bgColor={'#E0F4FF'}
              fontSize={'14px'}
              fontWeight={'500'}
              color={'#082E4C'}
              overflowX={'auto'}
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
                  py={12}
                  pl={48}
                  pr={36}
                  gap={36}
                  fontSize={'14px'}
                  fontWeight={'400'}
                  color={'#082E4C'}
                  borderTop={'1px solid #247EC5;'}
                >
                  <Flex width='120px'>{report.report_id}</Flex>
                  <Flex width='316px'>{report.report_title}</Flex>
                  <Flex width='100px'>{report.type}</Flex>
                  <Flex width='140px'>{report.room_repaired}</Flex>
                  <Flex width='140px'>{date}</Flex>
                  <Flex width='140px'>{report.eic}</Flex>
                  <a href={`/report/edit/${report.report_id}`}>
                    <Image
                      src='icons/edit.svg'
                      alt='Edit'
                      width={24}
                      height={24}
                      cursor='pointer'
                    />
                  </a>
                </Flex>
              )
            })}
          </Flex>
    </Flex>
  )
}
