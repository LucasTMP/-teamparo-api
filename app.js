require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const cors = require('cors')

const app = express()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).catch(error => {
  console.log('Erro na conexão do MongoDB: "' + error + '".')
})

app.use(cors())
app.use(express.json())
app.use(routes)

module.exports = app
