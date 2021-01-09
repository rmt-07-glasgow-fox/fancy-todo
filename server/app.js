const express = require("express")
const cors = require('cors')
const app = express()
const port = 3001

const router = require('./routes')
const errorHandlers =require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("hello world")

})
app.use(router)
app.use(express.json())
app.use(errorHandlers)

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})