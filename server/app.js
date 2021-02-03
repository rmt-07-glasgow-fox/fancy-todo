if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const errorHandlers = require('./middlewares/errorHandlers')
const router = require('./routers')
const cors = require('cors')
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})