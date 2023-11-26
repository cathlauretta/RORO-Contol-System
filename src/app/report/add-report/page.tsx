"use client";
import { Providers } from "@/app/providers";
import { Text, Textarea, Flex, Button } from "@chakra-ui/react";
import Title from "@/components/Title";
import UploadImage from "@/components/UploadImage";
import LabelInput from "@/components/LabelInput";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Report } from "@prisma/client";

const ReportAdd = () => {
  const [title, setTitle] = useState<string>("");
  const handleTitle = (item: string) => {
    setTitle(item);
    console.log(item);
  };

  const [repType, setRepType] = useState<string>("");
  const handleType = (item: string) => {
    setRepType(item);
    console.log(item);
  };

  const [publicID, setPublicID] = useState<string>("btjmca610xceizaubtzo");
  const handlePID = (item: string) => {
    setPublicID(item);
    console.log(item);
  };

  const [repID, setRepID] = useState<string>("");
  const handleRepID = (item: string) => {
    setRepID(item);
  };

  const [roomID, setRoomID] = useState<string>("");
  const handleRoomID = (item: string) => {
    setRoomID(item);
  };

  const [eic, setEIC] = useState<string>("");
  const handleEIC = (item: string) => {
    setEIC(item);
  };

  const [desc, setDesc] = useState<string>("Ivan Aldy");
  const handleDesc = (item: string) => {
    setEIC(item);
  };

  const [data, setData] = useState<Report>();
  const handleData = (item: Report) => {
    setData(item);
  }

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        other: "latest id",
      }).toString();
      const getresponse = await fetch(`/api/reportManager?${queryParams}`);
      if (!getresponse.ok) {
        throw new Error("Data fetching failed");
      }
      const refReport: Report = await getresponse.json();

      if (!refReport) {
        setRepID("REPORT000");
      } else {
        setData(refReport);
        setRepID("REPORT" + `${parseInt(refReport.report_id.slice(6, 8)) + 1}`);
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  useEffect(() => {
    if (repID == "") {
      fetchData();
    }
  }, [repID]);

  const handleSave = async () => {
    try {
      if (parseInt(roomID) > 999) { throw new Error ("Invalid Input"); }
      
      const newReportData: Report = {
        report_id: repID,
        date: new Date(),
        room_repaired: roomID,
        eic: eic,
        repair_description: desc,
        report_title: title,
        type: repType,
        images: publicID
      };

      const response = await fetch(`/api/reportManager`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReportData),
      });
      if (!response.ok) {
        throw new Error("Data update failed");
      }
      alert("Data Saved");
      window.location.href = `/report`;
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    /* I. Whole Page */
    <Flex flexDir="column" h="140vh">
      <Navbar />
      <Providers>
        {/* I.1. Content Area */}
        <Flex flexDir="column" w="85vw" h="740px" m="auto" alignItems="end">
          {/* I.1.1. Title & Inspect */}
          <Title titleItem={handleTitle} repTypeItem={handleType} />
          {/* I.1.2. Image & Text Area */}
          <Flex w="85vw" h="600px" paddingTop="40px" gap="40px">
            {/* I.1.2.1. Image */}
            <UploadImage label="Report Image" PID={handlePID} />
            {/* I.1.2.2. Text */}
            <Flex w="full" flexDir="column" gap="28px">
              {/* I.1.2.2.1. Attribute */}
              <Flex w="full" justifyContent="space-between" gap="20px">
                <LabelInput
                  label="Report ID"
                  disabled={true}
                  bg="#DFDFDF"
                  value={repID}
                  checkValue={handleRepID}
                />
                <LabelInput
                  label="Room"
                  disabled={false}
                  bg="#FFFFFF"
                  value=""
                  checkValue={handleRoomID}
                />
                <LabelInput
                  label="Employee"
                  disabled={true}
                  bg="#DFDFDF"
                  value={eic}
                  checkValue={handleEIC}
                />
              </Flex>
              {/* I.1.2.2.2. Textarea */}
              <Flex flexDir="column" gap="12px">
                <Text fontWeight="600"> Report Description </Text>
                <Textarea
                  w="full"
                  h="56vh"
                  resize="none"
                  fontSize="14px"
                  fontWeight="400"
                  padding="12px"
                  border="2px solid #247EC5"
                  borderRadius="8px"
                  placeholder="Describe the condition of the room"
                  onChange={(event) => {handleDesc}}
                />
              </Flex>
            </Flex>
          </Flex>
          {/* I.1.3. Save */}
          <Button
            w="10vw"
            h="40px"
            bg="#39A7FF"
            fontSize="16px"
            color="#FFFFFF"
            leftIcon={
              <Image
                src="/icons/Save.svg"
                width={18}
                height={20}
                alt="Save Button"
              />
            }
            onClick={(event) => handleSave}
          >
            Save
          </Button>
        </Flex>
      </Providers>
    </Flex>
  );
};

export default ReportAdd;
