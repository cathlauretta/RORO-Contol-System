import React from "react";
import { Flex, Input, Text } from "@chakra-ui/react";

interface IFRequiredProps {
  label: string;
  disabled: boolean;
}

interface IFOptionalProps {
  placeholder: string;
  bgColor: string;
}

interface InputFieldProps extends IFRequiredProps, IFOptionalProps {}

const defaultProps: IFOptionalProps = {
  placeholder: "Enter here..",
  bgColor: "#DFDFDF",
};

export const InputField = (props: InputFieldProps) => {
  const { label, disabled, placeholder, bgColor } = props;
  return (
    <Flex flexDir={"column"} align-items={"start"} gap={"12px"}>
      <Text> {label} </Text>
      <Flex
        width={"13vw"}
        flexDir={"column"}
        alignItems={"start"}
        background={bgColor}
        borderRadius={"8px"}
      >
        <Input
          fontSize={"14px"}
          fontStyle={"normal"}
          fontWeight={"400"}
          lineHeight={"normal"}
          padding={"12px"}
          disabled={disabled}
          placeholder={placeholder}
          border={"1px solid #247EC5"}
        />
      </Flex>
    </Flex>
  );
};

InputField.defaultProps = defaultProps;

