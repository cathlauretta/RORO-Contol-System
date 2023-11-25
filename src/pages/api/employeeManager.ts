import prisma from '../../../prisma/client';
import type { Employee } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'GET'){
        try{
            const { employee_id, name, username, password } = req.query;
            let queryOptions = {};
            if (employee_id || name) {
                queryOptions = {
                    where : {
                        AND : [
                            {employee_id: {contains: employee_id}},
                            {name:{contains: name, mode: 'insensitive'}}
                        ]
                    }
                }
            } else if (username && password) {
                queryOptions = {
                    where : {
                        AND : [
                            {username: {contains: username}},
                            {password:{contains: password}}
                        ]
                    }
                }
            }
            const employees = await prisma.employee.findMany(queryOptions);
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'POST') {
        try{
            const { employee_id, name, gender, date_of_birth, address, role, username, password, contact, floor_assigned } : Employee = req.body
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