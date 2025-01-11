const mongoose = require("mongoose");

const ResponseObjectSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "field",
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const ResponseSchema = new mongoose.Schema({
  response: [ResponseObjectSchema],
  form: {
    type: mongoose.Schema.ObjectId,
    ref: "form",
  },
  submittedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});
const ResponseModel = mongoose.model("response", ResponseSchema);
module.exports = ResponseModel;
