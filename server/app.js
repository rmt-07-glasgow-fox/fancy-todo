const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers/index')
const cors = require('cors')

app.use(cors())
// for input from json
app.use(express.json())

// for input from req.body
app.use(express.urlencoded({ extended:true }))

app.use('/', router)

// error handler WakaTime API Key
// app.use((err, req, res, next) => {
    // if (err)

// })

app.listen(port, () => {
    console.log('connected');
})