const Router = require("express");
//tasks
const taskRoutes = Router();
const TaskController = require("../controllers/taskController");
const taskMiddleware = require("../middlewares/taskMiddleware");
//ROTAS GET
taskRoutes.get("/", TaskController.index);

//ROTAS POST

taskRoutes.post("/create", TaskController.store);

//ROTAS PUT

taskRoutes.put("/update/:id", taskMiddleware.validadeId, TaskController.update);

//ROTAS DELETE

taskRoutes.delete(
  "/delete/:id",
  taskMiddleware.validadeId,
  TaskController.delete
);

module.exports = taskRoutes;
