import Head from "next/head";
import Image from "next/image";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
const sdk = new ThirdwebSDK("avalanche-fuji");

import Header from "../components/Header";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Loader from "../components/Loader";

const contract = await sdk.getContract(
  "0xea32fe3246581A1dd36e47b9bb12F07BC089C013",
  "marketplace"
);

export default function Home() {
  const [listings, setListings] = useState(null);
  useMemo(async () => {
    const activeListings = await contract.getActiveListings();
    setListings(activeListings);
  }, []);

  if (!listings) return <Loader />;

  console.log(listings);

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
        <main className="p-2 md:p-6">
          <h3 className="mt-6 mb-2 text-xl font-bold">Active Listings</h3>
          {listings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-sm flex-col p-2 text-black rounded-xl">
              {listings.map((listing, index) => {
                return (
                  <Link key={index} href={`/listings/${listing.id}`}>
                    <div className="bg-slate-50 rounded hover:border cursor-pointer hover:bg-slate-100 flex flex-col items-center justify-center">
                      <Image
                        alt={listing.asset.name}
                        width={300}
                        height={300}
                        src={listing.asset.image}
                      />
                      <div className="mt-2  w-full text-md flex justify-between">
                        <div>{listing.asset?.name}</div>
                        <div>
                          {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                          {listing.buyoutCurrencyValuePerToken.symbol}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </main>
    </>
  );
}
