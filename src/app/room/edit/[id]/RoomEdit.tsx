"use client";
import React, { useState, useEffect } from "react";
import { Flex, Text, Switch, Input, Textarea, Button, Select, Spacer, ChakraProvider, Image, Icon } from "@chakra-ui/react";
//import Image from "next/image" ;
import { Navbar } from "@/components/Navbar";
import { InputField } from "@/components/InputField";
import type { Room, Report } from "@prisma/client";
import { AddIcon , ArrowBackIcon } from '@chakra-ui/icons'
import { CldUploadWidget, CldImage } from "next-cloudinary";

const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
const RoomEditTemp = ({params}: {params: {id: string}}) => {
  const [isLoading, setLoading] = useState(true)
  const [roomData, setRoomData] = useState<Room>();
  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [photos, setPhotos] = useState<string>();
  // Fetch Data from DB
  const fetchData = async () => {
    try {
      // Fetch Room Data
      const roomQueryParams = new URLSearchParams({
        id : params.id,
      }).toString();
      const roomResponse = await fetch(`/api/roomManager?${roomQueryParams}`);
      if (!roomResponse.ok) {
        throw new Error('Data fetching failed');
      }
      const room: Room = await roomResponse.json();
      setRoomData(room);

      // Fetch Reports Data
      const reportsQueryParams = new URLSearchParams({
        room_repaired : room.room_name,
      }).toString();
      const reportsResponse = await fetch(`/api/reportManager?${reportsQueryParams}`);
      if (!reportsResponse.ok) {
        throw new Error('Data fetching failed');
      }
      const reports: Report[] = await reportsResponse.json();
      setReportsData(reports);
      setPhotos(room.image? room.image : "btjmca6l0xceizaubtzo");
      setLoading(false);
    } catch (error) {
      alert ((error as Error).message);
    }
  }
  useEffect(() => {
    if(!roomData){
      fetchData();
    }
  })
  // Store current data
  const currRoomData:Room = {
    room_id: roomData?.room_id as string,
    room_name: roomData?.room_name as string,
    type: roomData?.type as string,
    floor: roomData?.floor as number,
    flag: roomData?.flag as boolean,
    price: roomData?.price as number,
    occupied_status: roomData?.occupied_status as boolean,
    condition: roomData?.condition as string,
    image: roomData?.image as string,
    repair_notes: roomData?.repair_notes as string,
  }
  
  const handleFlag = () => {
    if(currRoomData.flag){
      currRoomData.flag = false;
    }else{
      currRoomData.flag = true;
    }
    console.log(currRoomData.flag);
  }
  const handleType = (e : React.ChangeEvent<HTMLSelectElement>) => {
    currRoomData.type = e.target.value;
  }
  const handleDescription = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    currRoomData.condition = e.target.value;
  }
  const handleAddReport = () => {
    // GANTI DENGAN LINK ADD REPORT
    window.location.href = `/report/add-report/${roomData?.room_name.toLowerCase()}`
  }
  const handleSave = async () => {
    currRoomData.image = photos as string;
    try{
      const response = await fetch(`/api/roomManager`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currRoomData)
      })
      if (!response.ok) {
        throw new Error('Data update failed');
      }
      console.log(currRoomData);
      alert("Data Saved");
      window.location.href = `/room`
    }catch(error){
      alert ((error as Error).message);
    }
  };
  const showDate = (date: Date) => {
    const newdate = new Date(date);
    const dateStr = newdate.getDate();
    const monthStr = newdate.getMonth();
    const yearStr = newdate.getFullYear();
    return `${dateStr}/${monthStr}/${yearStr}`
  }
  const uploadParams: Function = (overwrite: boolean) => {
    overwrite = true;
  };

  if (isLoading) {
    return (
    <Text>Loading Data...</Text>
    )
  }

  return (
    <ChakraProvider>
      <Flex
        flexDir={"column"}
        width={"85vw"}
        paddingTop={"40px"}
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
              variant={"unstyled"}
              width={"auto"}
            >
              Room {roomData?.room_name}
            </Text>
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
              defaultChecked={currRoomData.flag}
              onChange={() => handleFlag()}
            />
          </Flex>
        </Flex>

        {/* Content */}
        <Flex
          // background={"#24C32D"}
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
                  src={photos as string}
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
                  setPhotos(obj.public_id);
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
            // background={"pink"}
            flexDir={"column"}
            gap={"28px"}
            alignItems={"end"}
            width={"46.15vw"}
            height={"auto"}
          >
            {/* Attributes */}
            <Flex
              // background={"pink"}
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
                placeholder={`${roomData?.room_name}`}
              />

              {/* Type */}
              <Flex
                textColor={'#082E4C'}
                flexDir={"column"}
                //alignItems={"start"}
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
                    
                    onChange={(e) => handleType(e)}
                    defaultValue={roomData?.type}
                    size={'md'}
                    height={"36px"}
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
              </Flex>

              {/* Floor */}
              <InputField
                label={"Floor"}
                disabled={true}
                placeholder={`Floor ${roomData?.floor}`}
              />
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
                defaultValue={roomData?.condition ? `${roomData?.condition}` : ""}
                onChange={(e) => handleDescription(e)}
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Reports */}
        <Flex
          flexDir={"row"}
          pt={"36px"}
          width={"85vw"}
          height={"auto"}
          marginX={"auto"}
          marginY={"auto"}
          gap={"2vw"}
        >
          {/* Table */}
          <Flex
            width={'65vw'}
            flexDir={'column'}
            mx={'auto'}
            border={'1px solid #247EC5;'}
          >
            {/* Tabel Header */}
            <Flex
              width={'100%'}
              py={"2vh"}
              pl={"3vw"}
              pr={"4vw"}
              gap={"1.3vw"}
              bgColor={'#E0F4FF'}
              fontSize={'14px'}
              fontWeight={'500'}
              color={'#082E4C'}
              overflowX={'auto'}
            >
              <Flex width='15vw'>Report ID</Flex>
              <Flex width='40vw'>Report Title</Flex>
              <Flex width='18vw'>Date</Flex>
              <Flex width='40vw'>Report Status</Flex>
            </Flex>

            {/* Tabel Body */}
            {reportsData.map((report:Report) => 
            (
              <Flex
                key={report.report_id}
                width={'100%'}
                py={"3vh"}
                pl={"3vw"}
                pr={"5vw"}
                gap={"0.9vw"}
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#082E4C'}
                bgColor={'white'}
                borderTop={'1px solid #247EC5;'}
              >
                <Flex width='15vw' paddingTop={"6px"}>{report.report_id}</Flex>
                <Flex width='39vw' paddingTop={"6px"}>{report.report_title}</Flex>
                <Flex width='18vw' paddingTop={"6px"}>{`${showDate(report.date)}`}</Flex>
                {/* <Flex width='30vw'>{report.type}</Flex> */}
                <Flex
                  width='30vw'
                  bgColor={report.type === "Inspect"? '#FFF6E0' : '#DBECF5'}
                  border={report.type === "Inspect"? '2px solid #fe9d2f' : '2px solid #38b9fe'}
                  borderRadius={'6px'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  padding={'4px 8px'}
                >
                  {report.type}</Flex>
                <a href={`/report/edit/${report.report_id.toLowerCase()}`}>
                  <Image
                    src='/icons/edit.svg'
                    alt='Edit'
                    boxSize={"36px"}
                    // cursor='pointer'
                  />
                </a>
              </Flex>
            ))}
          </Flex>

          {/* Add Report Button */}
          <Flex
            width={"20vw"}
            flexDir={"column"}
          >
            <Button
              width={"18vw"}
              height={"42px"}
              
              leftIcon={
                <Icon as={AddIcon} 
                boxSize={"14px"}
                />
              }
              bg={"#39A7FF"}
              color={"#FFFFFF"}
              onClick={handleAddReport}
              fontSize={"16px"}
            >
              Add Report
            </Button>

          </Flex>
        </Flex>
        
        {/* Bottom */}
        <Flex
        flexDir={"row"}
        width={"85vw"}
        height={"auto"}
        marginX={"auto"}
        marginY={"auto"}
        alignItems={"start"}
        pt={"20px"}
        pb={"40px"}
        gap={"2vw"}
        >
          <Spacer />
          {/* Cancel Button */}
          <Button
            alignSelf={"center"}
            width={"12vw"}
            height={"42px"}
            leftIcon={
              <Icon as={ArrowBackIcon}
                boxSize={"18px"}
              />
            }
            bg={"#bbbbbb"}
            color={"#000000"}
            onClick={() => window.location.href = `/room`}
            fontSize={"16px"}
          >
            Cancel
          </Button>
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
            fontSize={"16px"}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default RoomEditTemp;
