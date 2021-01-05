if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { todoRouter, userRouter } = require('./routers')
app.use('', todoRouter)
app.use('', userRouter)

app.listen(PORT, console.log(`listen to PORT : ${PORT}`))