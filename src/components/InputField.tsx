import React, { useState, ChangeEvent } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";

interface IFProps {
  label: string;
  disabled: boolean;
  placeholder?: string;
  bgColor?: string;
}

export const InputField = (props: IFProps) => {
  const {
    label,
    disabled,
    placeholder = "Enter here..",
    bgColor = "#DFDFDF",
  } = props;
  const [value, setValue] = useState<string>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  return (
    <Flex flexDir={"column"} align-items={"start"} gap={"12px"}>
      <Text> {label} </Text>
      <Input
        width={"13vw"}
        fontSize={"14px"}
        fontStyle={"normal"}
        fontWeight={"400"}
        lineHeight={"normal"} 
        padding={"12px"}
        disabled={disabled}
        placeholder={placeholder}
        background={bgColor}
        border={"2px solid #247EC5"}
        borderRadius={"8px"}
        onChange={handleChange}
      />
    </Flex>
  );
};
