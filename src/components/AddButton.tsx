import React from 'react'
import { Button, Image } from '@chakra-ui/react'

export const AddButton = ({url, text} : {url: string, text: string}) => {
  return (
    <Button
        onClick={() => window.location.href = url}
        textColor={'white'}
        borderRadius={'6px'}
        bgColor={'#39A7FF'}
        fontSize={'14px'}
        fontWeight={'600'}
        cursor={'pointer'}
        justifyContent={'center'}
        alignItems={'center'}
        leftIcon={
            <Image
                src='/icons/add.svg'
                boxSize={'24px'}
            />
        }
        _hover={
            {
                bgColor:'#2877b7',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'ease-in-out',
            }
        }
    >
        {text}
    </Button>
  )
}
