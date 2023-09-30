import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../style/main.css";
// import ConnectButtonCustom from "./Connectbuttoncustom";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import AscaiAbi from "../artifacts/contracts/Ascai.sol/Ascai.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";

function Navbar() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const subscribe = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const subscribeUser = new ethers.Contract(
        "0x8bda6aC4cdDEbf88f1794120e1D5ab1c33a6A3bc",
        AscaiAbi,
        signer
      );
      console.log(address);
      // const tx = await subscribeUser.purchaseSubscription({ value: 1000 });
      const isSubscribed = await subscribeUser.isSubscriptionActive(address);
      console.log(isSubscribed);
      if (isSubscribed) {
        const subscriptionValidity =
          await subscribeUser.getSubscriptionValidity();
        const date = new Date(subscriptionValidity * 1000); // Multiply by 1000 to convert from seconds to milliseconds

        // Convert to IST timezone (UTC+05:30)
        const options = {
          timeZone: "Asia/Kolkata",
          hour12: false, // Use 24-hour format
        };

        const istDate = date.toLocaleString("en-US", options);
        alert(`You are already suscribed till ${istDate}`);
      } else {
        var confirmation = window.confirm(
          "This is a one-month plan. If you are subscribing, you will be charged 1000 Btt for one month. Do you want to proceed?"
        );
        if (confirmation) {
          const tx = await subscribeUser.purchaseSubscription({ value: 1000 });
          const receipt = await tx.wait();
          console.log(receipt);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Load the Web3 script
    const web3Script = document.createElement("script");
    web3Script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4-rc.1/web3.min.js";
    web3Script.async = true;
  });
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/">
          {" "}
          <img src={logo} alt="" style={{ width: "200px" }} />
        </Link>

        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            width: "40%",
            justifyContent: "space-evenly",
          }}
        >
          {isConnected ? (
            <button className="extension-btn" onClick={() => subscribe()}>
              subscribe
            </button>
          ) : null}
          <ConnectButton />

          {/* <ConnectButtonCustom /> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
