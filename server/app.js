const express = require('express')
const routerTodo = require('./routes/todos.js')
const app = express()
// const bodyParser = require('body-parser')
const port = process.env.port || 3000

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended:true }))

app.use('/', routerTodo)

app.listen(port, () => {
    console.log(`server jalan di ${port}`)
})