if(process.env.NODE_ENV === "development") {
  require("dotenv").config()
}
const express = require(`express`)
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
const router = require("./routes")

app.use(router)

app.listen(port, ()=> {
  console.log(`listen on port ${port}`);
})