if (process.env.NODE_ENV === "development") {
      require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./router/index.js')
const port = 3000
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
      res.send("hai")
})
app.use('/', router)
app.use(errorHandler)

app.listen(port, ()=> {
      console.log(`connectd to ${port}`);
})