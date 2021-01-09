if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require('express')
const router = require('./routers')
const app = express()
const cors = require("cors")
const port = 3000
const errorsHandler = require("./middlewares/errorsHandler")

app.use(cors())
app.use(express.urlencoded({ extended:false }))

app.use(router)

app.use(errorsHandler)

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})