"use client";
import React, { useState, useEffect } from "react";
import { Flex, Text, Switch, Input, Textarea, Button, Select, Spacer, ChakraProvider, Image, Icon } from "@chakra-ui/react";
import { InputField } from "@/components/InputField";
import type { Room, Report } from "@prisma/client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { ArrowBackIcon } from '@chakra-ui/icons'

const TYPE_LIST = ['Single', 'Double', 'Luxury', 'Suite']
const FLOOR_LIST = ['1', '2', '3', '4', '5']

export default function RoomAddTemp() {
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
                  alt="Room Image"
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
    </Flex>
    </ChakraProvider>
  );
}