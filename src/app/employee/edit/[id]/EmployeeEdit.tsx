"use client";
import { Providers } from "@/app/providers";
import LabelInput from "@/components/LabelInput";
import Title from "@/components/Title";
import UploadImage from "@/components/UploadImage";
import { Flex, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { addEmployee, fetchData, editEmployee } from "./empFun";

const EmployeeEdit = ({params}: {params: {id: string}}) => {
  const [title, setTitle] = useState<string>("New Employee");
  const handleTitle = (item: string) => {
    setTitle(item);
    // console.log(item);
  };

  const [role, setRole] = useState<string>("Staff");
  const handleType = (item: string) => {
    item == "Staff" ? setRole("Admin") : setRole(item);
    // console.log(item);
  };

  const [image, setPublicID] = useState<string>("");
  const handlePID = (item: string) => {
    setPublicID(item);
    // console.log(item);
  };

  const [empID, setEmpID] = useState<string>("Failed to Fetch Data");
  const handleEmpID = (item: string) => {
    setEmpID(item);
  };

  const [gender, setGender] = useState<string>("");
  const handleGender = (item: string) => {
    setGender(item);
  };

  const [name, setName] = useState<string>("");
  const handleName = (item: string) => {
    setName(item);
  };

  const [date_of_birth, setDoB] = useState<string>("");
  const handleDoB = (item: string) => {
    setDoB(item);
  };

  const [address, setAddress] = useState<string>("");
  const handleAddress = (item: string) => {
    setAddress(item);
  };

  const [username, setUsername] = useState<string>("");
  const handleUsername = (item: string) => {
    setUsername(item);
  };

  const [password, setPass] = useState<string>("");
  const handlePass = (item: string) => {
    setPass(item);
  };

  const [contact, setPhone] = useState<string>("");
  const handlePhone = (item: string) => {
    setPhone(item);
  };

  const [floor_assigned, setFloor] = useState<string>("");
  const handleFloor = (item: string) => {
    setFloor(item);
  };

  useEffect(() => {
    if (empID == "Failed to Fetch Data") {
      fetchData(handleEmpID);
    }
  }, [empID]);

  return (
    /* I. Whole Page */
    <Providers>
      {/* I.1. Content Area */}
      <Flex
        flexDir="column"
        w="85vw"
        h="140vh"
        mt="40px"
        mx="auto"
        alignItems="end">
        {/* I.1.1. Title & Inspect */}
        <Title
          repTypeItem={handleType}
          defaultValue="New Employee"
          defTogVal="Staff"
          altTogVal="Admin"
          disabled={true}
        />
        {/* I.1.2. Image & Text Area */}
        <Flex w="85vw" h="140vh" paddingTop="40px" gap="40px">
          {/* I.1.2.1. Image */}
          <UploadImage label="Profile Picture" PID={handlePID} />
          {/* I.1.2.2. Text */}
          <Flex w="full" flexDir="column" gap="28px">
            {/* I.1.2.2.1. Attribute */}
            <Flex
              w="full"
              flexDir="column"
              justifyContent="space-between"
              gap="20px">
              {/* I.1.2.2.1. Attribute */}
              <LabelInput
                label="Employee ID"
                disabled={true}
                bg="#DFDFDF"
                value={empID}
                checkValue={handleEmpID}
              />
              <LabelInput label="Name" value={name} checkValue={handleName} />
              <LabelInput
                label="Gender"
                value={gender}
                placeholder="L: Laki-Laki / P: Perempuan"
                checkValue={handleGender}
              />
              <LabelInput
                label="Birthdate"
                value={date_of_birth}
                placeholder="Contoh: 2023-12-01"
                checkValue={handleDoB}
              />
              <LabelInput
                label="Address"
                value={address}
                checkValue={handleAddress}
              />
              <LabelInput
                label="Username"
                value={username}
                checkValue={handleUsername}
              />
              <LabelInput
                label="Password"
                value={password}
                checkValue={handlePass}
              />
              <LabelInput
                label="Phone Number"
                value={contact}
                placeholder={"Contoh: 0812345678"}
                checkValue={handlePhone}
              />
              <LabelInput
                label="Assign Floor"
                value={floor_assigned}
                placeholder={"Range: 1-5"}
                checkValue={handleFloor}
              />
            </Flex>
          </Flex>
        </Flex>
        {/* I.1.3. Save */}
        <Flex paddingTop="32px" flexDir="row-reverse" gap="12px">
          <Button
            w="10vw"
            h="40px"
            bg="#39A7FF"
            fontSize="16px"
            color="#FFFFFF"
            _hover={{
              bgColor: "#2877b7",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            leftIcon={
              <Image
                src="/icons/Save.svg"
                width={18}
                height={20}
                alt="Save Button"
              />
            }
            onClick={() => {
              editEmployee({
                empID,
                name,
                gender,
                date_of_birth,
                address,
                role,
                username,
                password,
                contact,
                floor_assigned,
                image,
              });
              console.log("Passed Save");
            }}>
            Save
          </Button>
          <Button
            w="10vw"
            h="40px"
            borderColor="#39A7FF"
            fontSize="16px"
            variant="unstyled"
            color="#39A7FF"
            _hover={{
              bgColor: "#F0F0F0",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            onClick={(event) => (window.location.href = `/employee`)}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Providers>
  );
};

export default EmployeeEdit;
