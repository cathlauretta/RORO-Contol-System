import { Report, Room } from "@prisma/client";

interface NewReportProps {
  repID: string;
  roomID: string;
  eic: string;
  desc: string;
  title: string;
  repType: string;
  publicID: string;
}

export async function fetchData(handleRepID: (item: string) => void) {
  try {
    const queryParams = new URLSearchParams({
      other: "latest id",
    }).toString();
    const getresponse = await fetch(`/api/reportManager?${queryParams}`);
    if (!getresponse.ok) {
      throw new Error("Data fetching failed");
    }
    const refReport: Report = await getresponse.json();
    console.log(refReport);

    if (!refReport) {
      handleRepID("REPORT000");
    } else {
      const id = parseInt(refReport.report_id.slice(8)) + 1;
      console.log(id);

      var zero = "00";
      if (id > 9 && id < 100) {
        zero = "0";
      } else if (id >= 100) {
        zero = "";
      }
      handleRepID("REPORT" + zero + id.toString());
    }
  } catch (error) {
    alert((error as Error).message);
  }
}

export async function addReport({
  repID,
  roomID,
  eic,
  desc,
  title,
  repType,
  publicID,
}: NewReportProps) {
  try {
    const roomList = await getRoomList();

    if (!roomList.includes(roomID)) {
      throw new Error("No Such Room Exists");
    }

    const newReportData: Report = {
      report_id: repID,
      date: new Date(),
      room_repaired: roomID,
      eic: eic,
      repair_description: desc,
      report_title: title,
      type: repType,
      images: publicID,
    };

    const response = await fetch(`/api/reportManager`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReportData),
    });

    console.log(JSON.stringify(newReportData));
    // console.log(response)

    if (!response.ok) {
      throw new Error("Data update failed");
    }
    alert("Data Saved");
    window.location.href = `/report`;
    console.log("done");
  } catch (error) {
    alert((error as Error).message);
    console.error();
  }
}

async function getRoomList() {
  const getresponse = await fetch(`/api/roomManager`);
  const refRoom: Room[] = await getresponse.json();
  const roomList = refRoom.map((item) => {
    return item.room_name;
  });

  return roomList;
}
