// if (process.env.)
require("dotenv").config()
const express = require ("express")
const router = require("./routes")
const { errorHandler } = require ("./middlewares/errorHandler")
const app = express ()
const port = 5000

app.use (express.urlencoded ({extended: true}))

app.use (router)

app.use (errorHandler)

app.listen (port, () => {
    console.log( "app running at port: ", port)
})