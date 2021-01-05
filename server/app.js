require('dotenv').config()
const express = require('express');
const errHandlers = require('./middlewares/errorHandlers');
const app = express()
const routers = require('./routes/')
const PORT = 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(routers)
app.use(errHandlers)

app.listen(PORT, () => {
    console.log(`Welcome on PORT: ${PORT} Sir`);
})

