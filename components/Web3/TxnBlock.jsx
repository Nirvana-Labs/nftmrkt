import React from "react";
import { getEllipsisTxt } from "../../utils/helpers";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TxnBlock({ txn }) {
  return (
    <>
      <Link href={`/txn/${txn.transaction_hash}`}>
        <div
          key={txn.transaction_hash}
          className={classNames(
            txn.type == "ERC721"
              ? "w-full flex justify-between cursor-pointer my-2 h-20 py-1 px-4 bg-slate-800 rounded hover:bg-opacity-50"
              : "w-full flex justify-between cursor-pointer my-2 h-20 py-1 px-4 bg-slate-900 rounded  hover:bg-opacity-50"
          )}
        >
          <div className="flex-col">
            <div className=" text-md">{txn.symbol}</div>
            <div> {getEllipsisTxt(txn.address)}</div>
            <div className="text-xxs mt-2">{txn.type}</div>
          </div>
          <div className=" flex flex-col justify-between items-end">
            {txn.type == "ERC20" ? (
              <div className="flex items-center">
                <div className=" text-white font-bold text-lg">
                  {String(ethers.utils.formatEther(txn.value)).substring(0, 4)}
                </div>
                <Image
                  alt="Ethereum"
                  className="ml-2"
                  src="https://imagedelivery.net/JBpQzOjEg6onPN0wnF1wdA/f5c9e58c-2c17-4096-4f14-80532fbcaa00/public"
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <span className="text-white font-bold text-lg">
                # {txn.value.substring(0, 6)}
              </span>
            )}
            <div>x{txn.count}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
