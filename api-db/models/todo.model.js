const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const TodoModel = mongoose.model("todo", TodoSchema);
module.exports = TodoModel;
