const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema(
  {
    type: {},
    response: {}
  }
);

module.exports = mongoose.model("ChatbotResponse", ModelSchema);
