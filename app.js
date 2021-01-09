if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const rout = require('./routs')
const errorHandler = require('./middleware/errorsHandler')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(rout)
app.use(errorHandler)


app.listen(port,()=>{
    console.log('listen ',port);
})