import { Flex, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import LabelInput from "./LabelInput";

const InputField = () => {
  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");
  const [third, setThird] = useState<string>("");

  const handleFirst = (item: string) => {
    setFirst(item);
  };
  const handleSecond = (item: string) => {
    setSecond(item);
  };
  const handleThird = (item: string) => {
    setThird(item);
  };

  return (
    <Flex w="full" flexDir="column" gap="28px">
      <Flex w="full" justifyContent="space-between" gap="20px">
        <LabelInput
          label="Report ID"
          disabled={true}
          bg="#DFDFDF"
          value=""
          checkValue={handleFirst}
        />
        <LabelInput
          label="Room"
          disabled={false}
          bg="#FFFFFF"
          value=""
          checkValue={handleSecond}
        />
        <LabelInput
          label="Employee"
          disabled={true}
          bg="#DFDFDF"
          value=""
          checkValue={handleThird}
        />
      </Flex>
      <Flex flexDir="column" gap="12px">
        <Text fontWeight="600"> Report Description </Text>
        <Textarea
          w="full"
          h="60vh"
          resize="none"
          fontSize="14px"
          fontWeight="400"
          padding="12px"
          border="2px solid #247EC5"
          borderRadius="8px"
          placeholder="Describe the condition of the room"
        />
      </Flex>
    </Flex>
  );
};

export default InputField;
