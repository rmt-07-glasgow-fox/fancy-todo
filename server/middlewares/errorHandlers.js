function errorHandlers(err, req, res, next) {
  if (err) {
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
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
    else if(err.name === 'Please login first') {
      return res.status(401).json({message: 'Please login first'});
    }
    else if(err.name === 'Not authorized') {
      return res.status(400).json({message: 'Not authorized'});
    }
    else {
      return res.status(500).json({
        message: 'internal server error',
        error: err.message
      });
    }
  }
}

module.exports = {
  errorHandlers
};