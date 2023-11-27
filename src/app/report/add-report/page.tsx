import { Text, Textarea, Flex, Button } from "@chakra-ui/react";
import { ReportAdd } from "./ReportAdd";
import { Navbar } from "@/components/Navbar";
import React from "react";

const addReport = async () => {
  return (
    /* I. Whole Page */
    <Flex flexDir="column" h="140vh">
      <Navbar />
      <ReportAdd />
    </Flex>
  );
};

export default addReport;
