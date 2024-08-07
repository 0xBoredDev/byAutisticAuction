"use client";

import React, { useRef, useEffect, useState } from "react";
import { TextInput, Label, Button, Footer } from "flowbite-react";
import { BsTwitterX } from "react-icons/bs";

interface Sardine {
  item: number;
  currentPrice: number;
  bid: string;
  name: string;
  email: string;
  phone: string;
  twitter: string;
  telegram: string;
  error: string;
  success: boolean;
}

const Homepage = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [sardine1, setSardine1] = useState<Sardine>(createSardine(1));
  const [sardine2, setSardine2] = useState<Sardine>(createSardine(2));
  const [currentPrice1, setCurrentPrice1] = useState(1000);
  const [bid1, setBid1] = useState("");
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [twitter1, setTwitter1] = useState("");
  const [telegram1, setTelegram1] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  function createSardine(item: number) {
    let newSardine: Sardine = {
      item: item,
      currentPrice: 1000,
      bid: "",
      name: "",
      email: "",
      phone: "",
      twitter: "",
      telegram: "",
      error: "",
      success: false,
    };

    return newSardine;
  }
  console.log(sardine1);
  // function isElementOnScreen(id: string) {
  //   const element = document.getElementById(id);
  //   if (!element) return false;
  //   const bounds = element.getBoundingClientRect();
  //   return bounds.top < window.innerHeight && bounds.bottom > 100;
  // }

  // useEffect(() => {
  //   let minBidPrice = currentPrice1 + 100;
  //   setBid1(minBidPrice.toString());
  // }, [currentPrice1]);

  const handleBid1Change = (input: string) => {
    let numberFormat = Number(input);
    const final = Math.trunc(numberFormat);
    setSardine1({ ...sardine1, bid: final.toString() });
  };

  const handleBid2Change = (input: string) => {
    let numberFormat = Number(input);
    const final = Math.trunc(numberFormat);
    setSardine2({ ...sardine2, bid: final.toString() });
  };

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(sardine1);

    if (
      sardine1.email == "" &&
      sardine1.phone == "" &&
      sardine1.twitter == "" &&
      sardine1.telegram == ""
    ) {
      setSardine1({
        ...sardine1,
        error: "Please enter one of the contact fields",
      });
      return;
    }

    const curBid = Number(sardine1.bid);
    const requiredBid = sardine1.currentPrice + 100;

    if (curBid < requiredBid) {
      setSardine1({
        ...sardine1,
        error: `Bid must be atleast ${requiredBid}`,
      });
      return;
    }

    setSardine1({ ...sardine1, success: true, error: "" });

    const res = await fetch("/api/submit-bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sardine1),
    });

    if (res.ok) {
      setSardine1({ ...sardine1, success: true, error: "" });
    } else {
      setSardine1({
        ...sardine1,
        error: "Error placing bid",
      });
    }
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(sardine2);

    if (
      sardine2.email == "" &&
      sardine2.phone == "" &&
      sardine2.twitter == "" &&
      sardine2.telegram == ""
    ) {
      setSardine2({
        ...sardine2,
        error: "Please enter one of the contact fields",
      });
      return;
    }

    const curBid = Number(sardine2.bid);
    const requiredBid = sardine2.currentPrice + 100;

    if (curBid < requiredBid) {
      setSardine2({
        ...sardine2,
        error: `Bid must be atleast ${requiredBid}`,
      });
      return;
    }

    setSardine2({ ...sardine2, success: true, error: "" });

    const res = await fetch("/api/submit-bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sardine2),
    });

    if (res.ok) {
      setSardine2({ ...sardine2, success: true, error: "" });
    } else {
      setSardine2({
        ...sardine2,
        error: "Error placing bid",
      });
    }
  };

  function validateForm(sardine: Sardine) {

  }

  return (
    <main className="flex bg-[url('/bg.png')] bg-no-repeat bg-cover min-h-full h-full flex-col items-center justify-between">
      <div className="flex flex-row max-w-xl max-h-xl">
        <img src="/byautistic_logo.png" alt="Logo" />
      </div>
      <div className="flex flex-row max-w-xl max-h-xl mb-6">
        <img src="/autistic.png" alt="Logo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 mb-20">
        <div className="order-2 md:order-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-md">
          <img
            className="h-396 w-full object-cover"
            src="/sardine1.jpg"
            alt="lisbon sardine 1"
          />
          <div className="p-2">
            <div className="tracking-wide text-lg leading-tight font-medium text-black text-center mb-2">
              The Lisbon Sardines 1
            </div>
            <div className="text-black text-center">
              <p>Current Price: ${sardine1.currentPrice}</p>
            </div>
            <div className="flex gap-2 pt-4 justify-center">
              <form onSubmit={handleSubmit1}>
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
                      placeholder={`min $${(
                        sardine1.currentPrice + 100
                      ).toString()}`}
                      onChange={(e) => handleBid1Change(e.target.value)}
                      value={sardine1.bid}
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
                        setSardine1({ ...sardine1, name: e.target.value })
                      }
                      value={sardine1.name}
                      disabled={false}
                    />
                  </div>
                </div>
                <p className="text-slate-500 text-center m-2">
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
                        setSardine1({ ...sardine1, email: e.target.value })
                      }
                      value={sardine1.email}
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
                        setSardine1({ ...sardine1, phone: e.target.value })
                      }
                      value={sardine1.phone}
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
                        setSardine1({ ...sardine1, twitter: e.target.value })
                      }
                      value={sardine1.twitter}
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
                        setSardine1({ ...sardine1, telegram: e.target.value })
                      }
                      value={sardine1.telegram}
                      disabled={false}
                    />
                  </div>
                </div>
                {sardine1.success ? (
                  <p className="text-green-500 text-center my-2">
                    Thank you for your bid!
                  </p>
                ) : (
                  <p className="text-red-500 text-center my-2">
                    {sardine1.error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={sardine1.success}
                  className="flex disabled:disabled:text-slate-500 mt-4 w-full justify-center"
                >
                  {sardine1.success ? "Submitted!" : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 mx-auto bg-black/[.5] rounded-xl shadow-md overflow-hidden self-center h-fit">
          <div className="p-8">
            <p className="text-3xl text-white text-center">
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

        <div className="order-2 md:order-3 mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-md">
          <img
            className="h-496 w-full object-cover"
            src="/sardine2.jpg"
            alt="lisbon sardine 2"
          />
          <div className="p-2">
            <div className="tracking-wide text-lg leading-tight font-medium text-black text-center mb-2">
              The Lisbon Sardines 1
            </div>
            <div className="text-black text-center">
              <p>Current Price: ${sardine2.currentPrice}</p>
            </div>
            <div className="flex gap-2 pt-4 justify-center">
              <form onSubmit={handleSubmit2}>
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
                      placeholder={`min $${(
                        sardine2.currentPrice + 100
                      ).toString()}`}
                      onChange={(e) => handleBid2Change(e.target.value)}
                      value={sardine2.bid}
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
                        setSardine2({ ...sardine2, name: e.target.value })
                      }
                      value={sardine2.name}
                      disabled={false}
                    />
                  </div>
                </div>
                <p className="text-slate-500 text-center m-2">
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
                        setSardine2({ ...sardine2, email: e.target.value })
                      }
                      value={sardine2.email}
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
                        setSardine2({ ...sardine2, phone: e.target.value })
                      }
                      value={sardine2.phone}
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
                        setSardine2({ ...sardine2, twitter: e.target.value })
                      }
                      value={sardine2.twitter}
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
                        setSardine2({ ...sardine2, telegram: e.target.value })
                      }
                      value={sardine2.telegram}
                      disabled={false}
                    />
                  </div>
                </div>
                {sardine2.success ? (
                  <p className="text-green-500 text-center my-2">
                    Thank you for your bid!
                  </p>
                ) : (
                  <p className="text-red-500 text-center my-2">
                    {sardine2.error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={sardine2.success}
                  className="flex disabled:disabled:text-slate-500 mt-4 w-full justify-center"
                >
                  {sardine2.success ? "Submitted!" : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row max-w-sm max-h-sm mb-10">
        <img src="/fif_logo.png" alt="Logo" />
      </div>

      <Footer container className="bg-black">
        <div className="container flex flex-col align-items-center">
          <Footer.Copyright href="https://x.com/0xBoredDev" by="Bored Labs, LLC." year={2024} />
          <Footer.LinkGroup className="justify-center mt-4">
            <Footer.Link href="https://x.com/ByAutistic" target="_blank">
              <BsTwitterX size={"20px"} className="mx-auto" /> ByAutistic
            </Footer.Link>
            <Footer.Link href="https://x.com/FuckItProd" target="_blank">
              <BsTwitterX size={"20px"} className="mx-auto" /> FuckItProd
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
      </Footer>
    </main>
  );
};

export default Homepage;
