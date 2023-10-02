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
  const cdnEndpoint = "http://localhost:3000/receive-data";

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
        "0x8bda6aC4cdDEbf88f1794120e1D5ab1c33a6A3bc",
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
    const responseDataString5 = "55";

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
        // Construct and send transaction details to your CDN or storage
        const cdnEndpoint = "http://localhost:3000/receive-data";
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
      <div className="loader-container">
        <svg
          width="40"
          height="40"
          viewBox="0 0 135 135"
          xmlns="http://www.w3.org/2000/svg"
          fill="#00ffffe5"
        >
          <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 67 67"
              to="-360 67 67"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 67 67"
              to="360 67 67"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      <Popup approve={approve} />
    </div>
  );
}

export default Ascai;
