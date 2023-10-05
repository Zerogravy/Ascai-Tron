import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import the cors middleware
const app = express();
const port = 3004; // You can change this to your desired port
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config(); // Load environment variables from a .env file

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.get("/welcome", (req, res) => {
  const welcomeMessage = "Welcome to ASCAI!";

  // Send the welcome message as the response
  res.status(200).send(welcomeMessage);
});

// Route to receive data from your library
app.post("/receive-data", async (req, res) => {
  try {
    const data = req.body;
    let receivedData = data;
    console.log("Received Data:", data);
    const apiKey = process.env.BTTC_API_KEY;

    // All details required to analyze the contract
    const contractAddress = receivedData.contractAddress; // Replace with your dynamic address
    let sourceCode = {};
    const input = receivedData.inputValue;
    const params = receivedData.params;
    const functionName = receivedData.functionName;
    let contractDetails = {};

    const apiUrl = `https://api-testnet.bttcscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`;

    try {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then(async (responseData) => {
          // Handle the successful response here
          console.log("Response Data:", responseData.result[0].SourceCode);
          // console.log("Contract Data:", response.data);
          sourceCode = responseData.result[0].SourceCode;
          contractDetails = {
            input: input,
            params: params,
            functionName: functionName,
            sourceCode: sourceCode,
          };

          // Function call to get the NLP
          let result = await explainSmartContract(contractDetails);
          // let result = "one two ka four four two ka one my name is lakhan";
          console.log(result);

          // Send the response
          res.status(200).send({ result, contractDetails });
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
});

async function explainSmartContract(details) {
  const openAIApiKey = process.env.OPEN_AI_API_KEY;
  const configuration = new Configuration({
    apiKey: openAIApiKey,
  });
  const openai = new OpenAIApi(configuration);

  var contractDetails = `
  inputs: ${details.input},
  params: { value: ${details.params.value}, gasLimit: ${details.params.gasLimit} },
  functionName: '${details.functionName}',
  sourceCode: \`${details.sourceCode}\`
`;

  const messages = [
    {
      role: "system",
      content:
        "Please assess whether the contract call with the 'functionName,' 'inputs,' and 'params' based on the provided source code.describe in simple terms what the contract call will achieve in  around 40 words only",
    },
    { role: "user", content: contractDetails },
  ];
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
      max_tokens: 1024,
    });
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("erros is the ", error);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`CDN server is running on http://localhost:${port}`);
});
