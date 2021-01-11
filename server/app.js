if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
var cors = require('cors')
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const routers = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(routers)
app.use(errorHandler)


app.listen(port, () => {
    console.log("running on port", port)
})