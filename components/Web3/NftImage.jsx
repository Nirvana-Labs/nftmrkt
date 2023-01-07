import Image from "next/image";
import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function NftImage({ address, token_id }) {
  const addr = address;
  const t_id = token_id;
  const { data, error } = useSWR(
    `https://api.nirvanalabs.xyz/nft/metadata?address=${addr}&token_id=${t_id}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  console.log(data);
  const ipfsUrl = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
  return (
    <div>
      <Image
        src={ipfsUrl}
        alt={data.image || "nft image"}
        height={50}
        width={50}
      />
    </div>
  );
}
