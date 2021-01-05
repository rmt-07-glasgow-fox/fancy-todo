const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})