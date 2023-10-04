import LandingPage from "./components/LandingPage";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

function App() {
  const BTTChain = {
    id: 1029,
    name: "BitTorrent Chain Donau",
    network: "BitTorrent Chain Donau",
    iconUrl: "https://testscan.bt.io/static/media/BTT.e13a6c4e.svg",
    iconBackground: "#fff",
    nativeCurrency: {
      decimals: 18,
      name: "BitTorrent Chain Donau",
      symbol: "BTT",
    },
    rpcUrls: {
      default: "https://pre-rpc.bittorrentchain.io/",
    },
    blockExplorers: {
      default: {
        name: "BitTorrent Chain Donau",
        url: "https://testscan.bt.io",
      },
    },
    testnet: true,
  };

  const { chains, publicClient } = configureChains(
    [BTTChain],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: "https://pre-rpc.bittorrentchain.io/" }),
      }),
      alchemyProvider({ apiKey: "O5NYvtwLMNG0LjAXPQEk0YJT2l3UxTAY" }),
      // publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  const [showPopup, setShowPopup] = useState({ show: false, msg: "" });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <LandingPage
                    setShowPopup={setShowPopup}
                    showPopup={showPopup}
                  />
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
