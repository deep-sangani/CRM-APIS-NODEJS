const mongoose = require("mongoose");

const inqSchema = mongoose.Schema({
  name: { type: "String", required: true },
  email: { type: "String", required: true },
  interest: { type: "String", required: true },
  asignEmp: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("inquiry", inqSchema);
