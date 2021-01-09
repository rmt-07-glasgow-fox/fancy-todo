require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')
const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
// body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use(router)

// errorHandler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('this app running on port:', PORT);
})