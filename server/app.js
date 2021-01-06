if (process.env.NODE_ENV === 'development') {
  require ('dotenv').config()
}
const {OAuth2Client} = require ('google-auth-library')
const express = require('express')
const router = require ('./routes/index')
const { errorHandlers } = require ('./middlewares/errorHandlers')
const cors = require ('cors')
const app = express()
const port = process.env.PORT || 3000

app.use (cors())
app.use (express.urlencoded ({extended: false}))

app.use ('/', router)
app.use (errorHandlers)

app.listen(port, () => {
  console.log(`Fancy To Do app listening at http://localhost:${port}`)
})