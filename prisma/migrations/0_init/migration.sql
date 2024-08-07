-- CreateTable
CREATE TABLE "Bids" (
    "id" SERIAL NOT NULL,
    "item" INTEGER NOT NULL,
    "bid" NUMERIC(6,0) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NULL,
    "phone" TEXT NULL,
    "twitter" TEXT NULL,
    "telegram" TEXT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auctions" (
    "id" SERIAL NOT NULL,
    "price" NUMERIC(6,0)  NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("id")
);
