const express = require("express");
const connectDb = require("./config/dbconnect");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Import the cors middleware

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Use the cors middleware to enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res
    .status(201)
    .json(`Hey There ! 😊😊.This is a HomePage and also a default Route.❤️`);
});
app.use(express.json());

app.use('/api',require('./routes'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
