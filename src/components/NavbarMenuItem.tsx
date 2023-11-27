import React from 'react'
import { Flex, MenuItem, } from '@chakra-ui/react';

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

export default NavbarMenuItem;