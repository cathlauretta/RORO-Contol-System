import React, { useState } from "react";
import { Flex, Input, Switch, Text } from "@chakra-ui/react";
import { Providers } from "@/app/providers";

interface Props {
  titleItem: (item: string) => void;
  repTypeItem: (item: string) => void;
}

const Title = ({ titleItem, repTypeItem }: Props) => {
  const [repTypeValue, setType] = useState<string>("Inspect");

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
        placeholder="Judul Laporan"
        fontWeight="700"
        variant="unstyled"
        onChange={(event) => {
          titleItem(event.target.value);
        }}
      />
      <Flex w="96px" justifyContent="end" gap="12px" paddingBottom="1.5">
        <Text fontSize="14px" fontWeight="600">
          {repTypeValue}
        </Text>
        <Providers>
          <Switch
            onChange={() => {
              repTypeValue == "Inspect"
                ? setType("Repair")
                : setType("Inspect");
              repTypeItem(repTypeValue);
            }}
          />
        </Providers>
      </Flex>
    </Flex>
  );
};

export default Title;
