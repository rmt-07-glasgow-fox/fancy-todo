const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/todo')

app.use(express.urlencoded({extended:false}))

app.use('/todos', router)

app.listen(port, () => {
  console.log('Working and running in port: ', port)
})