import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

import Header from "../components/Header";
import LatestTxns from "../components/Web3/LatestTxns";
import LatestMints from "../components/Web3/LatestMints";

export default function Home() {
  return (
    <>
      <Head>
        <title>MRKT</title>
        <meta name="description" content="MRKT - NFT Marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 text-sm flex-col bg-black bg-opacity-60 m-5 p-5 rounded-xl"></div>
      </main>
    </>
  );
}
