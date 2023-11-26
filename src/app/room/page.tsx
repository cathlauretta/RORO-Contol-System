import React from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import { Flex } from '@chakra-ui/react'
import RoomPageTemp from './Room'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { redirect } from 'next/navigation';

const RoomPage = async() => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect('/login')
  } else {
    return (
        // Flex satu screen
        <Flex width={"100vw"} flexDir={'column'} bg = {"white"}>
          <Navbar/>

          <Flex
            pt = {40}
            alignItems={'center'}
            justify={'center'}
          >
            <NavPage active='Rooms' isAdmin={(session?.user.role === "admin")}/>
          </Flex>
          <RoomPageTemp/>
        </Flex>
    )
  }
}

export default RoomPage;