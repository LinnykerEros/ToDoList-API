require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

var cors = require("cors");

const routes = require("./routes/routes");
const connectToDatabase = require("./database");

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend started at http://localhost:5000`);
});
