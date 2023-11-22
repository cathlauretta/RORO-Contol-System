import prisma from '../../../prisma/client';

export async function RoomGET(room_id?:string,room_name?:string,tipe?:string,floor?:string,flag?:string)
{
    try {
        const filters = {};
        if (room_id)    {Object.assign(filters, {room_id: {equals: room_id}})}
        if (room_name)  {Object.assign(filters, {room_name: {contains: room_name}})}
        if (tipe)       {Object.assign(filters, {tipe: {contains: tipe}})}
        if (floor)      {Object.assign(filters, {floor: {contains: floor}})}
        if (flag)       {Object.assign(filters, {flag: {contains: flag}})}
        
        const rooms = await prisma.room.findMany({where:filters});
        return rooms;
    }
    catch (error) {
        throw error;
    }
}

export async function RoomPOST(room_id:string,tipe:string,floor:number,price:number,occupied_status:boolean,condition:string,flag:boolean,image:string,repair_notes:string,room_name:string){
    const data = {room_id: room_id,
        tipe: tipe,
        floor: floor,
        price: price,
        occupied_status: occupied_status,
        condition: condition,
        flag: flag,
        image: image,
        repair_notes: repair_notes,
        room_name: room_name}

    try {
        const room = await prisma.room.create({data});
        return room;
    }
    catch (error) {
        throw error;
    }
}

export async function RoomPUT(room_id:string,tipe:string,floor:number,price:number,occupied_status:boolean,condition:string,flag:boolean,image:string,repair_notes:string,room_name:string){
    try {
        const data = {
            room_id: room_id,
            tipe: tipe,
            floor: floor,
            price: price,
            occupied_status: occupied_status,
            condition: condition,
            flag: flag,
            image: image,
            repair_notes: repair_notes,
            room_name: room_name
        };

        const updatedRoom = await prisma.room.update({
            where: { room_id: room_id },
            data: data
        });
    } catch (error) {
        throw error;
    }
}

export async function RoomDELETE(room_id:string){
    try {
        const deletedRoom = await prisma.room.delete({
            where: { room_id: room_id },
        });
    } catch (error) {
        throw error;
    }
}