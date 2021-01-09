function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let alert = err.errors.map( error => error.message);
      return res.status(400).json(alert);

    case "SequelizeUniqueConstraintError":
      let errorMsg = err.errors.map( error => error.message);
      return res.status(400).json(errorMsg);

    case "InvalidEmail":
      return res.status(401).json({
        message: "Email is invalid"
      })

    case "InvalidPassword":
      return res.status(401).json({
        message: "Wrong password. Please try again"
      })

    case "NoToken":
      return res.status(400).json({
        message: "No Token - Please login"
      })

    case "UnregisteredUser":
      return res.status(401).json({
        message: "Please login"
      })

    case "NotFound":
      return res.status(404).json({
        message: "Looking for something?"
      })
    
    case "Unauthorized":
      return res.status(401).json({
        message: "You are unable to access this content"
      })

    default:
      return res.status(500).json({
        message: "Internal Server Error",
      });
  }
}

module.exports = errorHandler;
