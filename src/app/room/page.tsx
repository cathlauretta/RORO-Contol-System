"use client"
import React, {useState, useEffect} from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import {
  Flex,
  Image,
  Input
} from '@chakra-ui/react'
import type { Room } from '@prisma/client'

export default function RoomPage() {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          name : searchQuery
        }).toString();

        const response = await fetch(`/api/roomManager?${queryParams}`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const rooms: Room[] = await response.json();
        // console.log(rooms);
        setRoomData(rooms);

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
      // Flex satu screen
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

        {/* Bungkus Tabel */}
        <Flex
          paddingX={'40px'}
          width={'100%'}
          overflowX={'auto'}
          flexDir={'column'	}
        >
          <Flex mx={"auto"}>
            <Input onChange={(e) => handleSearch(e)} />
          </Flex>

          {/* Tabel */}
          <Flex
            width={'1160px'}
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
              <Flex width='85px'>Room ID</Flex>
              <Flex width='195px'>Room Name</Flex>
              <Flex width='240px'>Room Type</Flex>
              <Flex width='150px'>Floor Type</Flex>
              <Flex width='224px'>Status</Flex>
            </Flex>

            {/* Tabel Body */}
            {roomData.map((room) => 
            (
              <Flex
                key={room.room_id}
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
                <Flex width='118px'>{room.room_id}</Flex>
                <Flex width='228px'>{room.room_name}</Flex>
                <Flex width='268px'>{room.type}</Flex>
                <Flex width='178px'>{room.floor}</Flex>
                <Flex
                  width='224px'
                  bgColor={room.flag? '#FFEBEB' : '#E4FFF5'}
                  border={room.flag? '2px solid #D53333' : '2px solid #38D79B'}
                  borderRadius={'6px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  padding={12}
                  
                >
                  {room.flag? 'Under Construction' : 'Available'}</Flex>
                <a href={`/room/edit/${room.room_id}`}>
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
