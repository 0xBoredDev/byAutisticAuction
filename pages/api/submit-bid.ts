import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { item, bid, name, email, phone, twitter, telegram } = req.body;

    return prisma
      .$transaction(async (tx) => {
        // 1. find current auction price
        const auction = await prisma.auction.findFirstOrThrow({
          where: {
            id: item,
          },
        });

        // 2. Verify that the bid is more than the current auction price
        if (auction.price >= Number(bid)) {
          throw new Error(
            `The auction price is now $${auction.price} please refresh or increase your bid by $100.`
          );
        }

        // 3. Create the bid
        await prisma.bid.create({
          data: {
            item: item,
            bid: Number(bid),
            name: name,
            email: email,
            phone: phone,
            twitter: twitter,
            telegram: telegram,
          },
        });

        // 4. Increment the auction price
        await prisma.auction.update({
          where: {
            id: item,
          },
          data: {
            price: Number(bid),
          },
        });

        return res
          .status(200)
          .json({ success: true, message: "bid submitted successfully" });
      })
      .catch((error: any) => {
        return res.status(500).json({ success: false, message: error.message });
      });
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
