if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')

const router = require('./routes')

const PORT = process.env.PORT || 3000
const app = express()

// json raw
app.use(express.json())
// body urlencoded
app.use(express.urlencoded({extended: true}))
// routes
app.use(router)

app.listen(PORT, _ => console.log(`Server is running on ${PORT}`))
