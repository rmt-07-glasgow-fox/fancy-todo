function errorHandler(err, req, res, next){
  if(err){
    const errMessages = {
      errors: []
    }
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        err.errors.forEach(element => {
          errMessages.errors.push(element.message)
        })
        res.status(400).json(errMessages)
        break
      case "SequelizeValidationError":
        err.errors.forEach(element => {
          errMessages.errors.push(element.message)
        })
        res.status(400).json(errMessages)
        break
      case "notFound":
        errMessages.errors.push('error data not found')
        res.status(404).json(errMessages)
        break
      case "invalidEmailPassword":
        errMessages.errors.push('Invalid email or password')
        res.status(401).json(errMessages)
        break
      case "needlogin":
        errMessages.errors.push('Please login first')
        res.status(401).json(errMessages)
        break
      case "needAccess":
        errMessages.errors.push(`You don't have access`)
        res.status(401).json(errMessages)
        break
      default:
        errMessages.errors.push('Internal Server Error')
        res.status(500).json(errMessages)
        break
    }

    // if(err.name === 'SequelizeUniqueConstraintError') {
    //   err.errors.forEach(element => {
    //     errMessages.errors.push(element.message)
    //   })
    //   res.status(400).json(errMessages)
    // } else if(err.name === 'SequelizeValidationError') {
    //   err.errors.forEach(element => {
    //     errMessages.errors.push(element.message)
    //   })
    //   res.status(400).json(errMessages)
    // } else if(err.name === 'notFound') {
    //   errMessages.errors.push('error data not found')
    //   res.status(404).json(errMessages)
    // } else if(err.name === 'invalidEmailPassword') {
    //   errMessages.errors.push('Invalid email or password')
    //   return res.status(401).json(errMessages)
    // } else {
    //   errMessages.errors.push('Internal Server Error')
    //   res.status(500).json(errMessages)
    // }
  }
}

module.exports = { errorHandler }