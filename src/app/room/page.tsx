"use client"
import React, {useState, useEffect} from 'react'
import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import {
  Flex,
  Image,
  Select,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import type { Room } from '@prisma/client'
import { SearchIcon } from '@chakra-ui/icons'

const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
const FLOOR_LIST = ['1', '2', '3', '4', '5']

export default function RoomPage() {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [availability, setAvailability] = useState<boolean>(false);
  const [undercons, setUndercons] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          name : searchQuery,
          type : type,
          floor : floor,
          flag : availability ? '1' : undercons ? '0' : '',
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
  },[searchQuery, type, floor, availability, undercons]);


  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // console.log(searchQuery);
  }

  const handleType = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    console.log(type)
  }

  const handleFloor = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setFloor(e.target.value)
    console.log(floor)
  } 

  const handleAvailable = (set: string) => {
    if (set == "Available") {
      setAvailability(!availability);
      setUndercons(false);
    }	else if (set == "Under Construction") {
      setUndercons(!undercons);
      setAvailability(false);
    }
  }


  return (
      // Flex satu screen
      <Flex width={"100vw"} flexDir={'column'} bg = {"white"}>
        <Navbar/>
        <Flex
          pt = {40}
          alignItems={'center'}
          justify={'center'}
        >
          <NavPage active='Rooms' isAdmin={true}/>
        </Flex>

        <Flex
          width={'1304px'}
          py={30}
          mx={"auto"}
          overflowX={'auto'}
          flexDir={'row'}
          gap={30}
          alignItems={'center'}
          // justifyContent={'space-between'}
        >
          {/* Searchbar */}
          <Input
            onChange={(e) => handleSearch(e)}
            placeholder={'Room Name'}
            color={'#082E4C'}
            bgColor={'white'}
            padding={12}
            borderRadius={'6px'}
            border={'1px solid #247EC5'}
            fontSize={'14px'}
            fontWeight={'400'}
          />

          {/* Dropdown Type */}
          {/* <Flex
            textColor={'#082E4C'}
            bgColor={'white'}
            padding={12}
            borderRadius={'6px'}
            border={'1px solid #247EC5'}
            fontSize={'14px'}
            fontWeight={'400'}
          > */}
            <Select
              placeholder='Room Type'
              onChange={(e) => handleType(e)}
              size={'lg'}
              bg={'white'}
              textColor={'#082E4C'}
              // padding={12}
            >
              {TYPE_LIST.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </Select>
          {/* </Flex> */}
            
          {/* Dropdown Floor */}
          <Select
            placeholder='Floor'
            onChange={(e) => handleFloor(e)}
            bg={'white'}
            textColor={'#082E4C'}
            padding={12}
          >
            {FLOOR_LIST.map((floor) => (
              <option value={floor}>{floor}</option>
            ))}
          </Select>

          {/* Availability Button */}
          <Flex
            flexDir={'row'}
          >
            {/* Availability */}
            <Flex
              onClick={() => handleAvailable("Available")}
              px={"10px"}
            >
              Available
            </Flex>
            
            {/* Under Cons */}
            <Flex
              onClick={() => handleAvailable("Under Construction")}
              px={"10px"}
            >
              Under Construction
            </Flex>
          </Flex>
        </Flex>

        {/* Bungkus Tabel */}
        <Flex
          paddingX={'40px'}
          paddingBottom={'40px'}
          width={'100%'}
          overflowX={'auto'}
          flexDir={'column'	}
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
              gap={64}
              bgColor={'#E0F4FF'}
              fontSize={'14px'}
              fontWeight={'500'}
              color={'#082E4C'}
              overflowX={'auto'}
            >
              <Flex width='90px'>Room ID</Flex>
              <Flex width='200px'>Room Name</Flex>
              <Flex width='240px'>Room Type</Flex>
              <Flex width='150px'>Floor Level</Flex>
              <Flex width='224px'>Status</Flex>
            </Flex>

            {/* Tabel Body */}
            {roomData && roomData.map((room) => 
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
                bgColor={'white'}
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
                <a href={`/room/edit/${room.room_id.toLowerCase()}`}>
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
