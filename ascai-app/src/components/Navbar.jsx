import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../style/main.css";
// import ConnectButtonCustom from "./Connectbuttoncustom";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import AscaiAbi from "../artifacts/contracts/Ascai.sol/Ascai.json";

function Navbar() {
  const navigate = useNavigate();

  const suscribe = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const suscribeUser = new ethers.Contract(
        "0x8bda6aC4cdDEbf88f1794120e1D5ab1c33a6A3bc",
        AscaiAbi,
        signer
      );

      const isSuscribed = await suscribeUser.isSubscriptionActive(
        signerAddress
      );

      if (isSuscribed) {
        const subscriptionValidity =
          await suscribeUser.getSubscriptionValidity();
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
          "This is a one-month plan. If you are subscribing, you will be able charged 1000 Bttc for one month. Do you want to proceed?"
        );
        if (confirmation) {
          const tx = await suscribeUser.purchaseSubscription({ value: 1000 });
          const receipt = await tx.wait();
          console.log(receipt);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <button className="extension-btn" onClick={() => suscribe()}>
            Suscribe
          </button>

          {/* <ConnectButtonCustom /> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
