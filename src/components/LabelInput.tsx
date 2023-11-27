import { Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  label: string;
  disabled: boolean;
  bg: string;
  value?: string;
  checkValue: (item: string) => void;
}

const LabelInput = ({ label, disabled, bg, value, checkValue }: Props) => {
    const [inputValue, setValue] = useState<string>("")
  
    return (
    <Flex w="auto" flexDir="column" gap="12px">
      <Text fontWeight="600"> {label} </Text>
      <Input
        fontSize="14px"
        fontWeight="400"
        padding="12px"
        disabled={disabled}
        bg={bg}
        border="2px solid #247EC5"
        borderRadius="8px"
        value={value}
        onChange={(event) => {
            setValue(event.target.value);
            checkValue(inputValue);
          }}
      />
    </Flex>
  );
};

export default LabelInput;
