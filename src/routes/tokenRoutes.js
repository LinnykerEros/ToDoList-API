const Router = require("express");

const tokenRoutes = Router();
const TokenController = require("../controllers/tokenController/tokenController");

//POST
tokenRoutes.post("/", TokenController.handle);

module.exports = tokenRoutes;
