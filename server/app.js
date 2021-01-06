if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
const app = express()
const port = 3000
const { errorHandler } = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})