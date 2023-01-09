import React from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import NftImage from "../../components/Web3/NftImage";
import { getEllipsisTxt } from "../../utils/helpers";

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
          <h1 className="text-3xl font-bold">Transaction Details</h1>
          {data.map((txn, index) => {
            return (
              <div key={index}>
                <div className="bg-slate-400 flex-wrap rounded-lg p-2 bg-opacity-10">
                  <span className="text-sm break-words">
                    Txn Hash: {getEllipsisTxt(data[0].transaction_hash, 18)}
                  </span>
                  <br />
                  <span className="text-sm break-words">
                    Contract Address: {getEllipsisTxt(txn.address, 10)}
                  </span>
                </div>

                <div className="bg-slate-900 p-4 my-2 rounded shadow-lg text-gray-300">
                  <div>Contract Name: {txn.name}</div>

                  {txn.type == "ERC721" && <div>Token ID: {txn.value}</div>}
                  <div>Block Number: {txn.block_number}</div>
                  <div>Timestamp: {Date(txn.timestamp)}</div>
                  <br />
                  <div>From: {getEllipsisTxt(txn.from, 8)}</div>
                  <div>To: {getEllipsisTxt(txn.to, 8)}</div>
                  <div>Type: {txn.type}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
