const dotenv = require('dotenv').config()
const express = require("express")
const app = express()
const port = 3000
const routers = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({extended:true}))
app.use(routers)
app.use(errorHandler)


app.listen(port, () => {
    console.log("running on port", port)
})