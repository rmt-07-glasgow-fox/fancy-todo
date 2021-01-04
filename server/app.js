const express = require ("express")
const router = require("./routes")
const app = express ()
const port = 5000

app.use (express.urlencoded ({extended: true}))

app.use (router)

app.listen (port, () => {
    console.log( "app running at port: ", port)
})