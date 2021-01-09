require('dotenv').config()
const express = require('express')
const router = require('./routes/index.js')
const { errorHandlers } = require('./middlewares/errorHandlers')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}))

app.use(router)

app.use(errorHandlers)

app.listen(port, () => {
    console.log(`Connected on Port ${port}`)
})