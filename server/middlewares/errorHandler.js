function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json(err.errors.map((e) => e.message));
      break;
    case 'resourceNotFound':
      res.status(404).json({ message: 'resource not found' });
      break;
    case 'accessDenied':
      res.status(401).json({ message: 'access denied' });
      break;
    case 'internalServerError':
      res.status(500).json({ message: 'internal server error' });
      break;
    case 'passEmailNotMatched':
      res
        .status(404)
        .json({ message: 'make sure your email/password is correct' });
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json(err.errors.map((e) => e.message));
      break;
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'access denied' });
      break;
    default:
      res.status(500).json({ message: 'internal server error' });
      break;
  }
}

module.exports = {
  errorHandler,
};
