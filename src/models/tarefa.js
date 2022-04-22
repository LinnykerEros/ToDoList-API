const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  tarefa: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tarefa", tarefaSchema);
