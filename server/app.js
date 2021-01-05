if (process.env.NODE_ENV === "development"){
    require('dotenv').config()
}
const { errorHandler } = require('./middlewares')
const router = require('./routes')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`This app runing on port ${port}`);
})