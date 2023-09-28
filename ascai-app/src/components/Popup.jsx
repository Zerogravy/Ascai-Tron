import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";

const ContractDetails = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [contractDetails, setContractDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the function to get the smart contract address
    async function fetchSmartContractAddress() {
      // Check if the Metamask extension is available
      if (window.ethereum && window.ethereum.isMetaMask) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request access to the user's accounts
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          // Use the first account as the smart contract address
          if (accounts && accounts.length > 0) {
            setContractAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error requesting accounts:", error);
          setContractAddress("Error retrieving contract address.");
        }
      } else {
        console.error("Metamask extension not detected.");
        setContractAddress("Metamask extension not detected.");
      }
      setLoading(false);
    }
    fetchSmartContractAddress();
  }, []);

  const handleFetch = () => {
    const apiKey = "P5TYFDHU6EUVD81B8317ZFTIQ9VFISF99Q"; // Replace this with your actual API key
    const url =
      "https://api.etherscan.io/api?module=contract&action=getsourcecode&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=FY999IKTUTEH15NEAJIXNKIKU9ZCX48SCD";

    axios
      .get(url)
      .then((response) => {
        const { status, message, result } = response.data;
        if (status === "1") {
          if (result && result.length > 0) {
            setContractDetails(result[0]);
            console.log(result[0]); // Assuming the result is an array, use the first element
          } else {
            console.error("Contract details not found.");
          }
        } else {
          console.error(`Error: ${message}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching contract details:", error);
      });
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Smart Contract Extension Popup</h1>
          {loading ? (
            <p>Connecting to Metamask...</p>
          ) : (
            <>
              {contractAddress && (
                <>
                  <p>Smart Contract Address: {contractAddress}</p>
                  <button onClick={handleFetch}>Fetch Contract Details</button>
                </>
              )}
              {contractDetails && (
                <div>
                  <h3>Contract Details:</h3>
                  <p>
                    <strong>Contract Name:</strong>{" "}
                    {contractDetails.ContractName}
                  </p>
                  <p>
                    <strong>Compiler Version:</strong>{" "}
                    {contractDetails.CompilerVersion}
                  </p>
                  <div>
                    <strong>Source Code:</strong>
                    <pre>{contractDetails.SourceCode}</pre>
                  </div>
                </div>
              )}
            </>
          )}
        </header>
      </div>
    </div>
  );
};

export default ContractDetails;
