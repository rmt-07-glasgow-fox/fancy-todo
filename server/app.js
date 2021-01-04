const express = require('express')
const route = require('./routes')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use('/', route)

app.listen( PORT, () => {
    console.log('App running on port: ' + PORT);
} )