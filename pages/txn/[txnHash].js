import React from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import NftImage from "../../components/Web3/NftImage";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TxnDetails() {
  const router = useRouter();
  const { txnHash } = router.query;
  const { data, error } = useSWR(
    `https://api.nirvanalabs.xyz/txn?hash=${txnHash}`,
    fetcher
  );
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  console.log(data);
  return (
    <div>
      <Header />
      <main className="p-5">
        <div className="bg-black bg-opacity-50 p-2 sm:p-10 mx-auto max-w-4xl rounded-xl">
          <h1 className="text-3xl font-bold">Txn Details</h1>
          <div className="bg-slate-400 rounded-lg p-2 bg-opacity-10">
            <span>{data[0].transaction_hash}</span>
          </div>
          {data.map((txn, index) => {
            return (
              <div
                key={index}
                className="bg-slate-900 p-4 my-2 rounded shadow-lg text-gray-300"
              >
                {txn.type == "ERC721" && (
                  <NftImage address={txn.address} token_id={txn.value} />
                )}
                <div>Contract Name: {txn.name}</div>
                <div>Address: {txn.address}</div>
                <div>Value / Token ID: {txn.value}</div>
                <div>Block Number: {txn.block_number}</div>
                <div>Timestamp: {txn.timestamp}</div>
                <br />
                <div>From: {txn.from}</div>
                <div>To: {txn.to}</div>
                <div>Type: {txn.type}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
