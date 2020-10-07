const ChatbotResponse = require("../models/chatbot.model.js");

// Conversation Add
exports.conversation = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Chat input can not be empty",
    });
  }

  let response = catchInputs(req.body.content);

  // Create
  const newResponse = new ChatbotResponse({
    content: {response, ...req.body.content}
  });

  // Save in the database
  newResponse
    .save()
    .then((data) => {
      res.send({data, response});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Chat.",
      });
    });
};

// Conversation Get All
exports.getAll = async (req, res) => {
  ChatbotResponse.find()
    .then((chats) => {
      res.send(chats);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving chats.",
      });
    });
};

// Conversation Delete One
exports.deleteOne = (req, res) => {
  ChatbotResponse.findByIdAndRemove(req.params.chatID)
    .then((chat) => {
      if (!chat) {
        return res.status(404).send({
          message: "Chat not found with id " + req.params.chatID,
        });
      }
      res.send({ message: "Chat deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Chat not found with id " + req.params.chatID,
        });
      }
      return res.status(500).send({
        message: "Could not delete chat with id " + req.params.chatID,
      });
    });
};

// Conversation Delete All
exports.deleteAll = (req, res) => {  
  ChatbotResponse.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.end('success');
    }
  });
};


function catchInputs(content) {
  if (content.selection !== null && content.selection !== 0) {
    switch(content.selection) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 3;
      default:
        return false;
    }
  } else if (content.input !== null) {
    switch (content.input) {
      case 'brazil':
      case 'brasil':
      case 'br':
        return 'pais de mierda'
      case 'belo horizonte':
      case 'bh':
      case 'belorizonte':
        return 'quente demais'
      case 'select':
      case 'object':
        return {
          a: 'retorno 1',
          b: 'retorno 2'
        }
      case 'link':
        return 'http://visual.com.br';
      case 'img':
        return 'https://46btcf3p9wmn3pbckq2c0s43-wpengine.netdna-ssl.com/wp-content/themes/visual-sistemas-eletronicos/assets/img/visual.svg'
      default:
        return 'não entendi sua pergunta'
    }
  }
}