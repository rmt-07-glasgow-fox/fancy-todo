const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./routers')
app.use('', router)

app.listen(PORT, console.log(`listen to PORT : ${PORT}`))