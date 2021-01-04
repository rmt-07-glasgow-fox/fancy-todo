const express = require('express')
const router = require('./routers')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended:false }))

app.use(router)

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})