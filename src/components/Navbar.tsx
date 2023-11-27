import React from "react";
import Image from "next/image";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChakraProvider,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/auth";
import { signOut } from "next-auth/react";
import Logout from "./Logout"

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <ChakraProvider>
    <Flex
      width='100vw'
      justifyContent='center'
      alignItems={'center'}
      bgColor={'#F1FAFF'}
      height={'50px'}
    >
      <Flex
        maxWidth={'1304px'}
        width='85vw'
        justifyContent='end'
        mx={'auto'}
        alignItems={'center'}
        bg={'transparent'}
      >
        <Menu>
          <MenuButton
            cursor={'pointer'}
          >
            <Image
              src='/icons/Profile.svg'
              alt='Profile Logo'
              width={36}
              height={36}
            />
          </MenuButton>
          <MenuList
            bg={'#F1FAFF'}
          >
            <Logout/>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
    </ChakraProvider>
  );
};
