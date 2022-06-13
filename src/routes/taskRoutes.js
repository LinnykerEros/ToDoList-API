const Router = require("express");
//tasks
const taskRoutes = Router();
const TaskController = require("../controllers/taskController");
const taskMiddleware = require("../middlewares/taskMiddleware");
//ROTAS GET
taskRoutes.get("/", TaskController.index);

//ROTAS POST

taskRoutes.post("/", TaskController.store);

//ROTAS PUT

taskRoutes.put("/:id", taskMiddleware.validadeId, TaskController.update);

//ROTAS DELETE

taskRoutes.delete("/:id", taskMiddleware.validadeId, TaskController.delete);

module.exports = taskRoutes;
