if(process.env.NODE_ENV === 'development') require ('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers')
const { errorHandler } = require('./middlewares/errorhandlers')

app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`Is running on ${port}`);
})