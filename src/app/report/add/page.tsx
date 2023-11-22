'use client';
import React, {useState, useEffect} from "react";
import { Flex, Text } from "@chakra-ui/react";

export default function ReportAdd() {
  const [title, setTitle] = useState<string>("Judul Laporan");
  return (
    <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
      <Flex
        flexDir={"column"}
        bgColor={"#D3D3D3"}
        width={"85vw"}
        marginX={"auto"}
        height={"500px"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        {/* Title */}
        <Flex >
            <Text> {title} </Text>
        </Flex>

        {/* Content */}
        <Flex> 

        </Flex>
      </Flex>
    </Flex>
  );
}
