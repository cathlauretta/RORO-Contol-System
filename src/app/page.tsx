import { Flex, Box, Heading, VStack } from '@chakra-ui/react'
import { objectEnumValues } from '@prisma/client/runtime/library'
import LoginPage from './login/page'
import RoomPage from './room/page'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export default async function Home() {
  const data = {employee_id: 'employee7',
  name: 'pt ivan aldy gans',
  gender: 'P',
  date_of_birth: '2023-11-14T00:00:00.000Z',
  address: 'itb nangor',
  role: 'staff',
  username: 'ivanaldyganssekali',
  password: 'mangeak'}
  
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  if (session?.user) {
    return (
      <RoomPage/>
    )
  } else {
    return (
      <LoginPage/>
    )
  }
  // contoh POST
  // await EmployeePOST(data.employee_id,data.name,data.gender,data.date_of_birth,data.address,data.role,data.username,data.password)
  
  // contoh PUT
  // await EmployeePUT(data.employee_id,data.name,data.gender,data.date_of_birth,data.address,data.role,data.username,data.password)
  
  // contoh DELETE
  // await EmployeeDELETE(data.employee_id)

  // contoh GET dengan filter nama 'ivan'
  // const employeeData = await EmployeeGET(undefined, 'ivan')
  // console.log(employeeData)
    // <Box p={4}>
    //   <Heading mb={4}>List of Data</Heading>
    //   <VStack spacing={4} align="stretch">
    //     {employeeData.map((employee) => 
    //     (
    //       <Box key={employee.employee_id} borderWidth="1px" borderRadius="lg" p={4}>
    //         <Heading size="md">{employee.employee_id} {employee.role} {employee.name}</Heading>
    //       </Box>
    //     ))}
    //   </VStack>
    // </Box>
}