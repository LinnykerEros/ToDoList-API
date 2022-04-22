require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const routes = require("./routes");
const connectToDatabase = require("./database");

connectToDatabase();

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port}`);
});
