
function errorHandler (err, req, res, next) {
  let errName = err.name
  let errMsg
  console.log(err.name)

  switch (errName) {
    case 'SequelizeValidationError':
      errMsg = err.message.split(',\n')
      res.status(400).json(errMsg)
      break
    case 'SequelizeDatabaseError':
      res.status(500).json({message: 'Internal Server Error'})
      break
    case '404':
      res.status(404).json({message: 'Not Found'})
      break
    default:
      errMsg = err.message.split(',\n')
      res.status(404).json(errMsg)
  }
}



module.exports = errorHandler;