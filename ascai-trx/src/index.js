import React, { useEffect, useState } from "react";
// import "./ascai.css";
import { ethers } from "ethers";
import axios from "axios";
import Popup from "./Popup";
import AscaiAbi from "./contracts/Ascai.json";

export let data = {};

export async function sendTransactionDetails(
  contractAddress,
  functionName,
  inputValue,
  params
) {
  // Construct and send transaction details to your CDN or storage
  const cdnEndpoint = "http://ascai-lampros.tech/receive-data";

  //for checking the subscription
  try {
    if (window.ethereum) {
      const ethereumProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      await window.ethereum.enable(); // Request user permission to connect
      let signer = ethereumProvider.getSigner();
      const signerAddress = await signer.getAddress();

      const suscribeUser = new ethers.Contract(
        "0x2275CcbF9cB285D6b085b5eFC80a645eB0756999",
        AscaiAbi,
        signer
      );

      const isSuscribed = await suscribeUser.isSubscriptionActive(
        signerAddress
      );
      console.log(isSuscribed);

      if (isSuscribed) {
        const transactionDetails = {
          contractAddress,
          functionName,
          inputValue,
          params,
        };

        try {
          // Send the transactionDetails to your CDN
          const response = await sendToCDN(transactionDetails, cdnEndpoint);

          return response;
        } catch (error) {
          console.error("Error sending data to CDN:", error);
          throw error;
        }
      } else {
        alert("You are not suscribed to ASCAI");
      }
    }
  } catch (err) {
    console.log(err);
  }
}

//for sending data to server.js file
export async function sendToCDN(data, cdnEndpoint) {
  const headers = {
    "Content-Type": "application/json", // Set the content type if needed
    // Add other headers as needed
  };
  try {
    const response = await axios.post(cdnEndpoint, data);
    // const response = {
    //   NLPGeneratedDescription:
    //     "This function allows the sender to transfer 100 ETH from their address (0x5678HIJK9012LMNO) to the recipient's address (0xABCD1234EFGH5678).",
    //   ContractInformation: {
    //     SmartContractCode: "0x1234ABCD5678EFGH",
    //     FunctionName: "transferFunds",
    //     InputParameters:
    //       "senderAddress: 0x5678HIJK9012LMNO, recipientAddress: 0xABCD1234EFGH5678, amount: 100 ETH",
    //   },

    //   ContractSafetyScore: 95,
    // };

    const details = response.data;
    console.log(details);
    const responseDataString1 = details.result;
    const responseDataString2 = details.contractDetails.input;
    const responseDataString3 = JSON.stringify(details.contractDetails.params);
    const responseDataString4 = details.contractDetails.functionName;
    const responseDataString5 = "89";

    // You can handle the response here if needed
    const popup = document.getElementById("popUp");
    const popupdata0 = document.getElementById("popUpData0");
    const popupdata1 = document.getElementById("popUpData1");
    const popupdata2 = document.getElementById("popUpData2");
    const popupdata3 = document.getElementById("popUpData3");
    const popupdata4 = document.getElementById("popUpData4");
    const popupdata5 = document.getElementById("popUpData5");
    if (popup) {
      popup.style.display = "block";
      popupdata0.innerHTML = data.contractAddress;
      popupdata1.innerHTML = responseDataString1;
      popupdata2.innerHTML = responseDataString2;
      popupdata3.innerHTML = responseDataString3;
      popupdata4.innerHTML = responseDataString4;
      popupdata5.innerHTML = responseDataString5;
    }
  } catch (error) {
    console.error("Error sending data to CDN:", error);
    throw error;
  }
}

function Ascai(props) {
  const [loading, setLoading] = useState(false);
  console.log(props);
  const approve = async () => {
    try {
      // setLoading(true);
      if (window.ethereum) {
        const ethereumProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        await window.ethereum.enable(); // Request user permission to connect
        let signer = ethereumProvider.getSigner();
        console.log(props.contractAddress);
        const storeMyNumberContract = new ethers.Contract(
          props.contractAddress,
          props.contractAbi,
          signer
        );

        // Encode function call with the input value
        const encodedData = storeMyNumberContract.interface.encodeFunctionData(
          props.functionName,
          props.inputValue
        );

        // Send the transaction
        const tx = await signer.sendTransaction({
          to: props.contractAddress,
          data: encodedData,
          value: ethers.utils.parseEther(props.params.value.toString()), // Convert to wei if needed
          gasLimit: props.params.gasLimit,
        });

        // Wait for the transaction to be mined
        await tx.wait();

        // Transaction successful
        console.log("Transaction successful!");
      }
      // setLoading(true);
    } catch (error) {
      // Handle errors here
      console.error("Transaction failed:", error);
      // setLoading(true);
    }
  };
  return (
    <div>
      <button
        id="ascai-btn"
        hidden
        onClick={() =>
          sendTransactionDetails(
            props.contractAddress,
            props.functionName,
            props.inputValue,
            props.params
          )
        }
      >
        {props.buttonName}
      </button>

      <Popup approve={approve} />
    </div>
  );
}

export default Ascai;
