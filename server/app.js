if (process.env.NODE_ENV === 'development') {
  require ('dotenv').config()
}
const express = require('express')
const router = require ('./routes/index')
const { errorHandlers } = require ('./middlewares/errorHandlers')
const app = express()
const port = process.env.PORT || 3000

app.use (express.urlencoded ({extended: false}))

app.use ('/', router)
app.use (errorHandlers)

app.listen(port, () => {
  console.log(`Fancy To Do app listening at http://localhost:${port}`)
})