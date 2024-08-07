import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { item, bid, name, email, phone, twitter, telegram } = req.body;

    try {
      await prisma.bid.create({
        data: {
          item: item,
          bid: bid,
          name:name,
          email: email,
          phone: phone,
          twitter: twitter,
          telegram: telegram,
        },
      });
      res.status(200).json({ message: "bid submitted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error placing bid" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
