import React from "react";
import "./App.css";
import Popup from "./components/Popup";
import getContractAddress from "./components/getContractAdderss";

function App() {
  return (
    <div className="App">
      <Popup />
      <getContractAddress />
    </div>
  );
}

export default App;
