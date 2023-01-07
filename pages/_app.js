import "../styles/globals.css";
import useSWR, { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
