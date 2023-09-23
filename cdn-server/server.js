const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 3000; // You can change this to your desired port
const axios = require("axios");

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Store received data in an array (for demonstration purposes)

// Route to receive data from your library
app.post("/receive-data", (req, res) => {
  const data = req.body;
  receivedData = data;
  console.log("Received Data:", data);

  const apiKey = "UXHQRSK8A2TFSAZP1SGQD1SGFSPXCRFRDI"; // Replace with your Bttcscan API key
  const contractAddress = receivedData.contractAddress; // Replace with your dynamic address

  const apiUrl = `https://api-testnet.bttcscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`;
  console.log(apiUrl);
  axios
    .get(apiUrl)
    .then((response) => {
      // Handle the API response here
      console.log(response.data.result[0].SourceCode);
      res.status(200).send({
        message: "Data received successfully",
        receivedData: response.data.result[0].SourceCode,
      });
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`CDN server is running on http://localhost:${port}`);
});
