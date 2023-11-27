import React from "react";
import { Navbar } from "@/components/Navbar";
import { Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { redirect } from "next/navigation";
import ReportAddTemp from "./ReportAdd";

const ReportAdd = async () => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect("/login");
  } else {
    const userName = session.user.name;
    return (
      // Flex satu screen
      <Flex width={"100vw"} flexDir={"column"} bg={"white"}>
        <Navbar />
        <ReportAddTemp params={{ id: userName }} />
      </Flex>
    );
  }
};

export default ReportAdd;
