'use client';

import React, { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react';

const NAVBAR_HEIGHT = '50px';

const HeadingProp = ({url, text, state} : {url: string, text: string, state: boolean}) => {
    return (
        <a href={url}>
            {
                state ?
                    <Flex
                    textColor={'#1E6DAC'}
                    fontSize={'28px'}
                    fontWeight={'600'}
                    fontStyle={'normal'}
                    cursor={'pointer'}
                    minH={"55px"}
                    pl={12}
                    pr={12}
                    borderBottom={'5px solid #1E6DAC'}
                    >
                        {text}
                    </Flex>
                :
                    <Flex
                    textColor={'#87C4FF'}
                    fontSize={'28px'}
                    fontWeight={'600'}
                    fontStyle={'normal'}
                    cursor={'pointer'}
                    minH={"55px"}
                    >
                        {text}
                    </Flex>
            }
        </a>
    )
}

export const NavPage = ({active, isAdmin} : {active: string, isAdmin: boolean}) => {
    return (
        <Flex
            maxWidth={'1160px'}
            width='85vw'
            justifyContent=''
            alignItems={'center'}
            bgColor={'white'}
            px={32}
            height={NAVBAR_HEIGHT}
            gap={60}
            borderBottom={'2px solid #E0F4FF'}
        >
            <HeadingProp url='/room' text='Rooms' state={active=='Rooms'}/>
            <HeadingProp url='/report' text='Reports' state={active=='Reports'}/>
            {
                isAdmin &&
                <HeadingProp url='/employee' text='Employee' state={active=='Employee'}/>
            }
        </Flex>
    )
}