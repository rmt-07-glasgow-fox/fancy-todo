if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
const app = express()
// const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended:true }))

app.use(routes)

app.listen(port, () => {
    console.log(`server jalan di ${port}`)
})