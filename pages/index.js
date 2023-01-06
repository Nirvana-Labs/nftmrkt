import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import LatestTxns from "../components/Web3/LatestTxns";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ALPHACHARTS</title>
        <meta name="description" content="ALPHACHARTS - ChainQuery Tutorial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Header />
        <div>
          <LatestTxns />
        </div>
      </main>
    </>
  );
}
