const express = require("express")
const app = express()
const port = 3001

const router = require('./routes')
const errorHandlers =require('./middlewares/errorHandler')


app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("hello world")

})
app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})