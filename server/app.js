const express = require('express')
const app = express()
const PORT = 3000
const todoRoute = require("./routes/todoRoute")
const userRoute = require("./routes/authRoute")
const { authenticate } = require('./middlewares/auth')

app.use(express.urlencoded({extended:true}))


app.use("/",userRoute)
app.use(authenticate)
app.use("/",todoRoute)

app.listen(PORT, () => {console.log(`listen at port : ${PORT}`)})