if(process.env.NODE_ENV === "development") {
  require("dotenv").config()
}
const express = require(`express`)
const app = express()
const port = 3000
const cors = require(`cors`)
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.urlencoded({extended:true}))
const router = require("./routes")

app.use(router)
app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`listen on port ${port}`);
})