function errorHandlers (err, req, res, next) {
  if (err.errors) {
    var arrErrors = err.errors.map (e => {
      return e.message
    })
  }
  console.log (err, 'err message')
  switch (err.message) {
    case 'Invalid email / password':
      err.name = err.message
      break;
    case 'error not found':
      err.name = err.message
      break;
    case "Cannot read property 'user_id' of null":
      err.name = err.message
      break;
    default:
      break;
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
    case 'Error Input':
      res.status(400).json(err.message)
      break;
    case "Cannot read property 'user_id' of null":
      res.status(404).json({ message: 'Not Found' })
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error'})
      break;
  }
}

module.exports = {
  errorHandlers
}