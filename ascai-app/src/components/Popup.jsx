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
        "0x2275CcbF9cB285D6b085b5eFC80a645eB0756999",
        AscaiAbi,
        signer
      );

      const tx = await subscribeUser.purchaseSubscription({
        value: ethers.utils.parseEther("1000"),
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
