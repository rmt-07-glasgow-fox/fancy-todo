// if (process.env.NODE_ENV !== "production") {
//   require('dotenv').config()
// }

require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(port, () => {
  console.log(`Bismillah jalan di port ${port}`)
})