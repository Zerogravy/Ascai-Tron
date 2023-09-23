import React from "react";
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
            <h2>Are you sure you want to proceed?</h2>
            <p id="popUpData"></p>
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
  );
}

export default Popup;
