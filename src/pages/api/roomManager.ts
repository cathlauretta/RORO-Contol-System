import prisma from '../../../prisma/client';
import type { Room } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
        const { name , type , floor, flag } = req.query;
        let queryOptions: Record<string,any> = {};
        if (name) {
            queryOptions.room_name = {contains: name as string, mode: 'insensitive'};
        }
        if (type) {
            queryOptions.type = {equals: type as string}
        }
        if (floor) {
            queryOptions.floor = parseInt(floor as string)
        }
        if (flag){
            queryOptions.flag = flag === 'true' ? true : false;
        }

        // if (name || type || floor || flag) {
        //   queryOptions = {
        //       where : {
        //         AND : [
        //           {room_name: {contains: name}},
        //           {type:{contains: type, mode: 'insensitive'}},
        //           {floor:{equals: floor}},
        //           {flag:{equals: flag}}
        //         ]
        //       }
        //   }
        // }
        const rooms = await prisma.room.findMany({where: queryOptions});
        res.status(200).json(rooms);
        } catch (error) {
        res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'POST') {
        try{
        const { room_id, type, floor, price, occupied_status, condition, flag, image, repair_notes, room_name }:Room = req.body;
        const data:Room = {
            room_id: room_id,
            type: type,
            floor: floor,
            price: price,
            occupied_status: occupied_status,
            condition: condition,
            flag: flag,
            image: image,
            repair_notes: repair_notes,
            room_name: room_name,
        };
        const room = await prisma.room.create({data:data});
        res.status(201).json(room);
        } catch (error) {
        res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'PUT') {
        try{
        const { room_id, type, floor, price, occupied_status, condition, flag, image, repair_notes, room_name } : Room= req.body;
        const data:Room = {
            room_id: room_id,
            type: type,
            floor: floor,
            price: price,
            occupied_status: occupied_status,
            condition: condition,
            flag: flag,
            image: image,
            repair_notes: repair_notes,
            room_name: room_name
        };
        const room = await prisma.room.update({
            where: { room_id: data.room_id },
            data: data
        });
        res.status(200).json(room);
        } catch (error) {
        res.status(500).json({ error: (error as Error).message });
        }
    } else if (req.method === 'DELETE') {
        try{
        const { room_id } = req.query;
        const room = await prisma.room.delete({
            where: { room_id: room_id as string },
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