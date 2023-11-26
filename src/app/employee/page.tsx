import { Navbar } from '@/components/Navbar'
import { NavPage } from '@/components/NavPage'
import { Flex } from '@chakra-ui/react'
import EmployeeTemp from './Employee';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { redirect } from 'next/navigation';

const EmployeePage = async() => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect('/login')
  } else if (session?.user.role !== "admin") {
    return redirect('/room')
  } else {
    return (
        // Flex satu screen
        <Flex width={"100vw"} flexDir={'column'} bg = {"white"}>
          <Navbar/>
          <Flex
            pt = {40}
            alignItems={'center'}
            justify={'center'}
          >
            <NavPage active='Employee' isAdmin={(session?.user.role === "admin")}/>
          </Flex>
          <EmployeeTemp/>
      </Flex>
    )
  }
}

export default EmployeePage;