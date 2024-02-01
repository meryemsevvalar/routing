const express =  require('express')
const app = express()

app.use(express.json())

const routes = require('./routes/main')

app.use(routes)
require('dotenv').config()


module.exports = app