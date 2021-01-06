const errorsHandler = (err, req, res, next) =>{
  // switch (err.name) {
  //   case "SequelizeValidationError":
  //     res.status(400).json(err)
  //     break
  //   case 
  // }
  if (err.name === "SequelizeValidationError") {
    res.status(400).json(err)
  } else {
    res.status(500).json({ message: `Internal Server Error` })
  }
}

module.exports = errorsHandler