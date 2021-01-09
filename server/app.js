if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routers/')
const errHandlers = require('./helpers/errHandlers')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errHandlers)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})