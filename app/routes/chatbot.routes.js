module.exports = (app) => {
  const entityController = require("../controllers/chatbot.controller.js");
  app.post("/chatbot", entityController.conversation);
  app.get("/chatbot", entityController.getAll);
  app.delete("/chatbot/:chatId", entityController.deleteOne);
  app.delete("/chatbotdeleteall", entityController.deleteAll);
};
