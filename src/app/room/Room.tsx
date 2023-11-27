"use client"
import React, {useState, useEffect} from 'react'
import {
  Flex, Image, Select, Input,
  Spacer, Text, Switch, Textarea, Button, ChakraProvider,
} from '@chakra-ui/react'
import { AddButton } from '@/components/AddButton';
import { InputField } from "@/components/InputField";
import type { Room } from "@prisma/client";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
const FLOOR_LIST = ['1', '2', '3', '4', '5']
const DEFAULT_BORDER_RADIUS = '6px'
const DEFAULT_TEXT_COLOR = '#082E4C'

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
  }

  const handleFloor = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setFloor(e.target.value)
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
    <ChakraProvider>
    <Flex
      padding={'40px'}
      width={'100%'}
      overflowX={'auto'}
      flexDir={'column'}
      gap={'40px'}
    >
      {/* Search and Filtering */}
      <Flex
        width={'1304px'}
        mx={'auto'}
        flexDir={'row'}
        gap={'30px'}
        alignItems={'center'}
      >
        {/* Searchbar */}
        <Input
          onChange={(e) => handleSearch(e)}
          placeholder={'Room Name'}
          color={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
          width={'210px'}
          fontSize={'14px'}
          fontWeight={'400'}
          autoFocus={false}
        />

        {/* Dropdown Type */}
        {/* <Flex
          textColor={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          padding={10}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
        > */}
          <Select
            placeholder='Room Type'
            onChange={(e) => handleType(e)}
            size={'md'}
            bg={'white'}
            width={'200px'}
            textColor={DEFAULT_TEXT_COLOR}
            fontSize={'14px'}
            fontWeight={'400'}
            borderColor={'white'}
            borderRadius={DEFAULT_BORDER_RADIUS}
            border={'1px solid #247EC5'}
          >
            {TYPE_LIST.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </Select>
        {/* </Flex> */}
          
        {/* Dropdown Floor */}
        {/* <Flex
          textColor={DEFAULT_TEXT_COLOR}
          bgColor={'white'}
          padding={10}
          borderRadius={DEFAULT_BORDER_RADIUS}
          border={'1px solid #247EC5'}
        > */}
          <Select
            placeholder='Floor'
            onChange={(e) => handleFloor(e)}
            bg={'white'}
            width={'100px'}
            textColor={DEFAULT_TEXT_COLOR}
            fontSize={'14px'}
            fontWeight={'400'}
            borderColor={'white'}
            borderRadius={DEFAULT_BORDER_RADIUS}
            border={'1px solid #247EC5'}
          >
            {FLOOR_LIST.map((floor) => (
                <option value={floor}>{floor}</option>
            ))}
          </Select>
        {/* </Flex> */}

        {/* Availability Button */}
        <Flex
          flexDir={'row'}
          border={'1px solid #247EC5'}
          borderRadius={DEFAULT_BORDER_RADIUS}
        >
          {/* Availability */}
          <Flex
            onClick={() => handleAvailable("Available")}
            px={'16px'}
            height={'40px'}
            color={DEFAULT_TEXT_COLOR}
            fontSize={'14px'}
            fontWeight={'400'}
            cursor={'pointer'}
            alignItems={'center'}
            justifyContent={'center'}
            borderTopLeftRadius={DEFAULT_BORDER_RADIUS}
            borderBottomLeftRadius={DEFAULT_BORDER_RADIUS}
            bgColor={availability? '#E4FFF5' : 'transparent'	}
            _hover={
              {
              bgColor:'#E4FFF5',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'ease-in-out',
              borderTopLeftRadius: DEFAULT_BORDER_RADIUS,
              borderBottomLeftRadius: DEFAULT_BORDER_RADIUS,
              }
            }
          >
            Available
          </Flex>
          
          {/* Under Cons */}
          <Flex
            onClick={() => handleAvailable("Under Construction")}
            px={'16px'}
            height={'40px'}
            color={DEFAULT_TEXT_COLOR}
            fontSize={'14px'}
            fontWeight={'400'}
            cursor={'pointer'}
            alignItems={'center'}
            justifyContent={'center'}
            borderLeft={'1px solid #247EC5'}
            borderTopRightRadius={DEFAULT_BORDER_RADIUS}
            borderBottomRightRadius={DEFAULT_BORDER_RADIUS}
            bgColor={undercons? '#FFEBEB' : 'transparent'	}
            _hover={
              {
              bgColor:'#FFEBEB',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'ease-in-out',
              borderTopRightRadius: DEFAULT_BORDER_RADIUS,
              borderBottomRightRadius: DEFAULT_BORDER_RADIUS,
              }
            }
          >
            Under Construction
          </Flex>
        </Flex>
        
        <Spacer/>
        
        <AddButton url={'/room/add-room'} text={'Add New Room'}/>
      </Flex>

      {/* Tabel */}
      <Flex
        width={'1304px'}
        flexDir={'column'}
        alignItems={'left'}
        justifyContent={'center'}
        mx={'auto'}
        border={'1px solid #247EC5'}
      >
      {/* Tabel Header */}
        <Flex
          width={'100%'}
          py={'12px'}
          pl={'48px'}
          pr={'96px'}
          gap={'64px'}
          bgColor={'#E0F4FF'}
          fontSize={'14px'}
          fontWeight={'500'}
          color={DEFAULT_TEXT_COLOR}
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
            py={'12px'}
            pl={'48px'}
            pr={'36px'}
            gap={'36px'}
            fontSize={'14px'}
            fontWeight={'400'}
            color={DEFAULT_TEXT_COLOR}
            bgColor={'white'}
            borderTop={'1px solid #247EC5'}
          >
            <Flex width='118px'>{room.room_id}</Flex>
            <Flex width='228px'>{room.room_name}</Flex>
            <Flex width='268px'>{room.type}</Flex>
            <Flex width='178px'>{room.floor}</Flex>
            <Flex
                width='224px'
                bgColor={room.flag? '#FFEBEB' : '#E4FFF5'}
                border={room.flag? '2px solid #D53333' : '2px solid #38D79B'}
                borderRadius={DEFAULT_BORDER_RADIUS}
                justifyContent={'center'}
                alignItems={'center'}
                padding={'8px'}     
            >
              {room.flag? 'Under Construction' : 'Available'}
            </Flex>
            <a href={`/room/edit/${room.room_id.toLowerCase()}`}>
              <Image
                src='icons/edit.svg'
                alt='Edit'
                width={'24px'}
                height={'24px'}
                cursor='pointer'
              />
            </a>
          </Flex>
        ))}
      </Flex>
    </Flex>
    </ChakraProvider>
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
                textColor={DEFAULT_TEXT_COLOR}
                flexDir={"column"}
                height={"72px"}
                width={"15vw"}
              >
                <Text
                placeItems={'left'}
                >Room Type</Text>
                <Spacer />
                <Flex
                  textColor={DEFAULT_TEXT_COLOR}
                  bgColor={'white'}
                  borderRadius={"8px"}
                  border={"2px solid #247EC5"}
                >
                  <Select
                    
                    onChange={(e) => setType(e.target.value)}
                    size={'md'}
                    height={"36px"}
                    bg={'white'}
                    textColor={DEFAULT_TEXT_COLOR}
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
                textColor={DEFAULT_TEXT_COLOR}
                flexDir={"column"}
                height={"72px"}
                width={"15vw"}
              >
                <Text
                placeItems={'left'}
                >Floor</Text>
                <Spacer />
                <Flex
                  textColor={DEFAULT_TEXT_COLOR}
                  bgColor={'white'}
                  borderRadius={"8px"}
                  border={"2px solid #247EC5"}
                >
                  <Select
                    
                    onChange={(e) => setFloor(e.target.value)}
                    size={'md'}
                    height={"36px"}
                    bg={'white'}
                    textColor={DEFAULT_TEXT_COLOR}
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