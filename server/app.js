if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
