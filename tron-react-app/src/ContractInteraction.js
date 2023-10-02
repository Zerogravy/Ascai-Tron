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
    contractAddress: "0x8048ae8cDadA2A466B38679e41b42f613F3912F2",
    signer: "",
    functionName: "set",
    inputValue: "",
    params: {
      value: 0,
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
  useEffect(() => {
    handleSendTransaction();
  }, []);
  return (
    <div>
      {/* {result ? result : null} */}

      <Ascai
        contractAddress={data.contractAddress}
        signer={data.signer}
        functionName={data.functionName}
        inputValue={data.inputValue}
        params={data.params}
        contractAbi={data.contractAbi}
        buttonName="hello"
      />
    </div>
  );
}

export default ContractInteractionForm;
