const { validate: isUuid } = require("uuid");

const Task = require("../models/task");

module.exports = {
  async validadeId(request, response, next) {
    const { id } = request.params;
    if (!isUuid(id)) {
      return response.status(400).json({ error: "Invalid id" });
    }

    try {
      const task = await Task.findById(id);
      response.task = task;
      if (!task) {
        return response.status(404).json({ error: "Task not found." });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
    next();
  },
};
