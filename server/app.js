if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const port = process.env.PORT || 3000
const app = express()

// const bodyParser = require('body-parser')


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(express.urlencoded({ extended:true }))

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server jalan di ${port}`)
})