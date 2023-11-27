import React from 'react'
import Image from 'next/image';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChakraProvider,
} from '@chakra-ui/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/auth';
import { signOut } from "next-auth/react";
import Logout from "./Logout"

const NavbarMenuItem = ({url, text, textColor, onClick} : {url : string, text: string, textColor: string, onClick?: () => void}) => {
  return (
    <MenuItem
      border='none'
      bgColor={'transparent'}
      borderRadius={'4px'}
      transitionTimingFunction={'ease-in-out'}
      transitionDuration={'0.2s'}
      _hover={
        {
          bgColor:'#E0F4FF',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-in-out'
        }
      }
    > 
      <a href={url} onClick={onClick}>
        <Flex
          width={'144px'}
          textColor={textColor}
          justifyContent={'left'}
          cursor='pointer'
          fontSize={'14px'}
        >
          {text}
        </Flex>
      </a>
    </MenuItem>
  )
}

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
            <NavbarMenuItem text='Change Password' url='/profile' textColor='#082E4C'/>
            <Logout/>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
    </ChakraProvider>
  )
}