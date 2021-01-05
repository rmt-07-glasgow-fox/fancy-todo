function errorHandlers (err, req, res, next) {
  if (err.errors) {
    var arrErrors = err.errors.map (e => {
      return e.message
    })
  }

  if (err.message == 'Invalid email / password') {
    err.name = err.message
  }

  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json(arrErrors)
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json(arrErrors)
      break;
    case 'Invalid email / password':
      res.status(400).json({ message: 'Invalid email / password' })
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error'})
      break;
  }
}

module.exports = {
  errorHandlers
}