import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Image from "next/image";
import Loader from "../../components/Loader";

const sdk = new ThirdwebSDK("avalanche-fuji");
const contract = await sdk.getContract(
  "0xea32fe3246581A1dd36e47b9bb12F07BC089C013",
  "marketplace"
);

const Listing = () => {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);
  useMemo(async () => {
    if (!id) return;
    const data = await contract.getListing(id);
    setListing(data);
  }, [id]);

  if (!listing) return <Loader />;
  console.log(listing);
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
          <div className="flex w-full justify-between px-4">
            <h3 className="mt-6 mb-2 text-xl font-bold">
              {listing.asset.name}
            </h3>
            <h3 className="mt-6 mb-2 ">#{listing.asset.id}</h3>
          </div>
          <div className=" text-sm md:flex flex-col p-2 text-black rounded-xl">
            <Image
              alt={listing.asset.name}
              width={600}
              height={600}
              src={listing.asset.image}
            />
            <div className="mt-2 w-full text-md flex justify-between">
              <div>
                {listing.buyoutCurrencyValuePerToken.displayValue}{" "}
                {listing.buyoutCurrencyValuePerToken.symbol}
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await contract.buyoutListing(id, 1);
                }}
                className="bg-blue-600 text-white p-3 rounded-lg shadow-lg"
              >
                BUY LISTING
              </button>
            </div>
          </div>
        </main>
      </main>
    </>
  );
};

export default Listing;
