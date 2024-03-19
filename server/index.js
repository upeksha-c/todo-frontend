require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { todoRouter } = require('./routes/todo.js')

const app = express();
app.use(cors());
app.use(express.json());//reading posted values from theclient as JSON.
app.use(express.urlencoded({extended: false}))
app.use('/',todoRouter)

const port = process.env.PORT

app.listen(port)