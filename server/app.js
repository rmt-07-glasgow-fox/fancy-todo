require('dotenv').config()
const express = require('express');
const errHandlers = require('./middlewares/errorHandlers');
const app = express()
const routers = require('./routes/')
const PORT = 3000
const cors = require('cors')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routers)
app.use(errHandlers)

app.listen(PORT, () => {
    console.log(`Welcome on PORT: ${PORT} Sir`);
})

