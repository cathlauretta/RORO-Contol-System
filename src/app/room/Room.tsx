"use client"
import React, {useState, useEffect} from 'react'
import {
  Flex,
  Image,
  Select,
  Input,
  Spacer, Text, Switch, Textarea, Button, ChakraProvider, Icon
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
//import Image from "next/image" ;
import { Navbar } from "@/components/Navbar";
import { InputField } from "@/components/InputField";
import type { Room, Report } from "@prisma/client";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
const FLOOR_LIST = ['1', '2', '3', '4', '5']
const DEFAULT_BORDER_RADIUS = '6px'

export default function RoomPageTemp() {
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
    <Flex
        //paddingX={'40px'}
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
  )
}

export function RoomAddTemp() {
  const [image, setImage] = useState<string>("xeoowxcwq261nrpxgm4g");
  const [flag, setFlag] = useState<boolean>(false);
  const [type, setType] = useState<string>();
  const [floor, setFloor] = useState<string>();
  const [condition, setCondition] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("Autogenerated");
  

  const fetchData = async () => {
    try{
      const queryParams = new URLSearchParams({
        floor: floor as string,
        other: "newest in floor"
      }).toString();
      const getresponse = await fetch(`/api/roomManager?${queryParams}`);
      if (!getresponse.ok) {
        throw new Error('Data fetching failed');
      }
      const refRoom:Room = await getresponse.json();
      if(!refRoom){
        setName(`${floor}01`);
      } else {
        setName(`${parseInt(refRoom.room_name) + 1}`);
      }
    } catch(error){
      alert ((error as Error).message);
    }
  }
  useEffect(() => {
    if(floor){
      fetchData();
    } else {
      setName("Autogenerated");
    }
  }, [floor]);
  const handleFlag = () => {
    setFlag(!flag);
  }
  const handleSave = async () => {
      try{
        setIsLoading(true);
        if(!FLOOR_LIST.includes(floor as string) || !TYPE_LIST.includes(type as string)){
            throw new Error('Invalid Input');
        }
        const queryParams = new URLSearchParams({
            floor: floor as string,
            other: "newest in floor"
        }).toString();
        const getresponse = await fetch(`/api/roomManager?${queryParams}`);
        if (!getresponse.ok) {
          throw new Error('Data fetching failed');
        }
        const refRoom:Room = await getresponse.json();
        const newName:string = name;
        let newPrice:number;
        switch(type){
          case 'Single':
            newPrice = 300000;
            break;
          case 'Double':
            newPrice = 500000;
            break;
          case 'Luxury':
            newPrice = 800000;
            break;
          case 'Suite':
            newPrice = 1000000;
            break;
          default:
            newPrice = 0;
        }
        const currRoomData: Room = {
          room_id: `ROOM${newName}`,
          room_name: newName,
          type: type as string,
          floor: parseInt(floor as string),
          condition: condition as string,
          image: image as string,
          flag: flag as boolean,
          price: newPrice,
          occupied_status: false,
          repair_notes: null,
        };
      const response = await fetch(`/api/roomManager`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currRoomData)
      })
      if (!response.ok) {
        throw new Error('Data update failed');
      }
      alert("Data Saved");
      setIsLoading(false);
      window.location.href = `/room`
    }catch(error){
      alert ((error as Error).message);
      setIsLoading(false);
    }
  };
  const uploadParams: Function = (overwrite: boolean) => {
    overwrite = true;
  };

  return (
    <ChakraProvider>
    <Flex
      width={"100vw"}
      height={"auto"}
      color={"#082E4C"}
      flexDir={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={"40px"}
    >
      <Flex
        flexDir={"column"}
        width={"85vw"}
        height={"auto"}
        marginX={"auto"}
        marginY={"auto"}
      >
        {/* Row Title & Flag */}
        <Flex
          width={"85vw"}
          justifyContent={"space-between"}
          alignItems={"space-between"}
          borderBottom={"2px #87C4FF solid"}
          paddingBottom={"20px"}
        >
          {/* Title */}
          <Flex
            alignItems={"center"}
            gap={"12px"}
            flexDir={"row"}
            height={"52px"}
            flexShrink={"0"}
          >
            <Text
              fontSize={"36px"}
              fontStyle={"normal"}
              fontWeight={"700"}
              lineHeight={"normal"}
              width={"auto"}
            >New Room</Text>
          </Flex>

          {/* Flag Toggle */}
          <Flex
            display={"flex"}
            paddingTop={"32px"}
            width={"192px"}
            height={"24px"}
            justifyContent={"end"}
            alignItems={"start"}
            gap={"12px"}
            flexDir={"row"}
          >
            <Text
              fontSize={"14px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"normal"}
            >
              Set Flag
            </Text>

            <Switch
              id="report-type"
              size="md"
              // color="#87C4FF"
              defaultChecked={false}
              onChange={() => handleFlag()}
            />
          </Flex>
        </Flex>

        {/* Content */}
        <Flex
          width={"85vw"}
          height={"auto"}
          flexShrink={"0"}
          paddingTop={"36px"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={"600"}
          lineHeight={"normal"}
          flexDir={"row"}
          gap={"38px"}
        >
          {/* Image */}
          <Flex
            width={"36vw"}
            height={"auto"}
            flexDir={"column"}
            justifyContent={"start"}
            alignItems={"start"}
            gap={"12px"}
            flexShrink={"0"}
          >
            <Text> Room Image </Text>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={"12px"}
            >
              {/* Image Preview */}
              <Flex
                width={"36vw"}
                padding={"8px 0px"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"12px"}
                borderRadius={"8px"}
                border={"1px solid var(--Light-Grey, #C8C8C8)"}
              >
                <CldImage
                  src={image as string}
                  width="464"
                  height="84"
                  alt="Report Image"
                />
              </Flex>

              {/* Add Photos Button */}
              <CldUploadWidget
                uploadPreset="jmnde8pz"
                options={{
                  sources: ["local", "url", "unsplash"],
                  multiple: false,
                  maxFiles: 1,
                  prepareUploadParams: uploadParams(true),
                }}
                onSuccess={(results) => {
                  console.log(results.info);
                  let obj = JSON.parse(JSON.stringify(results.info));
                  setImage(obj.public_id);
                }}
              >{({ open }) => {
                return (
                  <Button
                    width={"16vw"}
                    height={"45px"}
                    leftIcon={
                      <Image
                        src="/icons/Paperclip.svg"
                        boxSize={"24px"}
                        alt="Save"
                      />
                    }
                    bg={"#39A7FF"}
                    color={"#FFFFFF"}
                    onClick={() => open()}
                    fontSize={"14px"}
                  >
                    Upload New Photo
                  </Button>
                );
              }}
            </CldUploadWidget>
            </Flex>
          </Flex>

          {/* Text Field */}
          <Flex
            flexDir={"column"}
            gap={"28px"}
            alignItems={"end"}
            width={"46.15vw"}
            height={"auto"}
          >
            {/* Attributes */}
            <Flex
              width={"46.15vw"}
              height={"74px"}
              flexDir={"row"}
              alignItems={"start"}
              justifyContent={"space-between"}
            >
              {/* Room Name */}
              <InputField
                label={"Room Name"}
                disabled={true}
                placeholder={name}
              />

              {/* Type */}
              <Flex
                textColor={'#082E4C'}
                flexDir={"column"}
                height={"72px"}
                width={"15vw"}
              >
                <Text
                placeItems={'left'}
                >Room Type</Text>
                <Spacer />
                <Flex
                  textColor={'#082E4C'}
                  bgColor={'white'}
                  borderRadius={"8px"}
                  border={"2px solid #247EC5"}
                >
                  <Select
                    
                    onChange={(e) => setType(e.target.value)}
                    size={'md'}
                    height={"36px"}
                    bg={'white'}
                    textColor={'#082E4C'}
                    fontSize={'14px'}
                    fontWeight={'400'}
                    // padding={12}
                    borderColor={'white'}
                    placeholder={'Select Type'}
                  >
                    {TYPE_LIST.map((type) => (
                      <option value={type}>{type}</option>
                    ))}
                  </Select>
                </Flex>
              </Flex>
                  
              {/* Floor */}
              <Flex
                textColor={'#082E4C'}
                flexDir={"column"}
                height={"72px"}
                width={"15vw"}
              >
                <Text
                placeItems={'left'}
                >Floor</Text>
                <Spacer />
                <Flex
                  textColor={'#082E4C'}
                  bgColor={'white'}
                  borderRadius={"8px"}
                  border={"2px solid #247EC5"}
                >
                  <Select
                    
                    onChange={(e) => setFloor(e.target.value)}
                    size={'md'}
                    height={"36px"}
                    bg={'white'}
                    textColor={'#082E4C'}
                    fontSize={'14px'}
                    fontWeight={'400'}
                    // padding={12}
                    borderColor={'white'}
                    placeholder={'Select Floor'}
                  >
                    {FLOOR_LIST.map((floor) => (
                      <option value={floor}>{floor}</option>
                    ))}
                  </Select>
                </Flex>
              </Flex>
            </Flex>

            {/* Description */}
            <Flex flexDir={"column"} alignItems={"start"} gap={"12px"}>
              <Text> Room Description </Text>
              <Textarea
                w={"46.15vw"}
                height={"19vw"}
                resize={"none"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"normal"}
                padding={"12px"}
                borderRadius={"8px"}
                border={"2px solid #247EC5"}
                placeholder={"Describe the room condition"}
                onChange={(e) => setCondition(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Bottom Content */}
        <Flex
        flexDir={"column"}
        width={"85vw"}
        height={"auto"}
        marginX={"auto"}
        marginY={"auto"}
        alignItems={"end"}
        pt={"20px"}
        pb={"40px"}
        >
          {/* Save Button */}
            <Button
              width={"12vw"}
              height={"42px"}
              leftIcon={
                <Image
                  src="/icons/Save.svg"
                  boxSize={"24px"}
                  alt="Save"
                />
              }
              bg={"#39A7FF"}
              color={"#FFFFFF"}
              onClick={handleSave}
              isLoading={isLoading}
              fontSize={"16px"}
              key={"save"}
            >
              Save
            </Button>
        </Flex>
      </Flex>
    </Flex>
    </ChakraProvider>
  );
}