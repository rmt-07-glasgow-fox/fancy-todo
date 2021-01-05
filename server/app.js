const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')

// body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use(router)

app.listen(PORT, () => {
  console.log('this app running on port:', PORT);
})