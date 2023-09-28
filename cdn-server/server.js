const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 3000; // You can change this to your desired port
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// console.log(databaseUrl, apiKey);
// Store received data in an array (for demonstration purposes)

// Route to receive data from your library
app.post("/receive-data", async (req, res) => {
  try {
    const data = req.body;
    receivedData = data;
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

    // Use async/await to make the API call
    const response = await axios.get(apiUrl);

    // Handle the API response here
    console.log("Contract Data:", response.data);
    sourceCode = response.data.result[0].SourceCode;
    contractDetails = {
      input: input,
      params: params,
      functionName: functionName,
      sourceCode: sourceCode,
    };

    // Function call to get the NLP
    let result = await explainSmartContract(contractDetails);
    console.log(result);

    // Send the response
    res.status(200).send({ result });
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
  console.log(details);

  var contractDetails = `
  input: ${details.input},
  params: { value: ${details.params.value}, gasLimit: ${details.params.gasLimit} },
  functionName: '${details.functionName}',
  sourceCode: \`${details.sourceCode}\`
`;

  const messages = [
    {
      role: "system",
      content:
        "Explain what the contract call will do with the functionName, inputs and params called, from the source code to a normal user.",
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
