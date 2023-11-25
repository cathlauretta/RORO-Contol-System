"use client";
import React, { useState, useEffect } from "react";
import { Flex, Text, Switch, Input, Textarea, Button } from "@chakra-ui/react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Upload } from "@/components/Upload";
import { InputField } from "@/components/InputField";

export default function ReportAdd() {
  const [reportVal, setValue] = useState<string>("Inspect");
  const handleReportType = () => {
    if (reportVal == "Repair") {
      setValue("Inspect");
    } else {
      setValue("Repair");
    }
  };

  const [photos, setPhotos] = useState<typeof Image>();

  const handleAddPhotos = () => {
    // Add Logic
  };

  const handleSave = () => {
    // Add Logic
  };

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
              onChange={() => handleReportType()}
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
                width={"36vw"}
                padding={"8px"}
                alignItems={"start"}
                gap={"12px"}
                borderRadius={"8px"}
                border={"1px solid var(--Light-Grey, #C8C8C8)"}
                overflow={"auto"}
              >
                {/* photos.map() */}
                <Image
                  src="/image2.svg"
                  width={84}
                  height={84}
                  alt="Room Image 1"
                />
                <Image
                  src="/image2.svg"
                  width={84}
                  height={84}
                  alt="Room Image 2"
                />
                <Image
                  src="/image2.svg"
                  width={84}
                  height={84}
                  alt="Room Image 3"
                />
                <Image
                  src="/image2.svg"
                  width={84}
                  height={84}
                  alt="Room Image 4"
                />
                <Image
                  src="/image2.svg"
                  width={84}
                  height={84}
                  alt="Room Image 5"
                />
              </Flex>

              {/* Add Photos Button */}
              <Button
                width={"36vw"}
                height={"45px"}
                leftIcon={
                  <Image
                    src="/icons/Paperclip.svg"
                    width={16}
                    height={16}
                    alt="Save"
                  />
                }
                bg={"#39A7FF"}
                color={"#FFFFFF"}
                onClick={handleAddPhotos}
                fontSize={"14px"}
              >
                Add Photos
              </Button>

              {/* <Upload /> This is a component but broken (just ignore)*/}
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
              height={"74px"}
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
              <Textarea
                w={"46.15vw"}
                height={"375px"}
                resize={"none"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"normal"}
                padding={"12px"}
                borderRadius={"8px"}
                border={"2px solid #247EC5"}
                placeholder={"Describe the room condition"}
              />
            </Flex>

            {/* Save Button */}
            <Button
              width={"10vw"}
              height={"42px"}
              leftIcon={
                <Image
                  src="/icons/Save.svg"
                  width={18}
                  height={18}
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
    </Flex>
  );
}
