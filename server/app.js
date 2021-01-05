if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// requirement express, port, router
const express = require('express')
const app = express()
const port = 1200
const todoRoute = require('./routes/route-todo')
const userRoute =require('./routes/route-auth')

// setting bodyparser
app.use(express.urlencoded({ extended: true }))

// routing
app.use(todoRoute)
app.use(userRoute)

// listening
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})