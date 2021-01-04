const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//routes
app.use(routes)
//listen
app.listen(port, () => console.log(`App is listening on port ${port}`))