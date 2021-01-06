const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const { errorHandlers } = require('./middlewares/errorHandlers')

app.use(express.urlencoded({extended:true}))
app.use(router)
///////// errorHandlers harus dipasang setelaah router
app.use(errorHandlers)

app.listen(port, () => {
  console.log('app listening on port', port)
})

// app.use((err, req, res, next) => {
//   console.log('ini dalem error handler')
//   switch (err.name) {
//     case "SequelizeValidationError":
//       res.status(400).json({message : `${err.message}`})
//       break;
//     case "SequelizeDatabaseError":
//       res.status(400).json({message : `${err.message}`})
//       break;
//     case "JsonWebTokenError":
//       res.status(400).json({message: `${err.message}`})
//       break;
//     case "NotAuthorized":
//       res.status(401).json({message: 'error not authorized'})
//       break;
//     case "DataNotFound":
//       res.status(404).json({message: 'data not found'})
//       break;
//     case "InvalidTokenFormat":
//       res.status(401).json({message: 'No Email Inside Token'})
//     case "EmailNotRecognized":
//       res.status(401).json({message: 'Email Not Registered, please register first'})
//     default:
//       console.log(err)
//       res.status(500).json({message: 'internal server error'})
//       break;
//   }
// })
