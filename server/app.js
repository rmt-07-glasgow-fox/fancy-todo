//npm run dev
// if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config()
// }

require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routers')
const errorsHandler = require('./middlewares/errorsHandler')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(router)

//errorHandler
app.use(errorsHandler)

app.listen(port, () => {
  console.log(`App listening at:${port}`)
})
