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
  Spacer,
} from '@chakra-ui/react'
import type { Room } from '@prisma/client'
import { SearchIcon } from '@chakra-ui/icons'

const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
const FLOOR_LIST = ['1', '2', '3', '4', '5']
const DEFAULT_BORDER_RADIUS = '6px'

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
          flag : undercons ? 'true' : availability? 'false' : '',
        }).toString();


        const response = await fetch(`/api/roomManager?${queryParams}`);
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }
        const rooms: Room[] = await response.json();
        rooms.sort((a, b) => a.room_id.localeCompare(b.room_id));
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
    console.log(set)
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

        {/* Bungkus Tabel */}
        <Flex
          paddingX={'40px'}
          paddingBottom={'40px'}
          width={'100%'}
          overflowX={'auto'}
          flexDir={'column'}
        >
          {/* Search and Filtering */}
          <Flex
            py={30}
            width={'1304px'}
            mx={'auto'}
            flexDir={'row'}
            gap={30}
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
              autoFocus={false}
            />

            {/* Dropdown Type */}
            <Flex
              textColor={'#082E4C'}
              bgColor={'white'}
              padding={10}
              borderRadius={'6px'}
              border={'1px solid #247EC5'}
            >
              <Select
                placeholder='Room Type'
                onChange={(e) => handleType(e)}
                size={'lg'}
                bg={'white'}
                textColor={'#082E4C'}
                fontSize={'14px'}
                fontWeight={'400'}
                // padding={12}
                borderColor={'white'}
              >
                {TYPE_LIST.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Select>
            </Flex>
              
            {/* Dropdown Floor */}
            <Flex
              textColor={'#082E4C'}
              bgColor={'white'}
              padding={10}
              borderRadius={'6px'}
              border={'1px solid #247EC5'}
            >
              <Select
                placeholder='Floor'
                onChange={(e) => handleFloor(e)}
                bg={'white'}
                textColor={'#082E4C'}
                fontSize={'14px'}
                fontWeight={'400'}
                borderColor={'white'}
              >
                {FLOOR_LIST.map((floor) => (
                  <option value={floor}>{floor}</option>
                ))}
              </Select>
            </Flex>

            {/* Availability Button */}
            <Flex
              flexDir={'row'}
              border={'1px solid #247EC5'}
              borderRadius={'6px'}
              alignItems={'center'}
            >
              {/* Availability */}
              <Flex
                onClick={() => handleAvailable("Available")}
                px={16}
                py={12}
                color={'#082E4C'}
                fontSize={'14px'}
                fontWeight={'400'}
                cursor={'pointer'}
                borderTopLeftRadius={'6px'}
                borderBottomLeftRadius={'6px'}
                bgColor={availability? '#E4FFF5' : 'transparent'	}
                _hover={
                  {
                    bgColor:'#E4FFF5',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'ease-in-out',
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                  }
                }
              >
                Available
              </Flex>
              
              {/* Under Cons */}
              <Flex
                onClick={() => handleAvailable("Under Construction")}
                px={16}
                py={12}
                color={'#082E4C'}
                fontSize={'14px'}
                fontWeight={'400'}
                cursor={'pointer'}
                borderLeft={'1px solid #247EC5'}
                borderTopRightRadius={'6px'}
                borderBottomRightRadius={'6px'}
                bgColor={undercons? '#FFEBEB' : 'transparent'	}
                _hover={
                  {
                    bgColor:'#FFEBEB',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'ease-in-out',
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                  }
                }
              >
                Under Construction
              </Flex>
            </Flex>
            <Spacer/>
            <Flex
              flexDir={'row'}
              onClick={() => window.location.href = '/room/add-room'}
              px={36}
              py={12}
              textColor={'#FFFFFF'}
              // border={'1px solid #247EC5'}
              borderRadius={'6px'}
              bgColor={'#39A7FF'}
              fontSize={'14px'}
              fontWeight={'400'}
              cursor={'pointer'}
              _hover={
                {
                  bgColor:'#2877b7',
                  transitionDuration: '0.2s',
                  transitionTimingFunction: 'ease-in-out',
                }
              }
            >
              Add Room
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
