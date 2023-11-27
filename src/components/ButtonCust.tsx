import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const ButtonRef = ({ currDir }: { currDir: string }) => {
    let desiredDirectory = "";
    let text = "Login";

    if (currDir === "Login") {
        desiredDirectory = "/room";
    } else if (currDir === "Unauthorized") {
        desiredDirectory = "/login";
    }

    return (
        <a href={desiredDirectory}>
            <Flex
                textColor={'#FFFFFF'}
                fontSize={'14px'}
                fontWeight={'600'}
                fontStyle={'normal'}
                cursor={'pointer'}
                // minH={'55px'}
                height={'40px'}
                textAlign={'center'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                {text}
            </Flex>
        </a>
    );
};

export const ButtonCust = ({ currDir }: { currDir: string }) => {
    let height = "30px";
    let width = "300px";
    let gap = "4px";

    return (
        <Box
        width={width}
        height={height}
        mt = {4}
        paddingX="5px"
        paddingY="5px"
        background="#39A7FF"
        borderRadius="6px"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        gap={gap}
        display="inline-flex"
        >
        <ButtonRef currDir={currDir} />
        </Box>
    );
};