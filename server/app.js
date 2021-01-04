const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')

app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use(router)

app.listen(port, ()=> {
    console.log(`App ini berjalan di port ${port}`)
})
