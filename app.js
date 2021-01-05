if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const router = require('./routes')

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

app.listen(port, () => {
  console.log(`App listen on Port ${port}`);
})
