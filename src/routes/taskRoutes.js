const express = require("express");

//tasks
const TaskController = require("./controllers/taskController");
const taskMiddleware = require("./middlewares/taskMiddleware");

const routes = express.Router();

//ROTAS GET
routes.get("/tasks", TaskController.index);

//ROTAS POST

routes.post("/tarefas", TaskController.store);

//ROTAS PUT

routes.put("/tarefas/:id", taskMiddleware.validadeId, TaskController.update);

//ROTAS DELETE

routes.delete("/tarefas/:id", taskMiddleware.validadeId, TaskController.delete);

module.exports = routes;
