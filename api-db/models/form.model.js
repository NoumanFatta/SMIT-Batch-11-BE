const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [],
  },
});

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  form: {
    type: [FieldSchema],
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
  visible: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
});
const FormModel = mongoose.model("form", FormSchema);
module.exports = FormModel;
