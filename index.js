const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const config = require('./config/default.json');
const PORT = process.eventNames.PORT || '8000'

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://<user>:<pass>@ds135522.mlab.com:35522/chatbotvisual"
  .replace('<user>', config.db_user)
  .replace('<pass>', config.db_pass),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  }
);

app.get('/', (req, res) => {
  res.json({
    message: 'server is running'
  })
})

// routes
require('./app/routes/chatbot.routes.js')(app);

app.listen(PORT, ()=> {
  console.log(`server running on ${PORT}`)
})