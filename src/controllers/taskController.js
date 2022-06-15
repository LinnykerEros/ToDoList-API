const { v4: uuid } = require("uuid");

const Task = require("../models/task");

module.exports = {
  async index(request, response) {
    try {
      const tasks = await Task.find();
      return response.status(200).json({ tasks });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response) {
    const { task } = request.body;
    if (!task) {
      return response.status(400).json({ error: "Missing task" });
    }

    const newTask = new Task({
      _id: uuid(),
      task,
    });
    try {
      await newTask.save();
      return response.status(201).json({ message: "Task add succesfully" });
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { task } = request.body;
    if (!task) {
      return response
        .status(400)
        .json({ error: "Your must inform a new Task!" });
    }
    //acesso a task, o que ela tem e atualizo com a que vem do body.
    if (task) {
      response.task.task = task;
    }

    try {
      await response.task.save();
      return response
        .status(200)
        .json({ message: "Task updated successfully!" });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      await response.task.remove();
      return response.status(200).json({ message: "Task deleted succesfully" });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },
};
