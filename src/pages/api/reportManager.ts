import prisma from '../../../prisma/client';
import type { Report } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'GET') {
        try {
        const { report_title ,room_repaired, eic, date, type } = req.query;
        let queryOptions: Record<string,any> = {};
        
        if (report_title) {
            queryOptions.report_title = {contains: report_title as string, mode: 'insensitive'};
        }
        if (room_repaired) {
            queryOptions.room_repaired = {contains: room_repaired as string};
        }
        if (eic) {
            queryOptions.eic = {contains: eic as string, mode: 'insensitive'};
        }
        if (date) {
            queryOptions.date = new Date(date as string);
        }
        if (type) {
            queryOptions.type = {contains: type as string}
        }
        // if (report_title || room_repaired || date || type) {
        //     queryOptions = {
        //         where : {
        //         AND : [
        //             {report_title: {contains: report_title}, mode: 'insensitive'},
        //             {room_repaired:{contains: room_repaired}},
        //             {date:{equals: date}},
        //             {type:{equals: type}}
        //         ]
        //         }
        //     }
        // }
        const reports = await prisma.report.findMany({where: queryOptions});
        res.status(200).json(reports);
        } catch (error) {
        res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'POST') {
        try{
        const { report_id, date, room_repaired, eic, repair_description, report_title, type, images }:Report = req.body;
        const data:Report = {
            report_id: report_id,
            date: date,
            room_repaired: room_repaired,
            eic: eic,
            repair_description: repair_description,
            report_title: report_title,
            type: type,
            images: images
        };
        const report = await prisma.report.create({data:data});
        res.status(200).json(report);
        } catch (error) {
        res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'PUT') {
        try{
        const { report_id, date, room_repaired, eic, repair_description, report_title, type, images }:Report = req.body;
        const data:Report = {
            report_id: report_id,
            date: date,
            room_repaired: room_repaired,
            eic: eic,
            repair_description: repair_description,
            report_title: report_title,
            type: type,
            images: images
        };
        const updatedReport = await prisma.report.update({
            where: { report_id: report_id },
            data: data
        });
        res.status(200).json(updatedReport);
        } catch (error){
        res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'DELETE') {
        try{
        const { report_id } = req.body;
        const deletedReport = await prisma.report.delete({
            where: { report_id: report_id },
        });
        res.status(204).end();
        } catch (error){
        res.status(500).json({ error: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}