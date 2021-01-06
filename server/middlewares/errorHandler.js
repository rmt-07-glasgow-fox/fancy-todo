const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case 'SequelizeValidationError':
        const outputErr = []
        err.errors.forEach(errors => {
          outputErr.push(errors)
        })
        res.status(400).json({
          message: outputErr.join(', ')
        })
        break;
      case 'Data not found':
        res.status(404).json({
          message: 'Data not found'
        })
        break;
      default:
        res.status(500).json({
          message: 'Internal Server Error'
        })
        break;
    }
  }
}

module.exports = errorHandler
