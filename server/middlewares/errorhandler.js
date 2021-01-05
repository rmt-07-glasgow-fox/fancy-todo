
function errorHandler (err, req, res, next) {
  let error = err.name
  let errMsg = err.message
  console.log(errMsg)
  switch (error) {
    case 'SequelizeValidationError':
      res.status(400).json({errMsg})
      break
    case 'SequelizeDatabaseError':
      res.status(500).json({message: 'Internal Server Error'})
      break
    default:
      res.status(404).json({message: 'Not Found'})
  }
}

module.exports = errorHandler;