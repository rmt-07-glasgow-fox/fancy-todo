function errorHandler(err, req, res, next){
  if(err){
    if(err.name === 'SequelizeUniqueConstraintError') {
      const errMessages = []
      err.errors.forEach(element => {
        errMessages.push(element.message)
      })
      res.status(400).json(errMessages)
    } else if(err.name === 'SequelizeValidationError') {
      const errMessages = []
      err.errors.forEach(element => {
        errMessages.push(element.message)
      })
      res.status(400).json(errMessages)
    } else if(err.name === 'notFound') {
      res.status(404).json({ msg: 'error not found' })
    } else if(err.name === 'invalidEmailPassword') {
      return res.status(401).json({ msg: 'Invalid email/ password' })
    } else {
      res.status(500).json({ message: 'Internal Server Error'})
    }
  }
}

module.exports = { errorHandler }