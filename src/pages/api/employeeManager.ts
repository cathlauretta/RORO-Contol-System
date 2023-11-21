import prisma from '../../../prisma/client';

export async function EmployeeGET(employee_id?:string,name?:string) {
    try {
        const filters = {};
        if (employee_id)    {Object.assign(filters, {employee_id: {equals: employee_id}})}
        if (name)           {Object.assign(filters, {name: {contains: name, mode: 'insensitive'}})}
        const employees = await prisma.employee.findMany({where:filters});
        return employees;
    }
    catch (error) {
        throw error;
    }
}

export async function EmployeePOST(employee_id:string,name:string,gender:string,date_of_birth:string,address:string,role:string,username:string,password:string,contact:string,floor_assigned?:number){
    const data = {employee_id: employee_id,
    name: name,
    gender: gender,
    date_of_birth: date_of_birth,
    address: address,
    role: role,
    username: username,
    password: password,
    hire_date: Date.now(),
    contact: contact,
    floor_assigned: 0,
    last_edit: Date.now()}

    if(floor_assigned){data.floor_assigned=floor_assigned}

    try {
        const employee = await prisma.employee.create({data});
        return employee;
    }
    catch (error) {
        throw error;
    }
}

export async function EmployeePUT(employee_id:string,name:string,gender:string,date_of_birth:string,address:string,role:string,username:string,password:string,hire_date:string,contact:string,floor_assigned:number){
    try {
        const data = {
            employee_id: employee_id,
            name: name,
            gender: gender,
            date_of_birth: date_of_birth,
            address: address,
            role: role,
            username: username,
            password: password,
            hire_date: hire_date,
            contact: contact,
            floor_assigned: floor_assigned,
            last_edit: Date.now()
        };

        const updatedEmployee = await prisma.employee.update({
            where: { employee_id: employee_id },
            data: data
        });
    } catch (error) {
        throw error;
    }
}

export async function EmployeeDELETE(employee_id:string){
    try {
        const deletedEmployee = await prisma.employee.delete({
            where: { employee_id: employee_id },
        });
    } catch (error) {
        throw error;
    }
}

//export async function EmployeeLogin(username:string,password:string){}