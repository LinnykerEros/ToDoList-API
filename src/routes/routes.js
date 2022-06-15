const express = require("express");

const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");
const tokenRoutes = require("./tokenRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const routes = express.Router();

routes.use("/tasks", taskRoutes);
routes.use("/users", userRoutes);

//TOKEN ROUTES
routes.use("/token", tokenRoutes);
routes.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = routes;
