if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const {router} = require('./routes')

// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.use('/', router)

app.listen(port, (req, res) => {
  console.log('Fancy todo app running well on port ', port);
})
