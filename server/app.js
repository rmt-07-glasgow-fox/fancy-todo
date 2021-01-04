const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')

app.use(express.JSON())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
