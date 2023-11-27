import ReportPageTemp from './Report'
import React from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import { Flex } from '@chakra-ui/react'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { redirect } from 'next/navigation';

const ReportPage = async () => {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return redirect('/login')
  } else {
    return (
        // Flex satu screen
        <Flex width={"100vw"} flexDir={'column'} bg={"white"}>
          <Navbar/>
          <Flex
            pt = {40}
            alignItems={'center'}
            justify={'center'}
          >
            <NavPage active='Reports' isAdmin={(session?.user.role === "admin")}/>
          </Flex>
          <ReportPageTemp/>
        </Flex>
    )
  }
}

export default ReportPage;