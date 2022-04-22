const { v4: uuid } = require("uuid");

const Tarefa = require("../models/tarefa");

module.exports = {
  async index(request, response) {
    try {
      const tarefas = await Tarefa.find();
      return response.status(200).json({ tarefas });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response) {
    const { tarefa } = request.body;
    if (!tarefa) {
      return response.status(400).json({ error: "Missing task" });
    }

    const novaTarefa = new Tarefa({
      _id: uuid(),
      tarefa,
    });
    try {
      await novaTarefa.save();
      return response.status(201).json({ message: "Task add succesfully" });
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { tarefa } = request.body;
    if (!tarefa) {
      return response
        .status(400)
        .json({ error: "Your must inform a new Task" });
    }
    //normal, confude mesmo, mas é pq o nome do meu obj é tarefa kkkk
    if (tarefa) {
      response.tarefa.tarefa = tarefa;
    }

    try {
      await response.tarefa.save();
      return response
        .status(200)
        .json({ message: "Task updated successfully" });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      await response.tarefa.remove();
      return response.status(200).json({ message: "Task deleted succesfully" });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },
};
