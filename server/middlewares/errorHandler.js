const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.name === 'SequelizeValidationError') {
      let errorMessage = err.erros.map((err) => {
        return {
          message: error.message,
        };
      });
      res.status(400).json(errorMessage);
    } else if (err.name === 'NotFound') {
      res.status(404).json({ message: `Not Found` });
    } else if (err.name === 'Auth') {
      res.status(401).json({ message: 'You must be logged in.' });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    }
  }
};

module.exports = errorHandler;
