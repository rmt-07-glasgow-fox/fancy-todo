if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const { authenticate } = require('./middlewares/auth')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { todoRouter, userRouter } = require('./routers')
app.use('', userRouter)
app.use('', authenticate, todoRouter)

app.listen(PORT, console.log(`listen to PORT : ${PORT}`))