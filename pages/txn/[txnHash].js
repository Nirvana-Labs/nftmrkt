import React from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import NftImage from "../../components/Web3/NftImage";
import { getEllipsisTxt } from "../../utils/helpers";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
          <div>
            <h1 className="text-3xl font-bold">Transaction Details</h1>

            <Link href={`https://etherscan.io/tx/${txnHash}`}>
              <button className="bg-blue-700 px-3 py-2 shadow-xl hover:shadow-none rounded-lg hover:bg-opacity-70 mb-2 text-sm">
                Etherscan
              </button>
            </Link>
            <br />
            <span className="text-sm break-words">
              Txn Hash: {getEllipsisTxt(txnHash, 18)}
            </span>
          </div>
          {data.map((txn, index) => {
            return (
              <div key={index} className="bg-gray-800 rounded-xl my-4">
                <div className="flex-wrap rounded-lg p-2 bg-opacity-10">
                  <span className="text-sm break-words">
                    Contract Address: {getEllipsisTxt(txn.address, 10)}
                  </span>
                  <div>To: {getEllipsisTxt(txn.to, 6)}</div>
                  <div>From: {getEllipsisTxt(txn.from, 6)}</div>
                </div>

                <div className="bg-slate-900 p-4 my-2 rounded shadow-lg text-gray-300">
                  <div>{txn.name}</div>

                  {txn.type == "ERC721" && <div>Token ID: {txn.value}</div>}

                  <div className="text-sm">
                    Timestamp: {Date(txn.timestamp)}
                  </div>
                  <br />
                  <div>From: {getEllipsisTxt(txn.from, 8)}</div>
                  <div>To: {getEllipsisTxt(txn.to, 8)}</div>
                  <div className="flex-col">
                    <div className=" text-md">{txn.symbol}</div>
                  </div>
                  <div className=" flex justify-between items-end">
                    <div>
                      <div
                        className={classNames(
                          txn.type == "ERC721"
                            ? "text-xxs mt-2 border border-sky-400 w-fit px-1 rounded-md"
                            : "text-xxs mt-2 border border-yellow-400 w-fit px-1 rounded-md"
                        )}
                      >
                        {txn.type}
                      </div>
                      <div className="text-xxs bg-black p-1 mt-2 w-fit rounded">
                        Block #: {txn.block_number}
                      </div>
                    </div>
                    <div>
                      {txn.type == "ERC20" ? (
                        <span className="text-white font-bold text-lg">
                          {txn.value.substring(0, 6)} {txn.symbol}
                        </span>
                      ) : (
                        <span className="text-white font-bold text-lg">
                          Token # {txn.value.substring(0, 6)}
                        </span>
                      )}

                      <div>
                        Gas:{" "}
                        {ethers.utils
                          .formatUnits(
                            String(
                              txn.transaction_gas_used *
                                txn.transaction_gas_price
                            )
                          )
                          .substring(0, 8)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
