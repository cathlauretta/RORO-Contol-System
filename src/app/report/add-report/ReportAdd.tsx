"use client";
import React, { useState, useEffect } from "react";
import { Flex, Text, Switch, Input, Textarea, Button, ChakraProvider } from "@chakra-ui/react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { InputField } from "@/components/InputField";
import { CldUploadWidget, CldImage } from "next-cloudinary";

export default function ReportAddTemp() {
  const [reportVal, setValue] = useState<string>("Inspect");
  const handleReportType = () => {
    if (reportVal == "Repair") {
      setValue("Inspect");
    } else {
      setValue("Repair");
    }
  };

  const [photos, setPhotos] = useState<string>("btjmca6l0xceizaubtzo");
  const handlePreview = () => {};
  const handleSave = () => {
    // Add Logic
  };

  const uploadParams: Function = (overwrite: boolean) => {
    overwrite = true;
  };

  return (
    <ChakraProvider>
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
            <Text> Report Image </Text>
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
                border={"2px solid #39A7FF"}
              >
                <CldImage
                  src={photos}
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
              >
                {({ open }) => {
                  return (
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
                      onClick={() => open()}
                      fontSize={"14px"}
                    >
                      Add Photos
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
    </ChakraProvider>
  );
}
