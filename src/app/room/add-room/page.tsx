import React from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import { Flex } from '@chakra-ui/react'
import RoomAddTemp from './RoomAdd'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth';
import { redirect } from 'next/navigation';

const RoomPage = async() => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect('/login')
  } else if (session?.user.role !== "admin") {
    return redirect('/room')
  } else {
    return (
        // Flex satu screen
        <Flex width={"100vw"} flexDir={'column'} bg = {"white"}>
          <Navbar/>
          <RoomAddTemp/>
        </Flex>
    )
  }
}

export default RoomPage;