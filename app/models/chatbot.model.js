const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema(
  {
    response: {}
  }
);

module.exports = mongoose.model("ChatbotResponse", ModelSchema);
