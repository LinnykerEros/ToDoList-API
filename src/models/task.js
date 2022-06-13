const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  taskCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
