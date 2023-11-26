"use client";
import { Providers } from "@/app/providers";
import { Flex, Button } from "@chakra-ui/react";
import Title from "@/components/Title";
import UploadImage from "@/components/UploadImage";
import InputField from "@/components/InputField";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import Image from "next/image";


const ReportAdd = () => {
  const [title, setTitle] = useState<string>("");
  const handleTitle = (item: string) => {
    setTitle(item);
    console.log(item);
  };

  const [repType, setRepType] = useState<string>("");
  const handleType = (item: string) => {
    setRepType(item);
    console.log(item);
  };

  const [publicID, setPublicID] = useState<string>("btjmca610xceizaubtzo");
  const handlePID = (item: string) => {
    setPublicID(item);
    console.log(item);
  };

  const handleSave = () => {
    console.log();
  };

  return (
    /* I. Whole Page */
    <Flex flexDir="column" h="140vh">
      <Navbar />
      <Providers>
        {/* I.1. Content Area */}
        <Flex flexDir="column" w="85vw" h="740px" m="auto" alignItems="end">
          {/* I.1.1. Title & Inspect */}
          <Title titleItem={handleTitle} repTypeItem={handleType} />
          {/* I.1.2. Image & Text Area */}
          <Flex w="85vw" h="600px" paddingTop="40px" gap="40px">
            {/* I.1.2.1. Image */}
            <UploadImage label="Report Image" PID={handlePID} />
            {/* I.1.2.2. Text */}
            <InputField />
          </Flex>
          {/* I.1.3. Save */}
          <Button
            w="10vw"
            h="40px"
            bg="#39A7FF"
            fontSize="16px"
            color="#FFFFFF"
            leftIcon={
              <Image
                src="/icons/Save.svg"
                width={18}
                height={20}
                alt="Save Button"
              />
            }
            // onClick={(event) => handleSave}
          >
            Save
          </Button>
        </Flex>
      </Providers>
    </Flex>
  );
};

export default ReportAdd;
