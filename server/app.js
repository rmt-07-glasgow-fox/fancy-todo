const router = require('./routes')
const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(port, () => {
    console.log(`This app runing on port ${port}`);
})