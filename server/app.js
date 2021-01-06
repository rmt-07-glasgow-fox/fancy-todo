require('dotenv').config()

const express = require('express')
const errorHandlers = require('./middlewares/errorHandlers')
const router = require('./routers')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})