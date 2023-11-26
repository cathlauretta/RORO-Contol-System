import React, { useState } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import Image from "next/image";

interface Props {
  label: string;
  PID: (item: string) => void;
}

const UploadImage = ({ label, PID }: Props) => {
  const [valuePID, setPID] = useState<string>("rpl-sti/uspyt6hixlfpccwjhxrc");

  return (
    <Flex w="36vw" flexDir="column" gap="12px">
      <Text fontWeight="600"> {label} </Text>
      <Flex
        w="36vw"
        h="50vh"
        padding="4px 4px 4px 4px"
        borderRadius="8px"
        border="2px solid #39A7FF"
        justifyContent="center"
      >
        <CldImage src={valuePID} width="464" height="84" alt="Image Preview" />
      </Flex>
      <CldUploadWidget
        uploadPreset="jmnde8pz"
        options={{
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 1,
          folder: "rpl-sti"
        }}
        onSuccess={(results) => {
          console.log(results.info);
          let obj = JSON.parse(JSON.stringify(results.info));
          setPID(obj.public_id);
          PID(valuePID);
        }}
      >
        {({ open }) => {
          return (
            <Button
              w="36vw"
              h="45px"
              bg={"#39A7FF"}
              color={"#FFFFFF"}
              fontSize={"14px"}
              leftIcon={
                <Image
                  src="/icons/Paperclip.svg"
                  width={16}
                  height={16}
                  alt="Save"
                />
              }
              onClick={() => open()}
            >
              Add Photos
            </Button>
          );
        }}
      </CldUploadWidget>
    </Flex>
  );
};

export default UploadImage;
