"use client";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Switch,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { InputField } from "@/components/InputField";

export default function ReportAdd() {
  const [reportVal, setValue] = useState<string>("Inspect");
  const handleChange = () => {
    if (reportVal == "Repair") {
      setValue("Inspect");
    } else {
      setValue("Repair");
    }
  };
  // console.log(reportType)

  return (
    <Flex
      height={"140vh"}
      width={"100vw"}
      color={"#082E4C"}
      flexDir={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      // gap={"40px"}
    >
      <Navbar />
      <Flex
        flexDir={"column"}
        // bgColor={"#D3D3D3"}
        width={"85vw"}
        height={"740px"}
        marginX={"auto"}
        marginY={"auto"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* Row Title & Inspect */}
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
            <Input
              fontSize={"36px"}
              fontStyle={"normal"}
              fontWeight={"700"}
              lineHeight={"normal"}
              placeholder={"Judul Laporan"}
              variant={"unstyled"}
              htmlSize={20}
              width={"auto"}
            />
          </Flex>

          {/* Inspect Repair Toggle */}
          <Flex
            display={"flex"}
            paddingTop={"32px"}
            width={"96px"}
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
              {reportVal}
            </Text>

            <Switch
              id="report-type"
              size="md"
              // color="#87C4FF"
              onChange={() => handleChange()}
            />
          </Flex>
        </Flex>

        {/* Content */}
        <Flex
          // background={"#24C32D"}
          width={"85vw"}
          height={"620px"}
          flexShrink={"0"}
          paddingTop={"36px"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={"600"}
          lineHeight={"normal"}
          flexDir={"row"}
          gap={"38px"}
        >
          {/* Report Images */}
          <Flex
            width={"36vw"}
            height={"40vw"}
            flexDir={"column"}
            justifyContent={"start"}
            alignItems={"start"}
            gap={"12px"}
            flexShrink={"0"}
          >
            <Text> Report Images </Text>
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
                <Image
                  src="/image.svg"
                  width={464}
                  height={100}
                  alt="Room Image"
                />
              </Flex>

              {/* Uploaded Image Box */}
              <Flex
                display={"flex"}
                width={"36vw"}
                padding={"8px"}
                alignItems={"start"}
                gap={"8px"}
                borderRadius={"8px"}
                border={"1px solid var(--Light-Grey, #C8C8C8)"}
                overflow={"auto"}
              >
                <Image
                  src="/image2.svg"
                  width={86}
                  height={80}
                  alt="Room Image 1"
                />
                <Image
                  src="/image2.svg"
                  width={86}
                  height={80}
                  alt="Room Image 1"
                />
                <Image
                  src="/image2.svg"
                  width={86}
                  height={80}
                  alt="Room Image 1"
                />
                <Image
                  src="/image2.svg"
                  width={86}
                  height={80}
                  alt="Room Image 1"
                />
                <Image
                  src="/image2.svg"
                  width={86}
                  height={80}
                  alt="Room Image 1"
                />
              </Flex>

              <Flex
                width={"36vw"}
                height={"44px"}
                padding={"12px 20px"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"12px"}
                borderRadius={"6px"}
                background={"var(--Picton-Blue, #39A7FF)"}
              >
                <Image
                  src="/icons/Paperclip.svg"
                  width={16}
                  height={16}
                  alt="Paperclip"
                />
                <Text color={"#FFFFFF"} fontSize={"14px"}>
                  Add Photos
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* Text Field */}
          <Flex
            // background={"pink"}
            flexDir={"column"}
            gap={"28px"}
            alignItems={"end"}
            width={"46.15vw"}
          >
            {/* Attributes */}
            <Flex
              // background={"pink"}
              width={"46.15vw"}
              height={"73px"}
              flexDir={"row"}
              alignItems={"start"}
              justifyContent={"space-between"}
            >
              <InputField 
                label={"Report ID"}
                disabled={true}
                placeholder={"Auto Generate"}
              />
              <InputField 
                label={"Room"}
                disabled={false}
                bgColor={"white"}
                placeholder={"Insert Room"}
              />
              <InputField 
                label={"Employee"}
                disabled={true}
                placeholder={"Employee Name"}
              />
            </Flex>

            {/* Description */}
            <Flex flexDir={"column"} alignItems={"start"} gap={"12px"}>
              <Text> Report Description </Text>
              <Flex
                width={"46.15vw"}
                height={"375px"}
                flexDir={"column"}
                alignItems={"start"}
                borderRadius={"8px"}
                border={"1px solid #247EC5"}
              >
                <Textarea
                  height={"full"}
                  resize={"none"}
                  fontSize={"14px"}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  lineHeight={"normal"}
                  padding={"12px"}
                  placeholder={"Describe the room condition"}
                />
              </Flex>
            </Flex>

            {/* Button */}
            <Flex
              width={"10vw"}
              height={"42px"}
              padding={"12px 20px"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"12px"}
              borderRadius={"6px"}
              background={"var(--Picton-Blue, #39A7FF)"}
            >
              <Image src="/icons/Save.svg" width={16} height={16} alt="Save" />
              <Text color={"#FFFFFF"} fontSize={"14px"}>
                Save
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
