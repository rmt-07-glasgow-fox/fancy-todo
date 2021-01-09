function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let alert = err.errors.map(error => error.message);
      return res.status(400).json(alert);

    case "SequelizeUniqueConstraintError":
      let errorMsg = err.errors.map(error => error.message);
      return res.status(400).json(errorMsg);

    case "InvalidEmail":
      return res.status(401).json({
        message: "This Email has been taken, try another one"
      })

    case "InvalidPassword":
      return res.status(401).json({
        message: "Wrong input password, please try again"
      })

    case "UnregisteredUser":
      return res.status(401).json({
        message: "Please login first"
      })

    case "TodoNotFound":
      return res.status(404).json({
        message: "Todo not found"
      })

    case "UnauthorizedUser":
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