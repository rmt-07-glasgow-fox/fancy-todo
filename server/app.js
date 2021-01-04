const express = require('express')
const app = express()
const PORT = 3000
const todoRoute = require("./routes/todoRoute")

app.use(express.urlencoded({extended:true}))

app.use("/",todoRoute)

app.listen(PORT, () => {console.log(`listen at port : ${PORT}`)})