import prisma from '../../../prisma/client';

export async function ReportGET(report_id?:string,report_title?:string,room_repaired?:string,date?:string,status?:string){
    try {
        const filters = {};
        if (report_id)          {Object.assign(filters, {report_id: {equals: report_id}})}
        if (report_title)       {Object.assign(filters, {report_title: {contains: report_title, mode: 'insensitive'}})}
        if (room_repaired)      {Object.assign(filters, {room_repaired: {contains: room_repaired}})}
        if (date)               {Object.assign(filters, {date: {contains: date}})}
        if (status)             {Object.assign(filters, {status: {contains: status}})}
        const reports = await prisma.report.findMany({where:filters});
        return reports;
    }
    catch (error) {
        throw error;
    }
}

export async function ReportPOST(report_id:string,date:string,room_repaired:string,eic:string,repair_description:string,report_title:string,status:string){
    const data = {report_id: report_id,
        date: date,
        room_repaired: room_repaired,
        eic: eic,
        repair_description: repair_description,
        report_title: report_title,
        status: status}

    try {
        const report = await prisma.report.create({data});
        return report;
    }
    catch (error) {
        throw error;
    }
}

export async function ReportPUT(report_id:string,date:string,room_repaired:string,eic:string,repair_description:string,report_title:string,status:string){
    try {
        const data = {
            report_id: report_id,
            date: date,
            room_repaired: room_repaired,
            eic: eic,
            repair_description: repair_description,
            report_title: report_title,
            status: status
        };

        const updatedReport = await prisma.report.update({
            where: { report_id: report_id },
            data: data
        });
    } catch (error) {
        throw error;
    }
}

export async function ReportDELETE(report_id:string){
    try {
        const deletedReport = await prisma.report.delete({
            where: { report_id: report_id },
        });
    } catch (error) {
        throw error;
    }
}