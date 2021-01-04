const express = require('express')
const app = express()
const port = 3000
const router = require('./routers')

app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () =>{
    console.log(`Is running on ${port}`);
})