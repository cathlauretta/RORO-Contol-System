// 'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
          padding={12}
          textColor={textColor}
          justifyContent={'left'}
          cursor='pointer'
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
    <Flex
      width='100vw'
      justifyContent='center'
      alignItems={'center'}
      bgColor={'#F1FAFF'}
      pt={10}
      pb={10}
      height={'50px'}
    >
      <Flex
        maxWidth={'1200px'}
        width='90vw'
        justifyContent='end'
        mx={'auto'}
        alignItems={'center'}
      >
        <Menu>
          <MenuButton
            bgColor={'transparent'}
            border={'none'}
            cursor={'pointer'}
          >
            <Image
              src='/icons/Profile.svg'
              alt='Profile Logo'
              width={36}
              height={36}
            />
          </MenuButton>
          <MenuList>
            <Flex
              bgColor='#F1FAFF'
              padding='8px'
              flexDir='column'
              borderRadius={'4px'}
              gap='4px'
              boxShadow={'dark-lg'}
            >
              <NavbarMenuItem text='Change Password' url='/profile' textColor='#082E4C'/>
              <Logout/>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}