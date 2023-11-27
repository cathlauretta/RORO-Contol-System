import { Employee, Room } from "@prisma/client";

interface NewEmployeeProps {
  empID: string;
  name: string;
  gender: string;
  date_of_birth: string;
  address: string;
  role: string;
  username: string;
  password: string;
  contact: string;
  floor_assigned: string;
}

export async function fetchData(handleEmpID: (item: string) => void) {
  try {
    const queryParams = new URLSearchParams({
      other: "latest id",
    }).toString();
    const getresponse = await fetch(`/api/employeeManager?${queryParams}`);
    if (!getresponse.ok) {
      throw new Error("Data fetching failed");
    }
    const refEmployee: Employee = await getresponse.json();
    console.log(refEmployee);

    if (!refEmployee) {
      handleEmpID("EMPLOYEE000");
    } else {
      const id = parseInt(refEmployee.employee_id.slice(8)) + 1;
      console.log(id);

      var zero = "00";
      if (id > 9 && id < 100) {
        zero = "0";
      } else if (id >= 100) {
        zero = "";
      }
      handleEmpID("EMPLOYEE" + zero + id.toString());
    }
  } catch (error) {
    alert((error as Error).message);
  }
}

export async function addEmployee({
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
}: NewEmployeeProps) {
  try {
    const floorList = [1, 2, 3, 4, 5];

    if (!floorList.includes(parseInt(floor_assigned))) {
      throw new Error("No Such Floor Exists");
    }

    const newEmployeeData: Employee = {
      employee_id: empID,
      name: name,
      gender: gender,
      date_of_birth: new Date(date_of_birth),
      address: address,
      role: role,
      username: username,
      password: password,
      hire_date: new Date(),
      contact: contact,
      last_edit: new Date(),
      floor_assigned: parseInt(floor_assigned)
    };

    const response = await fetch(`/api/employeeManager`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeData),
    });

    console.log(JSON.stringify(newEmployeeData));
    // console.log(response)

    if (!response.ok) {
      throw new Error("Data update failed");
    }
    alert("Data Saved");
    window.location.href = `/employee`;
    console.log("done");
  } catch (error) {
    alert((error as Error).message);
    console.error();
  }
}
