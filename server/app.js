//if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
//}

// requirement express, port, router
const express = require('express')
const app = express()
const port = 1200
const todoRoute = require('./routes/route-todo')
const userRoute =require('./routes/route-auth')
const errorHandle = require('./middlewares/error-handling')
const cors = require('cors')

// setting bodyparser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routing
app.use(userRoute)
app.use(todoRoute)
app.use(errorHandle)

// listening
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})