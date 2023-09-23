import React, { useEffect, useState } from "react";
// import "./ascai.css";
import { ethers } from "ethers";
import axios from "axios";
import Popup from "./Popup";

export let data = {};

export async function sendTransactionDetails(
  contractAddress,
  signer,
  functionName,
  inputValue,
  params,
  contractAbi
) {
  console.log(signer);
  // Construct and send transaction details to your CDN or storage
  const cdnEndpoint = "http://localhost:3000/receive-data";

  // const encodedData = storeMyNumberContract.interface.encodeFunctionData(
  //   functionName,
  //   params
  // );
  // console.log("first");
  // // Send the transaction
  // const tx = await signer.sendTransaction({
  //   to: contractAddress,
  //   data: encodedData,
  //   value: 0, // Set this to 0 if it's not a payable function
  // });

  // // Wait for the transaction to be mined
  // await tx.wait();

  // // Transaction successful
  // console.log("Transaction successful!");

  // Use ethers to decode the encoded function

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
}

//for sending data to server.js file
export async function sendToCDN(data, cdnEndpoint) {
  const headers = {
    "Content-Type": "application/json", // Set the content type if needed
    // Add other headers as needed
  };
  try {
    const response = await axios.post(cdnEndpoint, data);
    const responseDataString = JSON.stringify(response.data);
    // You can handle the response here if needed
    const popup = document.getElementById("popUp");
    const popupdata = document.getElementById("popUpData");
    if (popup) {
      popup.style.display = "block";
      popupdata.innerHTML = responseDataString;
    }
    // return response.data;
    // Ascai();
  } catch (error) {
    console.error("Error sending data to CDN:", error);
    throw error;
  }
}

function Ascai(props) {
  console.log(props);
  const approve = async () => {
    try {
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
    } catch (error) {
      // Handle errors here
      console.error("Transaction failed:", error);
    }
  };
  return (
    <div>
      <button
        onClick={() =>
          sendTransactionDetails(
            props.contractAddress,
            props.signer,
            props.functionName,
            props.inputValue,
            props.params,
            props.contractAbi
          )
        }
      >
        Call
      </button>
      <Popup approve={approve} />
    </div>
  );
}

export default Ascai;
