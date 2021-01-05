function errorHandlers(err, req, res, next) {
  if (err) {
    if(err.name === 'SequelizeValidationError') {
      let errorMessages = err.errors.map(err => {
        return {
          message: err.message,
          column: err.path
        }
      })
      return res.status(400).json(errorMessages);
    }
    else if(err.name === 'error not found') {
      return res.status(404).json({message: 'error not found'});
    }
    else {
      return res.status(500).json({message: 'internal server error'});
    }
  }
}

module.exports = {
  errorHandlers
};