"use client";
import React from "react";
import { Flex, MenuItem } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const NavbarMenuItem2 = ({
  text,
  textColor,
  onClick,
}: {
  text: string;
  textColor: string;
  onClick?: () => void;
}) => {
  return (
    <MenuItem
      border="none"
      bgColor={"transparent"}
      borderRadius={"4px"}
      transitionTimingFunction={"ease-in-out"}
      transitionDuration={"0.2s"}
      _hover={{
        bgColor: "#E0F4FF",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      onClick={onClick}
    >
      <Flex
        width={"144px"}
        textColor={textColor}
        justifyContent={"left"}
        cursor="pointer"
        fontSize={"14px"}
      >
        {text}
      </Flex>
    </MenuItem>
  );
};

const Logout = () => {
  return (
    <NavbarMenuItem2
      onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
      text="Logout"
      textColor="#D53333"
    />
  );
};

export default Logout;
