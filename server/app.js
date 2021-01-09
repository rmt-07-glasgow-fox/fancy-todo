if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const { authenticate } = require('./middlewares/auth')
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandlers')

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const { todoRouter, userRouter, publicAPIRouter } = require('./routers')
app.use('', publicAPIRouter)
app.use('', userRouter)
app.use('', authenticate, todoRouter)
app.use(errorHandlers) // harus setelah router

app.listen(PORT, console.log(`listen to PORT : ${PORT}`))