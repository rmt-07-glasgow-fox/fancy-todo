const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorhandler')

app.use(express.urlencoded({extended:false}))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Working and running in port: ', port)
})