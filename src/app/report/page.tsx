import React from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import {
  Flex,
  Image,
} from '@chakra-ui/react'
import { ReportGET } from '@/pages/api/reportManager'

export default async function ReportPage() {
  const ReportData = await ReportGET()

  return (
      // Flex satu screen
      <Flex width={"100vw"} flexDir={'column'}>
        <Navbar/>
        <Flex
          pt = {40}
          pb = {40}
          alignItems={'center'}
          justify={'center'}
        >
          <NavPage active='Reports' isAdmin={true}/>
        </Flex>

        {/* Bungkus Tabel */}
        <Flex
          paddingX={'40px'}
          paddingBottom={'20px'}
          width={'100%'}
          overflowX={'auto'}
        >
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
            {ReportData.map((report) => {
              const year = report.date.getFullYear();
              const month = report.date.getMonth();
              const day = report.date.getDate();
              const date = `${day}/${month}/${year}`;
              
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
      </Flex>
  )
}
