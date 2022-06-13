const express = require("express");

const taskRoutes = require("./taskRoutes");
const routes = express.Router();

routes.use("/task", taskRoutes);

module.exports = routes;
