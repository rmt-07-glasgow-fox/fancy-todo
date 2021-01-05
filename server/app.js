require("dotenv").config()

const express = require("express")
const app = express()
const port = 3000

const router = require('./routes')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("alohaaa!!!")
})
app.use(router)
app.use((err, req, res, next) => {
    res.status(err.code).json({ msg: err.message, from: err.from })
})

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})