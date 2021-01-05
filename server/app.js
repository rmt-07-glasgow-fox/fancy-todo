require('dotenv').config()
const express = require('express');
const app = express()
const routers = require('./routes/')
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Welcome on PORT: ${PORT} Sir`);
})

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use (routers)

