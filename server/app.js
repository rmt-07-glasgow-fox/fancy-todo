if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const errorHandlers = require('./middlewares/errorHandlers.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandlers)

app.listen( PORT, () => {
    console.log('App running on port: ' + PORT);
} )