"use client";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  ChakraProvider,
  extendTheme,
  Switch,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";

export default function ReportAdd() {
  const [title, setTitle] = useState<string>("Judul Laporan");
  const [reportType, setReport] = useState<string>("Inspect");
  const [reportVal, setValue] = useState<boolean>(false);
  // console.log(reportType)

  return (
    <Flex
      height={"100vh"}
      width={"100vw"}
      color={"#082E4C"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        flexDir={"column"}
        bgColor={"#D3D3D3"}
        width={"85vw"}
        marginX={"auto"}
        height={"500px"}
        justifyContent={"start"}
        alignItems={"start"}
      >
        {/* Row Title & Inspect */}
        <Flex
          justify-content={"center"}
          align-items={"end"}
          gap={"55.5vw"}
          borderBottom={"3px #87C4FF solid"}
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
            >
              {title}
            </Text>
            <Image
              src="/icons/Pen.svg"
              width={36}
              height={36}
              alt="Edit Button"
            />
          </Flex>

          {/* Inspect */}
          <Flex
            display={"flex"}
            paddingTop={"32px"}
            height={"24px"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={"12px"}
            flexDir={"row"}
          >
            <Text
              fontSize={"14px"}
              fontStyle={"normal"}
              fontWeight={"600"}
              lineHeight={"normal"}
            >
              {" "}
              Inspect{" "}
            </Text>

            <Switch
              id="report-type"
              size="md"
              // color="#87C4FF"
              onChange={() => setValue(!reportVal)}
            />
          </Flex>
        </Flex>

        {/* Content */}
        <Flex
          width={"1304px"}
          height={"619px"}
          flexShrink={"0"}
          paddingTop={"36px"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={"600"}
          lineHeight={"normal"}
          flexDir={"row"}
        >
          {/* Report Images */}
          <Flex>
            <Text> Report Images </Text>
          </Flex>

          {/* Text Field */}
          <Flex>
            <Text> Something </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
