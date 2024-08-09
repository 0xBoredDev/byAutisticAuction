import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// export const runtime = 'nodejs'
// export const revalidate = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const auctions = await prisma.auction.findMany();

    res.status(200).json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retreiving auctions" });
  }
}
