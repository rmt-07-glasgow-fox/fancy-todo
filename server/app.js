if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errorHandlers = require('./middlewares/errorHandlers')

app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandlers)

app.listen(port, () => {
    console.log(`listening on port : ${port}`);
})