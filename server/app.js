// requirement express, port, router
const express = require('express')
const app = express()
const port = 1200
const route = require('./routes/route-todo')

// setting bodyparser
app.use(express.urlencoded({ extended: true }))

// routing
app.use(route)

// listening
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})