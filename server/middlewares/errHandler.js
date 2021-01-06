let errHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        res.status(400).json({ message: "Error 400: Bad Request" });
        break;
      case "Unauthorized":
        res.status(401).json({ message: 'Error 401: Unauthorized' });
        break;
      case "NotFound":
        res.status(404).json({ message: "Error 404: Not Found" });
        break;
      default:
        res.status(500).json(err);
        break;
    };
  };
};

module.exports = errHandler;