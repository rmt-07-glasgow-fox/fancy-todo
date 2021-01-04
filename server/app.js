const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const { checkDate } = require('./helpers/helpers')

app.use(express.urlencoded({extended: true}))
app.use('/', router)

app.locals.checkDate = checkDate

app.listen(port, () => {
  console.log(`You're connected on port ${port}`)
})
