if (process.env.NODE_ENV === "development"){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')

app.use(express.urlencoded({extended : true}))

app.use(router)
app.use((err, req, res , next) => {
    if (err.name === "SequelizeValidationError"){
        let message = []
        err.errors.forEach(el => {
            message.push(el.message)
        })
        res.status(400).json({Errors : message})
    } 
    else {
        res.status(500).json({message : 'Internal Server Error'})
    }
})

app.listen(PORT, () => {
    console.log(`Currently listening to port ${PORT}`)
})