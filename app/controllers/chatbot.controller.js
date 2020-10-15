const ChatbotResponse = require("../models/chatbot.model.js");

// Conversation Add
exports.conversation = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Chat input can not be empty",
    });
  }

  let type = req.body.type;
  let response = catchInputs(type);

  // Create
  const newResponse = new ChatbotResponse({
    type,
    response
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


function catchInputs(type) {
    switch (type) {
      case 'select':
        return {
          a: {
            label: 'retorno a',
            value: 'a'
          },
          b: {
            label: 'retorno b',
            value: 'b'
          },
        }
      case 'botoes':
        return {
          botao1: {
            label: 'botao1',
            link: 'www1'
          },
          botao2: {
            label: 'botao2',
            link: 'www2'
          },
        }
      case 'lista':
        return [
            'item1',
            'item2',
            'item3'
          ]
      case 'link':
        return 'http://visual.com.br';
      case 'texto':
        return 'texto texto';
      case 'image':
        return 'https://46btcf3p9wmn3pbckq2c0s43-wpengine.netdna-ssl.com/wp-content/themes/visual-sistemas-eletronicos/assets/img/visual.svg'
      default:
        return 'não entendi sua pergunta'
    }
}