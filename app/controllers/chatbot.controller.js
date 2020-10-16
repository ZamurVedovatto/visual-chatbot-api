const ChatbotResponse = require("../models/chatbot.model.js");

// Conversation Add
exports.conversation = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Chat input can not be empty", });
  }
  let content = req.body;
  let response = catchInputs(content);
  let newResponse = new ChatbotResponse({ response });
  newResponse.save().then((data) => { res.send(response) })
    .catch((err) => {res.status(500).send({
        message: err.message || "Some error occurred while creating the Chat.",
      });
    });
};

// fake IA rolando aqui
function catchInputs({ content }) {
  let responseType = null;
  if (content.includes('text') || content.includes('stri')) {
    responseType = 'text';
  } else if (content.includes('selec') || content.includes('opç') || content.includes('opc')) {
    responseType = 'select';
  } else if (content.includes('link') || content.includes('sit') || content.includes('pagin') || content.includes('págin')) {
    responseType = 'link';
  } else if (content.includes('butt') || content.includes('botã') || content.includes('bota') || content.includes('botoe') || content.includes('botões')) {
    responseType = 'button';
  } else if (content.includes('list') || content.includes('tabel') || content.includes('table')) {
    responseType = 'list';
  }

  switch (responseType) {
    case 'text':
      return responseSimpleText();
    case 'select':
      return responseSelect();
    case 'link':
      return responseLink();
    case 'button':
      return responseButton();
    case 'list':
      return responseList();
    default:
      return responseUndefined();
  }
}

function responseSimpleText() {
  return [
    {
      type: 'text',
      content: 'simple text'
    }
  ];
}

function responseSelect() {
  return [
    {
      type: 'text',
      content: 'Aqui vão algumas opções. Selecione a que você quiser.'
    },
    {
      type: 'select',
      content: [
        {
          label: 'retorno a',
          value: 'a'
        },
        {
          label: 'retorno b',
          value: 'b'
        },
        {
          label: 'retorno c',
          value: 'c'
        },
        {
          label: 'retorno d',
          value: 'd'
        }
      ]
    }
  ]
}

function responseLink() {
  return [
    {
      type: 'text',
      content: 'Links relacionados à sua pesquisa.'
    },
    {
      type: 'link',
      content: [
        {
          label: 'Prefeitura de Belo Horizonte',
          value: 'https://www.uol.com.br'
        },
        {
          label: 'COPASA',
          value: 'https://www.globo.com'
        },
        {
          label: 'CEMIG',
          value: 'https://www.globo.com'
        }
      ]
    }
  ]
}

function responseButton() {
  return [
    {
      type: 'text',
      content: 'Escolha uma das opções abaixo para dar continuidade.'
    },
    {
      type: 'button',
      content: [
        {
          label: 'Option 1',
          value: 'action1'
        },
        {
          label: 'Option 2',
          value: 'action2'
        },
        {
          label: 'Option 3',
          value: 'action3'
        },
        {
          label: 'Option 4',
          value: 'action4'
        }
      ]
    },
  ]
}

function responseList() {
  return [
    {
      type: 'text',
      content: 'Lista relacionada à sua pergunta.'
    },
    {
      type: 'list',
      content: [
        {
          label: 'List item a',
        },
        {
          label: 'List item b',
        },
        {
          label: 'List item c',
        },
        {
          label: 'List item d',
        }
      ]
    }
  ]
}

function responseUndefined() {
  return [
    {
      type: 'text',
      content: 'Não entendi a sua pergunta'
    }
  ];
}







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
