import React from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import { Flex } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex width={"100vw"} flexDir={'column'}>
      <Navbar/>
      <Flex
        pt = {40}
        pb = {40}
        alignItems={'center'}
        justify={'center'}
      >
        <NavPage active='Rooms' isAdmin={true}/>
      </Flex>
    </Flex>
  )
}
