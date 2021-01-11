if (process.env.NODE_ENV === "development") {
      require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./router/index.js')
const PORT = 3000
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', (req, res) => {
      console.log("Welcome");
})
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, ()=> {
      console.log(`connectd to ${PORT}`);
})