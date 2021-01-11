if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')

const app = express()
const port = 4400

const router = require('./routes/index.js')

// app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port, () => {
    console.log(`This app is listen on port ${port}`)
})