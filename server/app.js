const dotenv = require('dotenv').config()
const express = require("express")
const app = express()
const port = 3000
const routers = require("./routes")

app.use(express.urlencoded({extended:true}))
app.use(routers)

app.listen(port, () => {
    console.log("running on port", port)
})