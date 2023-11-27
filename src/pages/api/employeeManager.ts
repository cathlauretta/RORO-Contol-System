import prisma from '../../../prisma/client';
import type { Employee } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';

export default async function(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'GET'){
        try{
            const { employee_id, name, username, password, floor_assigned, other } = req.query;
            let queryOptions:Record<string,any> = {};
            if (other == "latest id") {
                const employees = await prisma.employee.findFirst({where: queryOptions, orderBy: {employee_id: 'desc'}});
                res.status(200).json(employees);
            }
            else if (username && password) {
                queryOptions = {
                    where : {
                        AND : [
                            {username: {contains: username}},
                            {password:{contains: password}}
                        ]
                    }
                }
                const employees = await prisma.employee.findMany({where: queryOptions, orderBy: {employee_id: 'asc'}});
                res.status(200).json(employees);
            } else {
                if (employee_id) {
                    queryOptions.employee_id = {contains: employee_id as string};
                }
                if (name) {
                    queryOptions.name = {contains: name as string, mode: 'insensitive'};
                }
                if (floor_assigned) {
                    queryOptions.floor_assigned = parseInt(floor_assigned as string);
                }
                const employees = await prisma.employee.findMany({where: queryOptions, orderBy: {employee_id: 'asc'}});
                res.status(200).json(employees);
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'POST') {
        try{
            const { employee_id, name, gender, date_of_birth, address, role, username, password, contact, floor_assigned } : Employee = req.body

            const hashPass = await hash(password, 10);
            const data:Employee = {
                employee_id: employee_id,
                name: name,
                gender: gender,
                date_of_birth: date_of_birth,
                address: address,
                role: role,
                username: username,
                password: hashPass,
                contact: contact,
                floor_assigned: floor_assigned,
                hire_date: new Date(),
                last_edit: new Date()
            }
            const employee = await prisma.employee.create({data:data});
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'PUT') {
        try{
            const { employee_id, name, gender, date_of_birth, address, role, username, password, hire_date, contact, floor_assigned } : Employee = req.body
            const data:Employee = {
                employee_id: employee_id,
                name: name,
                gender: gender,
                date_of_birth: date_of_birth,
                address: address,
                role: role,
                username: username,
                password: password,
                contact: contact,
                floor_assigned: floor_assigned,
                hire_date: hire_date,
                last_edit: new Date()
            }
            const employee = await prisma.employee.update({
                where: { employee_id: data.employee_id },
                data: data
            });
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'DELETE') {
        try{
            const { employee_id } = req.query;
            const employee = await prisma.employee.delete({
                where: { employee_id: employee_id as string },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}