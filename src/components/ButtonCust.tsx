import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const ButtonRef = ({ currDir }: { currDir: string }) => {
    let desiredDirectory = "";
    let text = "Login";

    if (currDir === "Login") {
        desiredDirectory = "/room";
    } else if (currDir === "Unauthorized") {
        desiredDirectory = "/login";
    } else if (currDir === "Room") {
        // CHANGE IF NEW ROOM ALREADY IMPLEMENTED
        desiredDirectory = "/room";
        text = "+ Add Room";
    } else if (currDir === "Report") {
        // CHANGE IF NEW REPORT ALREADY IMPLEMENTED
        desiredDirectory = "/report";
        text = "+ Add Report";
    } else if (currDir === "Employee") {
        // CHANGE IF NEW EMPLOYEE ALREADY IMPLEMENTED
        desiredDirectory = "/employee";
        text = "+ Add Employee";
    } else if (currDir === "AddRoom") {
        // UPLOAD NEW PHOTO STILL GREYED OUT
        desiredDirectory = "/room";
        text = "Save";
    } else if (currDir === "AddReport") {
        // UPLOAD NEW PHOTO STILL GREYED OUT
        desiredDirectory = "/report";
        text = "Save";
    } else if (currDir === "AddEmployee") {
        // UPLOAD NEW PHOTO STILL GREYED OUT
        desiredDirectory = "/employee";
        text = "Save";
    }

    return (
        <a href={desiredDirectory}>
        <Flex
            textColor={'#FFFFFF'}
            fontSize={'16'}
            fontWeight={'600'}
            fontStyle={'normal'}
            cursor={'pointer'}
            minH={'55px'}
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
    let height = "44px";
    let width = "145px";
    let gap = "5px";

    if (currDir === "Login" || currDir === "Unauthorized") {
        width = "300px";
        height = "30px";
        gap = "4px";
    }

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