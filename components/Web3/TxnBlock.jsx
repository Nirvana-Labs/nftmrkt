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
          className="w-full flex justify-between cursor-pointer my-2 py-1 px-4 bg-slate-900 rounded hover:bg-opacity-50"
        >
          <div className="flex-col">
            <div className=" text-md">{txn.symbol}</div>
            <div>To: {getEllipsisTxt(txn.to, 4)}</div>
            <div>From: {getEllipsisTxt(txn.from, 4)}</div>
            <div
              className={classNames(
                txn.type == "ERC721"
                  ? "text-xxs mt-2 border border-sky-400 w-fit px-1 rounded-md"
                  : "text-xxs mt-2 border border-yellow-400 w-fit px-1 rounded-md"
              )}
            >
              {txn.type}
            </div>
            <div className="text-xxs bg-black p-1 mt-2">
              Block #: {txn.block_number}
            </div>
          </div>
          <div className=" flex flex-col justify-between items-end">
            {txn.type == "ERC20" ? (
              <span className="text-slate-200 font-bold">
                {txn.value.substring(0, 6)} {txn.symbol}
              </span>
            ) : (
              <span className="text-slate-200 font-bold">
                ID # {txn.value.substring(0, 6)}
              </span>
            )}

            <div>x{txn.count}</div>
            {/* <div>
              Gas:{" "}
              {ethers.utils
                .formatUnits(
                  String(txn.transaction_gas_used * txn.transaction_gas_price)
                )
                .substring(0, 8)}
            </div> */}
          </div>
        </div>
      </Link>
    </>
  );
}
