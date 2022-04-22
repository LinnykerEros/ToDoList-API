const { validate: isUuid } = require("uuid");

const Tarefa = require("../models/tarefa");

module.exports = {
  async validadeId(request, response, next) {
    const { id } = request.params;
    if (!isUuid(id)) {
      return response.status(400).json({ error: "Invalid id" });
    }

    try {
      const tarefa = await Tarefa.findById(id);
      response.tarefa = tarefa;
      if (!tarefa) {
        return response.status(404).json({ error: "Tarefa not found." });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
    next();
  },
};
