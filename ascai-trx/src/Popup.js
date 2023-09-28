import React from "react";
import { useState } from "react";
import "./popup.css";

function Popup(props) {
  const closePopup = () => {
    const popup = (document.getElementById("popUp").style.display = "none");
  };

  return (
    <div id="popUp">
      <div class="popup-overlay">
        <div class="popup-container">
          <div class="popup-card">
            <h2 className="popup-head">Are you sure you want to proceed?</h2>
            <div style={{ margin: "50px auto" }}>
              <div className="data-flex">
                <div className="data-lable">NLPGeneratedDescription: </div>
                <div id="popUpData1" className="data-value"></div>
              </div>
              <div className="data-flex">
                <div className="data-lable">InputParameters: </div>
                <div id="popUpData2" className="data-value"></div>
              </div>
              <div className="data-flex">
                <div className="data-lable">SmartContractCode: </div>
                <div id="popUpData3" className="data-value"></div>
              </div>
              <div className="data-flex">
                <div className="data-lable">FunctionName: </div>
                <div id="popUpData4" className="data-value"></div>
              </div>
              <div className="data-flex">
                <div className="data-lable">ContractSafetyScore: </div>
                <div id="popUpData5" className="data-value"></div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button id="approve" onClick={() => props.approve()}>
                Approve
              </button>
              <button id="close-popup" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
