import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { name, type, floor, flag } = req.query;
      let queryOptions = {};
      if (name || type) {
        queryOptions = {
            where : {
              AND : [
                {
                  room_name: {
                    contains: name
                  }
                },
                {
                  type: {
                    contains: type
                  }
                }
              ]
            }
        }
      }
      const rooms = await prisma.room.findMany(queryOptions);
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    // Handle any other HTTP methods, or return 405 Method Not Allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// export async function RoomGETByQuery(query:string){
//     try {
//         const rooms = await prisma.room.findMany({
//             where: {
//                 OR: [
//                     {room_name: {contains: query}},
//                 ]
//             }
//         });
//         return rooms;
//     }
//     catch (error) {
//         throw error;
//     }

// }

// export async function RoomPOST(room_id:string,type:string,floor:number,price:number,occupied_status:boolean,condition:string,flag:boolean,image:string,repair_notes:string,room_name:string){
//     const data = {room_id: room_id,
//         type: type,
//         floor: floor,
//         price: price,
//         occupied_status: occupied_status,
//         condition: condition,
//         flag: flag,
//         image: image,
//         repair_notes: repair_notes,
//         room_name: room_name}

//     try {
//         const room = await prisma.room.create({data});
//         return room;
//     }
//     catch (error) {
//         throw error;
//     }
// }

// export async function RoomPUT(room_id:string,type:string,floor:number,price:number,occupied_status:boolean,condition:string,flag:boolean,image:string,repair_notes:string,room_name:string){
//     try {
//         const data = {
//             room_id: room_id,
//             type: type,
//             floor: floor,
//             price: price,
//             occupied_status: occupied_status,
//             condition: condition,
//             flag: flag,
//             image: image,
//             repair_notes: repair_notes,
//             room_name: room_name
//         };

//         const updatedRoom = await prisma.room.update({
//             where: { room_id: room_id },
//             data: data
//         });
//     } catch (error) {
//         throw error;
//     }
// }

// export async function RoomDELETE(room_id:string){
//     try {
//         const deletedRoom = await prisma.room.delete({
//             where: { room_id: room_id },
//         });
//     } catch (error) {
//         throw error;
//     }
// }