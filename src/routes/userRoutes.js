const Router = require("express");
const userRoutes = Router();
const UserController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const loginRequired = require("../middlewares/loginRequired");

//POST
userRoutes.post("/create", UserController.store);

//GET
userRoutes.get("/", UserController.index);
userRoutes.get("/:id", userMiddleware.validadeId, UserController.findById);
//UPDATE
userRoutes.put(
  "/:id",
  userMiddleware.validadeId,
  loginRequired.loginRequired,
  UserController.update
);

//DELETE
userRoutes.delete("/:id", userMiddleware.validadeId, UserController.delete);

module.exports = userRoutes;
