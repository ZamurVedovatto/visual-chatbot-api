const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema(
  {
    content: {},
  },
  {
    response: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatbotResponse", ModelSchema);
