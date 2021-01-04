const express = require('express')
const route = require('./routes')
const app = express()
const port = 3000

//body parser
app.use(express.urlencoded({extended: true}))
//route
app.use(route)

app.listen(port, () => {
    console.log('Listening to',port);
})