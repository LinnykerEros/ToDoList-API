const express = require("express");

//tarefas
const TarefaController = require("./controllers/tarefaController");
const tarefaMiddleware = require("./middlewares/tarefaMiddleware");

const routes = express.Router();

//ROTAS GET

routes.get("/tarefas", TarefaController.index);

//ROTAS POST

routes.post("/tarefas", TarefaController.store);

//ROTAS PUT

routes.put(
  "/tarefas/:id",
  tarefaMiddleware.validadeId,
  TarefaController.update
);

//ROTAS DELETE

routes.delete(
  "/tarefas/:id",
  tarefaMiddleware.validadeId,
  TarefaController.delete
);

module.exports = routes;
