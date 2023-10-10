import React from "react";
import "../style/popup.css";

function InstructionPopup(props) {
  return (
    <div class="popup-overlay">
      <div class="popup-container">
        <div class="test-instructions" style={{ fontSize: "20px" }}>
          <strong>Instructions:</strong>
          <br></br>

          <strong>Step 1: Purchase the Plan</strong>

          <p>
            To access the project's features and benefits, please follow these
            steps:
          </p>

          <li>Click on the subscribe button at the top right corner.</li>

          <br></br>
          <strong>Step 2: Test the Plan</strong>
          <p>
            After purchasing the plan, you can test its features and
            functionality by visiting our testing site. Follow these steps:
          </p>

          <li>
            Register yourself and explore the integrated package features by
            visiting the following link:
            <a href="https://ascai-tron-t2he.vercel.app/" target="_blank">
              Testing Site
            </a>
          </li>
          <li>Follow the registration process on the testing site.</li>
          {/* <li>
            Alternatively, you can also test it on this site with a simple
            function call:
            <a href="https://ascai-tron-zcng.vercel.app/" target="_blank">
              Test Site
            </a>
          </li> */}
        </div>
        <br></br>
        <button
          className="details-btn"
          onClick={() => props.setInstructions(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default InstructionPopup;
