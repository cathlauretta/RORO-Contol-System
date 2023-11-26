import React from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import { Flex } from '@chakra-ui/react'
import ReportAddTemp from './ReportAdd'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth';
import { redirect } from 'next/navigation';

const ReportAdd = async() => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect('/login')
  } else {
    return (
        // Flex satu screen
        <Flex width={"100vw"} flexDir={'column'} bg = {"white"}>
          <Navbar/>

          
          <ReportAddTemp/>
        </Flex>
    )
  }
}

export default ReportAdd;