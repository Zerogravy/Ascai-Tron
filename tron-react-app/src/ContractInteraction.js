import React, { Children, useEffect, useState } from "react";
import { sendTransactionDetails } from "ascai-trx";
import Ascai from "ascai-trx";
import storeMyNumberAbi from "./StoreMyNumber.json";
import { ethers } from "ethers";

function ContractInteractionForm() {
  const [cdnEndpoint, setCdnEndpoint] = useState("");
  const [result, setResult] = useState([]);
  const [showPopup, setPopup] = useState(false);

  const [data, setData] = useState({
    contractAddress: "0x8104257e9670e531325f027bf32fe12df4ca69e3",
    signer: "",
    functionName: "set",
    inputValue: "",
    params: {
      value: 1000000000,
      gasLimit: 100000,
    },
    contractAbi: storeMyNumberAbi,
  });
  const handleSendTransaction = async () => {
    try {
      if (window.ethereum) {
        const ethereumProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        await window.ethereum.enable(); // Request user permission to connect
        let signer = ethereumProvider.getSigner();
        console.log(signer);
        setData({
          ...data,
          signer: signer,
          inputValue: [25],
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const customFunction = () => {
    const btn = document.getElementById("ascai-btn");
    btn.click();
  };
  useEffect(() => {
    handleSendTransaction();
  }, []);
  return (
    <div>
      {/* {result ? result : null} */}
      <button type="submit" onClick={customFunction}>
        Register
      </button>
      <Ascai
        contractAddress={data.contractAddress}
        signer={data.signer}
        functionName={data.functionName}
        inputValue={data.inputValue}
        params={data.params}
        contractAbi={data.contractAbi}
      />
    </div>
  );
}

export default ContractInteractionForm;
