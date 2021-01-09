let errHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "InvalidEmailorPass":
        res.status(400).json({ message: "Your Email or Password is invalid" });
        break;
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "Unauthorized":
        res.status(401).json({ message: 'You don\'t have permission to access this task' });
        break;
      case "NotFound":
        res.status(404).json({ message: "Task not found" });
        break;
      default:
        res.status(500).json(err);
        break;
    };
  };
};

module.exports = errHandler;