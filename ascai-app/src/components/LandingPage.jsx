import React from "react";
import start from "../assets/start.png";
import home from "../assets/home.png";
import "../style/main.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="main-div-landing">
      <Navbar />
      <div className="landing-flex">
        <div className="home-left-section">
          <h1 className="home-title">Contract</h1>
          <h1 className="home-title">
            Analysis - <span style={{ color: "white" }}>AI</span>
          </h1>
          <p className=" home-desc">
            "A Npm Library to Unravel the Secrets of Smart Contract Functions
            and Enhance Transparency in Blockchain Interactions"
          </p>

          <div
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="https://www.npmjs.com/package/ascai-trx" target="_blank">
              {" "}
              <img src={start} className="start-btn-flex"></img>
            </Link>

            <div
              style={{
                color: "white",
                padding: "0px 30px",
                fontSize: "1.1rem",
                fontFamily: "Fredoka-SemiBold",
                letterSpacing: "2px",
              }}
            >
              Install Npm Package
            </div>
          </div>
        </div>
        <div className="hero-right">
          <img className="hero-right-bg1" src={home} alt="backgroundimage" />
        </div>
      </div>

      <footer>
        <div className="footer-flex">
          <div style={{ color: "#deff02", fontSize: "15px" }}>
            © 2023 ASCAI. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
