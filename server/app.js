const express = require("express")
const app = express()
const port = 3000

const router = require('./routes')

// app.use(express)
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("alohaaa!!!")
})
app.use(router)

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})