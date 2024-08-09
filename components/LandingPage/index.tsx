"use client";

import React, { useEffect, useState } from "react";
import { TextInput, Label, Button, Footer } from "flowbite-react";
import { BsTwitterX } from "react-icons/bs";

interface Bid {
  item: number;
  bid: string;
  name: string;
  email: string;
  phone: string;
  twitter: string;
  telegram: string;
  error: string;
  success: boolean;
}

interface Auction {
  id: number;
  item: number;
  price: number;
  startDate: string;
  endDate: string;
}

const Homepage = () => {
  const [auction1, setAuction1] = useState<Auction>(createAuction(1));
  const [auction2, setAuction2] = useState<Auction>(createAuction(2));
  const [bid1, setBid1] = useState<Bid>(createBid(1));
  const [bid2, setBid2] = useState<Bid>(createBid(2));
  const [isProcessing1, setIsProcessing1] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const startTime = new Date("2024-08-09T23:00:00-05:00");
  const endTime = new Date("2024-08-11T23:00:00-05:00");

  const getAuctions = async () => {
    const res = await fetch("/api/get-auctions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch auctions");
    }
    return res.json();
  };

  const submitBid = async (bid: Bid) => {
    const res = await fetch("/api/submit-bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });

    return res.json();
  };

  useEffect(() => {
    getAuctions().then((data) => {
      setAuction1(data[0]);
      setAuction2(data[1]);
    });
  }, []);

  const formatDate = (date: Date) => {
    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: "PST",
    }).format(date);

    return formatted;
  };

  const isAuctionLive = () => {
    const curDate = new Date(Date.now());
    return (curDate >= startTime && curDate <= endTime) ? true: false;
  };

  function createBid(item: number) {
    let newBid: Bid = {
      item: item,
      bid: "",
      name: "",
      email: "",
      phone: "",
      twitter: "",
      telegram: "",
      error: "",
      success: false,
    };

    return newBid;
  }

  function createAuction(item: number) {
    let newAuction: Auction = {
      id: 0,
      item: item,
      price: 1000,
      endDate: "",
      startDate: "",
    };

    return newAuction;
  }

  const handleBid1Change = (input: string) => {
    let numberFormat = Number(input);
    const final = Math.trunc(numberFormat);
    setBid1({ ...bid1, bid: final.toString() });
  };

  const handleBid2Change = (input: string) => {
    let numberFormat = Number(input);
    const final = Math.trunc(numberFormat);
    setBid2({ ...bid2, bid: final.toString() });
  };

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();

    const isLive = isAuctionLive();

    if (!isLive) {
      setBid1({
        ...bid1,
        error: "This auction is not currently live.",
      });
      return;
    }
    
    if (
      bid1.email == "" &&
      bid1.phone == "" &&
      bid1.twitter == "" &&
      bid1.telegram == ""
    ) {
      setBid1({
        ...bid1,
        error: "Please enter one of the contact fields",
      });
      return;
    }

    const curBid = Number(bid1.bid);
    const requiredBid = auction1.price + 100;

    if (curBid < requiredBid) {
      setBid1({
        ...bid1,
        error: `Bid must be atleast ${requiredBid}`,
      });
      return;
    }

    submitBid(bid1)
      .then((res) => {
        if (!res.success) {
          throw new Error(res.message);
        }

        setBid1({ ...bid1, success: true, error: "" });
        setAuction1({ ...auction1, price: curBid });
      })
      .catch((err) => {
        console.log(err);
        setBid1({
          ...bid1,
          error: err.message,
        });
      });
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();

    const isLive = isAuctionLive();

    if (!isLive) {
      setBid1({
        ...bid1,
        error: "This auction is not currently live.",
      });
      return;
    }

    if (
      bid2.email == "" &&
      bid2.phone == "" &&
      bid2.twitter == "" &&
      bid2.telegram == ""
    ) {
      setBid2({
        ...bid2,
        error: "Please enter one of the contact fields",
      });
      return;
    }

    const curBid = Number(bid2.bid);
    const requiredBid = auction2.price + 100;

    if (curBid < requiredBid) {
      setBid2({
        ...bid2,
        error: `Bid must be atleast ${requiredBid}`,
      });
      return;
    }

    submitBid(bid2)
      .then((res) => {
        if (!res.success) {
          throw new Error(res.message);
        }

        setBid2({ ...bid2, success: true, error: "" });
        setAuction2({ ...auction2, price: curBid });
      })
      .catch((err) => {
        console.log(err);
        setBid2({
          ...bid2,
          error: err.message,
        });
      });
  };

  return (
    <main className="flex bg-[url('/bg.png')] bg-no-repeat bg-cover min-h-full h-full flex-col items-center justify-between">
      <div className="flex flex-row max-w-xl max-h-xl">
        <img src="/byautistic_logo.png" alt="Logo" />
      </div>
      <div className="flex flex-row max-w-xl max-h-xl mb-6">
        <img src="/autistic.png" alt="Logo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 mb-20">
        <div className="order-2 md:order-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-2xl sm:max-w-md">
          <img
            className="h-396 w-full object-cover"
            src="/sardine1.jpg"
            alt="lisbon sardine 1"
          />
          <div className="p-2">
            <div className="tracking-wide text-2xl leading-tight font-semibold text-black text-center mb-2">
              The Lisbon Sardines 1
            </div>
            <p className="text-black text-center text-xs mb-2">
              <span className="font-bold">Start:</span> {formatDate(startTime)}
            </p>
            <p className="text-black text-center text-xs mb-4">
              <span className="font-bold">End:</span> {formatDate(endTime)}
            </p>
            <p className="text-black text-center text-lg font-semibold">
              Current Price: ${auction1.price}
            </p>

            <div className="flex gap-2 pt-4 justify-center">
              <form id="auction1" onSubmit={handleSubmit1}>
                <div className="flex space-x-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="bid" value="Bid Amount *"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="bid"
                      required
                      placeholder={`min $${(auction1.price + 100).toString()}`}
                      onChange={(e) => handleBid1Change(e.target.value)}
                      value={bid1.bid}
                      disabled={false}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="fullname" value="Name*"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="fullname"
                      required
                      placeholder="Satoshi Nakamoto"
                      onChange={(e) =>
                        setBid1({ ...bid1, name: e.target.value })
                      }
                      value={bid1.name}
                      disabled={false}
                    />
                  </div>
                </div>
                <p className="text-slate-500 text-center text-xs m-2">
                  1 field below is required for contact
                </p>
                <div className="flex space-x-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="email"
                      id="email"
                      placeholder="satoshi@email.com"
                      onChange={(e) =>
                        setBid1({ ...bid1, email: e.target.value })
                      }
                      value={bid1.email}
                      disabled={false}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone Number"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="phone"
                      placeholder="012-345-6789"
                      onChange={(e) =>
                        setBid1({ ...bid1, phone: e.target.value })
                      }
                      value={bid1.phone}
                      disabled={false}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="twitter" value="Twitter Handle"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="twitter"
                      placeholder="@0xBoredDev"
                      onChange={(e) =>
                        setBid1({ ...bid1, twitter: e.target.value })
                      }
                      value={bid1.twitter}
                      disabled={false}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="telegram" value="Telegram Handle"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="telegram"
                      placeholder="@OxBoredDev"
                      onChange={(e) =>
                        setBid1({ ...bid1, telegram: e.target.value })
                      }
                      value={bid1.telegram}
                      disabled={false}
                    />
                  </div>
                </div>
                {bid1.success ? (
                  <p className="text-green-500 text-center my-2">
                    Thank you for your bid!
                  </p>
                ) : (
                  <p className="text-red-500 text-center my-2">{bid1.error}</p>
                )}
                <Button
                  type="submit"
                  disabled={bid1.success}
                  // onClick={() => setIsProcessing1(true)}
                  isProcessing={isProcessing1}
                  className="flex disabled:disabled:text-slate-500 mt-4 w-full justify-center mb-2"
                >
                  {bid1.success ? "Submitted!" : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 mx-auto bg-black/[.5] rounded-xl shadow-md overflow-hidden self-center h-fit">
          <div className="p-8">
            <p className=" text-lg sm:text-3xl text-white text-center">
              Hand embroidered silk art pieces. Hand threaded by 10 artisans in
              Ghana, Africa. The intricate one month process requires the image
              of choice to be first traced by an artisan, after which the
              different artisans use silk thread to skillfully embroider the
              edges and aspects of the traced image with silk threads. The usage
              of silk threads causes the image to have a shimmering effect in
              different light angles due to the triangular prism like structure
              of the silk threads fibers. Funds from these artworks go to
              empower local artisans and also to help reduce harm to special
              needs children in Africa.
            </p>
          </div>
        </div>

        <div className="order-2 md:order-3 mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-2xl sm:max-w-md">
          <img
            className="h-496 w-full object-cover"
            src="/sardine2.jpg"
            alt="lisbon sardine 2"
          />
          <div className="p-2">
            <div className="tracking-wide text-2xl leading-tight font-semibold text-black text-center mb-2">
              The Lisbon Sardines 2
            </div>
            <p className="text-black text-center text-xs mb-2">
              <span className="font-bold">Start:</span> {formatDate(startTime)}
            </p>
            <p className="text-black text-center text-xs mb-4">
              <span className="font-bold">End:</span> {formatDate(endTime)}
            </p>

            <p className="text-black text-center text-lg font-semibold">
              Current Price: ${auction2.price}
            </p>

            <div className="flex gap-2 pt-4 justify-center">
              <form id="auction2" onSubmit={handleSubmit2}>
                <div className="flex space-x-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="bid" value="Bid Amount *"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="bid"
                      required
                      placeholder={`min $${(auction2.price + 100).toString()}`}
                      onChange={(e) => handleBid2Change(e.target.value)}
                      value={bid2.bid}
                      disabled={false}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="fullname" value="Name*"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="fullname"
                      required
                      placeholder="Satoshi Nakamoto"
                      onChange={(e) =>
                        setBid2({ ...bid2, name: e.target.value })
                      }
                      value={bid2.name}
                      disabled={false}
                    />
                  </div>
                </div>
                <p className="text-slate-500 text-center text-xs m-2">
                  1 field below is required for contact
                </p>
                <div className="flex space-x-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="email"
                      id="email"
                      placeholder="satoshi@email.com"
                      onChange={(e) =>
                        setBid2({ ...bid2, email: e.target.value })
                      }
                      value={bid2.email}
                      disabled={false}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone Number"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="phone"
                      placeholder="012-345-6789"
                      onChange={(e) =>
                        setBid2({ ...bid2, phone: e.target.value })
                      }
                      value={bid2.phone}
                      disabled={false}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="twitter" value="Twitter Handle"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="twitter"
                      placeholder="@0xBoredDev"
                      onChange={(e) =>
                        setBid2({ ...bid2, twitter: e.target.value })
                      }
                      value={bid2.twitter}
                      disabled={false}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="telegram" value="Telegram Handle"></Label>
                    </div>
                    <TextInput
                      className="w-full mb-2"
                      type="text"
                      id="telegram"
                      placeholder="@OxBoredDev"
                      onChange={(e) =>
                        setBid2({ ...bid2, telegram: e.target.value })
                      }
                      value={bid2.telegram}
                      disabled={false}
                    />
                  </div>
                </div>
                {bid2.success ? (
                  <p className="text-green-500 text-center my-2">
                    Thank you for your bid!
                  </p>
                ) : (
                  <p className="text-red-500 text-center my-2">{bid2.error}</p>
                )}
                <Button
                  type="submit"
                  disabled={bid2.success}
                  onClick={() => setIsProcessing2(true)}
                  isProcessing={isProcessing2}
                  className="flex disabled:disabled:text-slate-500 mt-4 w-full justify-center mb-2"
                >
                  {bid2.success ? "Submitted!" : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row max-w-sm max-h-sm mb-10">
        <img src="/fif_logo.png" alt="Logo" />
      </div>

      <Footer container className="bg-black justify-center md:justify-center">
        <div className="container flex flex-col align-items-center text-center sm:text-center">
          <Footer.Copyright
            href="https://x.com/0xBoredDev"
            by="Bored Labs, LLC."
            year={2024}
          />
          <Footer.LinkGroup className="justify-center mt-4">
            <Footer.Link href="https://x.com/ByAutistic" target="_blank">
              <BsTwitterX size={"20px"} className="mx-auto" />
              <span>&nbsp;ByAutistic</span>
            </Footer.Link>
            <Footer.Link href="https://x.com/FuckItProd" target="_blank">
              <BsTwitterX size={"20px"} className="mx-auto" />
              <span>&nbsp;FuckItProd</span>
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
      </Footer>
    </main>
  );
};

export default Homepage;
