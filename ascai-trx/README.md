
# ascai-trx

  

![npm version](https://img.shields.io/npm/v/ascai-trx.svg?style=flat-square)

  

## Overview

  

ascai-trx is a JavaScript library for enhancing the security of smart contract interactions on the Ethereum blockchain. It leverages AI-powered natural language processing (NLP) to provide an extra layer of security by analyzing smart contracts before transaction execution. This analysis helps users make informed decisions about whether to proceed with a contract interaction.

  

## Installation

  

**You can install ascai-trx using npm or yarn:**

  



    npm  install  ascai-trx
    
    ## OR
    
    yarn  add  ascai-trx

## Usage

**To  use  ascai-trx  in  your  project,  follow  these  steps:**

  
**Import  the  Ascai  component:**

    import  Ascai  from  "ascai-trx";

  

**Create  a  state  variable  to  store  your  contract  data:**

    import  {  useState  }  from  "react";

  

    const [data, setData]  =  useState({
    
    contractAddress:  "0x8048ae8cDadA2A466B38679e41b42f613F3912F2",
    
    signer:  "",  //  Set  your  signer
    
    functionName:  "set",  //  The  function  you  want  to  call
    
    inputValue:  "",  //  The  input  value  for  the  function
    
    params:  {
    
    value:  0,  //  Value  in  Wei
    
    gasLimit:  100000,  //  Gas  limit  for  the  transaction
    
    },
    
    contractAbi:  storeMyNumberAbi,  //  Your  contract's ABI
    
    });

**Replace your existing button with the <Ascai> component:**

  

    <Ascai
    
    contractAddress={data.contractAddress}
    
    signer={data.signer}
    
    functionName={data.functionName}
    
    inputValue={data.inputValue}
    
    params={data.params}
    
    contractAbi={data.contractAbi}
    
    buttonName="Analyze and Execute" <!-- The text to display on the button -->
    
    />

  

Now, when the user clicks the "Analyze and Execute" button, a popup will open, showing the AI-powered NLP analysis of the smart contract. Users can review the analysis and decide whether to proceed with the contract interaction.

  

If the user chooses to proceed, the transaction will be executed using the specified contract data and function.

  

You can also handle the result of the transaction using event listeners or other mechanisms as needed.

  

### Example

    Here's  a  complete  example  of  how  to  use  ascai-trx  in  a  React  component:
    
    import  React, { Children, useEffect, useState } from  "react";
    
    import { sendTransactionDetails } from  "ascai-trx";
    
    import  Ascai  from  "ascai-trx";
    
    import  storeMyNumberAbi  from  "./StoreMyNumber.json";
    
    import { ethers } from  "ethers";
    
      
    
    function  ContractInteractionForm() {
    
    const [data, setData] =  useState({
    
    contractAddress:  "0x8048ae8cDadA2A466B38679e41b42f613F3912F2",
    
    signer:  "",
    
    functionName:  "set",
    
    inputValue:  "",
    
    params: {
    
    value:  0,
    
    gasLimit:  100000,
    
    },
    
    contractAbi:  storeMyNumberAbi,
    
    });
    
    const  handleSendTransaction  =  async () => {
    
    try {
    
    if (window.ethereum) {
    
    const  ethereumProvider  =  new  ethers.providers.Web3Provider(
    
    window.ethereum
    
    );
    
    await  window.ethereum.enable();
    
    let  signer  =  ethereumProvider.getSigner();
    
    console.log(signer);
    
    setData({
    
    ...data,
    
    signer:  signer,
    
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
    
      
    
    <Ascai
    
    contractAddress={data.contractAddress}
    
    signer={data.signer}
    
    functionName={data.functionName}
    
    inputValue={data.inputValue}
    
    params={data.params}
    
    contractAbi={data.contractAbi}
    
    buttonName="Execute transaction"
    
    />
    
    </div>
    
    );
    
    }
    
      
    
    export  default  ContractInteractionForm;

  

### Conclusion

Congratulations!  You've successfully integrated and used the ascai-trx library in your project. This added security layer, powered by AI analysis, enhances the safety of your smart contract interactions. If you have any questions or encounter any issues, please refer to the documentation or reach out to our support team.

  

For more information and detailed documentation, visit our [GitHub repository](https://github.com/Zerogravy/Ascai-Tron/tree/main/ascai-trx).

  
  

This example demonstrates how to integrate ascai-trx into a React component. Users can now analyze the smart contract using AI-powered NLP before proceeding with the transaction, adding an extra layer of security to their interactions.

