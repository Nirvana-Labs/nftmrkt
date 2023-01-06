import React from "react";
import useSWR from "swr";
import { getEllipsisTxt } from "../../utils/helpers";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LatestTxns() {
  const { data, error } = useSWR(
    "https://api.nirvanalabs.xyz/txns/latest",
    fetcher
  );
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div className="flex text-sm flex-col bg-black opacity-70 m-5 p-5 rounded-lg">
      <h2 className="text-xl font-fira font-semibold mb-2">Latest ETH Txns</h2>
      {data.map((txn) => {
        return (
          <div
            key={txn.transaction_hash}
            className="w-full flex justify-start my-0.5 py-1 px-4 bg-slate-900 rounded"
          >
            <div className="flex-col">
              <div className=" text-md">{txn.name}</div>
              <div> {getEllipsisTxt(txn.address)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
