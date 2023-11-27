"use client";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Switch,
  Textarea,
  Button,
  Select,
  Spacer,
  Image,
  Icon,
} from "@chakra-ui/react";
import { InputField } from "@/components/InputField";
import type { Room } from "@prisma/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Providers } from "@/app/providers";
import UploadImage from "@/components/UploadImage";

const TYPE_LIST = ["Single", "Double", "Luxury", "Suite"];
const FLOOR_LIST = ["1", "2", "3", "4", "5"];
const DEFAULT_BORDER_RADIUS = "6px";
const DEFAULT_TEXT_COLOR = "#082E4C";

export default function RoomAddTemp() {
  const [image, setImage] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const [type, setType] = useState<string>();
  const [floor, setFloor] = useState<string>();
  const [condition, setCondition] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("Autogenerated");

  const handleImage = (item: string) => {
    setImage(item);
    // console.log(item);
  };

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        floor: floor as string,
        other: "newest in floor",
      }).toString();
      const getresponse = await fetch(`/api/roomManager?${queryParams}`);
      if (!getresponse.ok) {
        throw new Error("Data fetching failed");
      }
      const refRoom: Room = await getresponse.json();
      if (!refRoom) {
        setName(`${floor}01`);
      } else {
        setName(`${parseInt(refRoom.room_name) + 1}`);
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };
  useEffect(() => {
    if (floor) {
      fetchData();
    } else {
      setName("Autogenerated");
    }
  }, [floor]);
  const handleFlag = () => {
    setFlag(!flag);
  };
  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (
        !FLOOR_LIST.includes(floor as string) ||
        !TYPE_LIST.includes(type as string)
      ) {
        throw new Error("Invalid Input");
      }
      const queryParams = new URLSearchParams({
        floor: floor as string,
        other: "newest in floor",
      }).toString();
      const getresponse = await fetch(`/api/roomManager?${queryParams}`);
      if (!getresponse.ok) {
        throw new Error("Data fetching failed");
      }
      const refRoom: Room = await getresponse.json();
      const newName: string = name;
      let newPrice: number;
      switch (type) {
        case "Single":
          newPrice = 300000;
          break;
        case "Double":
          newPrice = 500000;
          break;
        case "Luxury":
          newPrice = 800000;
          break;
        case "Suite":
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currRoomData),
      });
      if (!response.ok) {
        throw new Error("Data update failed");
      }
      alert("Data Saved");
      setIsLoading(false);
      window.location.href = `/room`;
    } catch (error) {
      alert((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <Providers>
      <Flex
        width={"100vw"}
        paddingTop={"40px"}
        height={"auto"}
        color={DEFAULT_TEXT_COLOR}
        flexDir={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        gap={"40px"}>
        <Flex
          flexDir={"column"}
          width={"85vw"}
          height={"auto"}
          marginX={"auto"}
          marginY={"auto"}>
          {/* Row Title & Flag */}
          <Flex
            width={"85vw"}
            justifyContent={"space-between"}
            alignItems={"space-between"}
            borderBottom={"1px #87C4FF solid"}
            paddingBottom={"20px"}>
            {/* Title */}
            <Flex
              alignItems={"center"}
              gap={"12px"}
              flexDir={"row"}
              height={"52px"}
              flexShrink={"0"}>
              <Text
                fontSize={"36px"}
                fontStyle={"normal"}
                fontWeight={"700"}
                lineHeight={"normal"}
                width={"auto"}>
                New Room
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
              flexDir={"row"}>
              <Text
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={"600"}
                lineHeight={"normal"}>
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
            gap={"38px"}>
            {/* Image */}
            <UploadImage label="Room Image" PID={handleImage} />

            {/* Text Field */}
            <Flex
              flexDir={"column"}
              gap={"28px"}
              alignItems={"end"}
              width={"46.15vw"}
              height={"auto"}>
              {/* Attributes */}
              <Flex
                width={"46.15vw"}
                height={"74px"}
                flexDir={"row"}
                alignItems={"start"}
                justifyContent={"space-between"}>
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
                  width={"15vw"}>
                  <Text placeItems={"left"}>Room Type</Text>
                  <Spacer />
                  <Flex
                    textColor={DEFAULT_TEXT_COLOR}
                    bgColor={"white"}
                    borderRadius={DEFAULT_BORDER_RADIUS}
                    border={"1px solid #247EC5"}>
                    <Select
                      onChange={(e) => setType(e.target.value)}
                      size={"md"}
                      height={"36px"}
                      bg={"white"}
                      textColor={DEFAULT_TEXT_COLOR}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      // padding={12}
                      borderColor={"white"}
                      placeholder={"Select Type"}>
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
                  width={"15vw"}>
                  <Text placeItems={"left"}>Floor</Text>
                  <Spacer />
                  <Flex
                    textColor={DEFAULT_TEXT_COLOR}
                    bgColor={"white"}
                    borderRadius={DEFAULT_BORDER_RADIUS}
                    border={"1px solid #247EC5"}>
                    <Select
                      onChange={(e) => setFloor(e.target.value)}
                      size={"md"}
                      height={"36px"}
                      bg={"white"}
                      textColor={DEFAULT_TEXT_COLOR}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      // padding={12}
                      borderColor={"white"}
                      placeholder={"Select Floor"}>
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
                  height={"24vw"}
                  resize={"none"}
                  fontSize={"14px"}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={"normal"}
                  padding={"12px"}
                  borderRadius={DEFAULT_BORDER_RADIUS}
                  border={"1px solid #247EC5"}
                  placeholder={"Describe the room condition"}
                  onChange={(e) => setCondition(e.target.value)}
                />
              </Flex>
            </Flex>
          </Flex>

          {/* I.1.3. Save */}
          <Flex paddingTop="32px" flexDir="row-reverse" gap="12px">
            <Button
              w="10vw"
              h="40px"
              bg="#39A7FF"
              fontSize="16px"
              color="#FFFFFF"
              _hover={{
                bgColor: "#2877b7",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              leftIcon={
                <Image
                  src="/icons/Save.svg"
                  width={18}
                  height={20}
                  alt="Save Button"
                />
              }
              onClick={handleSave}>
              Save
            </Button>
            <Button
              w="10vw"
              h="40px"
              borderColor="#39A7FF"
              fontSize="16px"
              variant="unstyled"
              color="#39A7FF"
              _hover={{
                bgColor: "#F0F0F0",
                transitionDuration: "0.2s",
                transitionTimingFunction: "ease-in-out",
              }}
              onClick={(event) => (window.location.href = `/room`)}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Providers>
  );
}
