const express = require("express")
const app = express()
const port = 3000
const router = require("./routes")

app.use("/", router)

//bodyparser urlencoded
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`app listening to port ${port}`);
})