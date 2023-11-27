import React, { useState } from "react";
import { Flex, Input, Switch, Text } from "@chakra-ui/react";
import { Providers } from "@/app/providers";

interface Props {
  titleItem?: (item: string) => void;
  repTypeItem: (item: string) => void;
  placeholder?: string;
  disabled?: boolean;
  defTogVal?: string;
  altTogVal?: string;
}

const Title = ({ titleItem, repTypeItem, placeholder = "Judul Laporan", disabled = false, defTogVal = "Inspect", altTogVal="Repair" }: Props) => {
  const [repTypeValue, setType] = useState<string>(defTogVal);

  return (
    <Flex
      w="85vw"
      justifyContent="space-between"
      alignItems="end"
      borderBottom="1px solid #87C4FF"
      paddingBottom="15px"
      gap="40px"
    >
      <Input
        fontSize="36px"
        placeholder={placeholder}
        fontWeight="700"
        variant="unstyled"
        disabled={disabled}
        onChange={(event) => {
          if (titleItem) {
            titleItem(event.target.value);
          }
        }}
      />
      <Flex w="96px" justifyContent="end" gap="12px" paddingBottom="1.5">
        <Text fontSize="14px" fontWeight="600">
          {repTypeValue}
        </Text>
        <Providers>
          <Switch
            onChange={() => {
              repTypeValue == defTogVal
                ? setType(altTogVal)
                : setType(defTogVal);
              repTypeItem(repTypeValue);
            }}
          />
        </Providers>
      </Flex>
    </Flex>
  );
};

export default Title;
