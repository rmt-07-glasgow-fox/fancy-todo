//npm run dev
// if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config()
// }

require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routers')
const errorsHandler = require('./middlewares/errorsHandler')
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.use(router)

//errorHandler
app.use(errorsHandler)

app.listen(port, () => {
  console.log(`App listening at:${port}`)
})
