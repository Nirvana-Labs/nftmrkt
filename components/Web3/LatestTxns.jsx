import React from "react";
import useSWR from "swr";
import { getEllipsisTxt } from "../../utils/helpers";
import { ethers } from "ethers";

const fetcher = (url) => fetch(url).then((res) => res.json());

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LatestTxns() {
  const { data, error } = useSWR(
    "https://api.nirvanalabs.xyz/txns/latest?size=100",
    fetcher
  );
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div className="flex text-sm flex-col bg-black opacity-60 m-5 p-5 rounded-xl">
      <h2 className="text-xl font-fira font-semibold mb-2">Latest ETH Txns</h2>
      {data.map((txn) => {
        return (
          <div
            key={txn.transaction_hash}
            className={classNames(
              txn.type == "ERC721"
                ? "w-full flex justify-between cursor-pointer my-1 py-1 px-4 bg-slate-900 rounded"
                : "w-full flex justify-between cursor-pointer my-1 py-1 px-4 bg-slate-800 rounded"
            )}
          >
            <div className="flex-col">
              <div className=" text-md">{txn.name}</div>
              <div> {getEllipsisTxt(txn.address)}</div>
              <div className="text-xs mt-2">{txn.type}</div>
            </div>
            <div>
              {txn.type == "ERC20" ? (
                <span>
                  {" "}
                  {String(ethers.utils.formatEther(txn.value)).substring(
                    0,
                    4
                  )}{" "}
                  ETH
                </span>
              ) : (
                <span># {txn.value}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
