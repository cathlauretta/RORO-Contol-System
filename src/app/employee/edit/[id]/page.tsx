import { Navbar } from "@/components/Navbar";
import { Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { redirect } from "next/navigation";
import EmployeeEdit from "./EmployeeEdit";

const page = async ({params}: {params: {id: string}}) => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect("/login");
  } else if (session?.user.role !== "admin") {
    return redirect("/room")
  } else {
    return (
      <Flex w="100vw" h="180vh" flexDir="column" bg="white">
        <Navbar />
        <EmployeeEdit params={{id:params.id}}/>
      </Flex>
    );
  }
};

export default page;
