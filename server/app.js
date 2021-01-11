process.env.NODE_ENV === 'development' && 
    require('dotenv').config()

const express = require('express')
const route = require('./routes')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
//body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//route
app.use(route)

app.listen(PORT, () => {
    console.log('Listening to',PORT);
})