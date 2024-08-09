import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    //delete
    // await prisma.auction.delete({
    //   where: {
    //     id: 3
    //   }
    // });

    //update
    // let s = new Date("August 9 24:00:00 2024");

    // const st = new Intl.DateTimeFormat("en-US", {
    //   dateStyle: "full",
    //   timeStyle: "long",
    //   timeZone: 'PST',
    // }).format(s);

    await prisma.auction.update({
      where: {
        id: 1
      },
      data: {
        price: 1000,
        startDate: new Date("2024-08-09T23:00:00-05:00"),
        endDate: new Date("2024-08-12T00:00:00-05:00")
      },
    });
    res.status(200).json({ message: "auction updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating auction" });
  }
}
