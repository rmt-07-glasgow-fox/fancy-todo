// if(process.env.NODE_ENV === "development") {
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const todoRoute = require("./routes/todoRoute")
const userRoute = require("./routes/authRoute")
const { authenticate } = require('./middlewares/auth')
const { errorHandler } = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))

app.use("/",userRoute)
app.use(authenticate)
app.use("/",todoRoute)
app.use(errorHandler)

app.listen(PORT, () => {console.log(`listen at port : ${PORT}`)})