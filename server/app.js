process.env.NODE_ENV === 'development' && 
    require('dotenv').config()

const express = require('express')
const route = require('./routes')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
//body parser
app.use(express.urlencoded({extended: true}))
//route
app.use(route)

app.listen(port, () => {
    console.log('Listening to',port);
})