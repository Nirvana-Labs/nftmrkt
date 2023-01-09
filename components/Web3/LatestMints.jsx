import React from "react";
import useSWR from "swr";

import TxnBlock from "./TxnBlock";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LatestTxns() {
  const { data, error } = useSWR(
    "https://api.nirvanalabs.xyz/txns/latest/mints?size=10",
    fetcher
  );
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <div className="m-2">
      <h2 className="text-xl font-fira font-semibold mb-2">
        🍃 Recently Minted
      </h2>
      {data.map((txn, index) => {
        return <TxnBlock txn={txn} key={index} />;
      })}
    </div>
  );
}
