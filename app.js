if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)
app.use((err, req, res, next) => {
  let { code, msg, origin } = err
  switch (code) {
    case 400 :
      res.status(code).json({ message: msg})
      break;
    case 401 :
      if (origin === 'authenticate') res.status(code).json({ message: "Please Login First"})
      else if (origin === 'user') res.status(code).json({ message: "Invalid Username / Password"})
      else res.status(code).json({ message: "UnAuthorize Data" })
      break;
    case 404 :
      res.status(code).json({ message: "Data Not Found"})
      break;
    default :
      res.status(code).json({ message: "Internal Server Error"})
      break;
  }

})

app.listen(port, () => {
  console.log(`App listen on Port ${port}`);
})
