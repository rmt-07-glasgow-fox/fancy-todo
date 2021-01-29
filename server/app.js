if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const {router} = require('./routes')
const { errorHandlers } = require('./middlewares/errorHandles')
const cors = require('cors')

app.use(cors())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.use('/', router)

app.use(errorHandlers)

app.listen(PORT, (req, res) => {
  console.log('Fancy todo app running well on port ', PORT);
})
