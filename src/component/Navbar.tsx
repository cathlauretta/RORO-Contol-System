"use client";
import React, {useState} from 'react'
import {Flex} from '@chakra-ui/react';

export const Navbar = () => {
    const [color, setColor] = useState('red')

  return (
    <Flex color={color} onClick={() => setColor('blue')}>
        Navbar
    </Flex>
  )
}
