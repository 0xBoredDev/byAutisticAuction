import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "By Autistic Auction",
  description: "By Autistic Auction at Fuck it Friday",
  metadataBase: new URL('https://by-autistic-auction.vercel.app'),
  openGraph: {
    title: 'By Autistic Auction',
    description: 'By Autistic Auction at Fuck it Friday',
    images: '/og.png',
    type: 'article',
    publishedTime: '2024-08-09T00:00:00.000Z',
    authors: ['0xBoredDev'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'By Autistic Auction',
    description: 'By Autistic Auction at Fuck it Friday',
    siteId: '1467726470533754880',
    creator: '@0xboreddev',
    creatorId: '1467726470533754880',
    // images: ['https://localhost:3000/og.png'],
    images: ['https://by-autistic-auction.vercel.app/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
