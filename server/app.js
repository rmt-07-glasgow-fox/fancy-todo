if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')
const errorHandler = require('./midedlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use('/', router)
app.use(errorHandler)

app.listen (port, ()=>{
    console.log('Run in port ', port)
})