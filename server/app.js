const express = require('express')
const router = require('./routes/index')
const { errorHandlers } = require('./middlewares/error_handlers')

const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', router)
app.use(errorHandlers)


app.listen(port, () => {
    console.log('app started')
})