if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')

// body parser
// raw
app.use(express.json())

// urlencoded
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
