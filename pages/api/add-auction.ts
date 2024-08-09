import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return false;
  try {
    await prisma.auction.create({
      data: {
        item: 2,
        price: 1000,
        startDate: new Date("August 8 17:00:00 2024 PST"),
        endDate: new Date("August 9 17:00:00 2024 PST"),
      },
    });
    res.status(200).json({ message: "auction created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating auction" });
  }
}
