import prisma from '../../../prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';



export async function EmployeeGET(employee_id?:string,name?:string) {
    try {
        const filters = {};
        if (name) {Object.assign(filters, {name: {contains: name, mode: 'insensitive'}})}
        
        if (employee_id){
            const employee = await prisma.employee.findFirst({where:{employee_id:employee_id}});
            return employee;
        } else {
            const employees = await prisma.employee.findMany({where:filters});
            return employees;
        }
    }
    catch (error) {
        throw error;
    }
}

export async function EmployeePOST(employee:Employee){
    const data = employee
    data.hire_date = new Date()
    data.last_edit = new Date()

    try {
        const employee = await prisma.employee.create({data});
        return employee;
    }
    catch (error) {
        throw error;
    }
}

export async function EmployeePUT(employee:Employee){
    try {
        const data:Employee = employee
        data.last_edit = new Date()
        // const data = {
        //     employee_id: employee.employee_id,
        //     name: employee.name,
        //     gender: employee.gender,
        //     date_of_birth: employee.date_of_birth,
        //     address: employee.address,
        //     role: employee.role,
        //     username: employee.username,
        //     password: employee.password,
        //     hire_date: employee.hire_date,
        //     contact: employee.contact,
        //     floor_assigned: employee.floor_assigned,
        //     last_edit: new Date()
        // };

        const updatedEmployee = await prisma.employee.update({
            where: { employee_id: data.employee_id },
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