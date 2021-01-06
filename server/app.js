const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers/index')

// for input from json
app.use(express.json())
// for input from req.body
app.use(express.urlencoded({ extended:true }))

app.use('/', router)

app.listen(port, () => {
    console.log('connected');
})