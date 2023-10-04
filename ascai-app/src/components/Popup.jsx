import React from "react";
import "../style/popup.css";
import { ethers } from "ethers";
import AscaiAbi from "../artifacts/contracts/Ascai.sol/Ascai.json";

function Popup(props) {
  const proceed = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const subscribeUser = new ethers.Contract(
        "0x8bda6aC4cdDEbf88f1794120e1D5ab1c33a6A3bc",
        AscaiAbi,
        signer
      );

      const tx = await subscribeUser.purchaseSubscription({
        value: 1000,
      });
      const receipt = await tx.wait();
      console.log(receipt);
      if (receipt) props.setShowPopup({ show: false, msg: "", type: "" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="popup-overlay">
      <div class="popup-container">
        <div class="popup-card">
          <h1>{props.showPopup.msg}</h1>
          {props.showPopup.type === "already-subscribed" ? (
            <div>
              <button
                id="close-popup"
                onClick={() =>
                  props.setShowPopup({ show: false, msg: "", type: "" })
                }
              >
                OK
              </button>
            </div>
          ) : (
            <div>
              <button id="close-popup" onClick={proceed}>
                Proceed
              </button>
              <button
                className="details-btn"
                onClick={() =>
                  props.setShowPopup({ show: false, msg: "", type: "" })
                }
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
