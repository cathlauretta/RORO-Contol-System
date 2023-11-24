import { Flex, Box, Heading, VStack } from '@chakra-ui/react'
import { objectEnumValues } from '@prisma/client/runtime/library'
import type { Room , Employee, Report } from '@prisma/client'

export default async function Home() {
  const data2:Room = {
    room_id: 'ROOM501',
    room_name: '501',
    type: 'Suite',
    floor: 5,
    flag: true,
    price: 1000000,
    occupied_status: false,
    image: null,
    condition: null,
    repair_notes: null,
  }

  // contoh GET
  // const queryParams = new URLSearchParams({
  //   name : '407'
  // }).toString();
  // const response = await fetch(`http://localhost:3000/api/roomManager?${queryParams}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // const aa:Room[] = await response.json()
  // console.log(aa)

  // contoh POST
  // const res = await fetch(`http://localhost:3000/api/roomManager`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data2)
  // })
  
  // contoh DELETE
  // const queryParams = new URLSearchParams({
  //   room_id : 'ROOM501'
  // }).toString();
  // const response = await fetch(`http://localhost:3000/api/roomManager?${queryParams}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  
  // contoh PUT
  // const res = await fetch(`http://localhost:3000/api/roomManager`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data2)
  // })
  return (
    <Box p={4}>
      <Heading mb={4}>List of Data</Heading>
      {/* <VStack spacing={4} align="stretch">
        {employeeData.map((employee) => 
        (
          <Box key={employee.employee_id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{employee.employee_id} {employee.role} {employee.name}</Heading>
          </Box>
        ))}
      </VStack> */}
    </Box>
  )
}