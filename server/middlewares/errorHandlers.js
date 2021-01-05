const errorHandlers = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        let errorMessages = err.errors.map(err => {
          return {
            message: err.message,
            column: err.path
          }
        })
        return res.status(400).json(errorMessages);
      case "unauthorized":
        return res.status(401).json({
          message: "unauthorized"
        });
      case "resourceNotFound":
        return res.status(404).json({
          message: "not found"
        });
      default:
        return res.status(500).json({
          message: "internal server error"
        });
    }
  }
}

module.exports = errorHandlers