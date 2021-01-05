const errorHandlers = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case 'SequelizeValidationError':
        const errorMessages = err.errors.map(err => {
          return err.message;
        })
        res.status(400).json({ Error: 'Validation error', message: errorMessages.join(',') });
        break;
      case 'invalidEmailPassword':
        res.status(401).json({ Error: 'Invalid Authentication', message: 'Invalid email / password' });
        break;
      case 'JsonWebTokenError':
        res.status(401).json({ Error: 'Invalid Authentication', message: 'The requested page needs a username and a password.' });
        break;
      case 'resourceNotFound':
        res.status(404).json({ Error: 'Invalid Id', message: 'Data not found' });
        break;
      case 'forbidden':
        res.status(403).json({ Error: 'Forbidden access', message: 'You are not authorized to access the file' });
        break;
      default:
        res.status(500).json({ Error: 'Error from Server', message: 'Internal server error' })
        break;
    }
  }
}

module.exports = errorHandlers;