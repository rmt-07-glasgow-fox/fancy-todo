const errorHandlers = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "dateValidate":
        res.status(400).json({message: 'do not enter a date that is past today', errorMessage: err.message});
        break;
      case 'notFound':
        res.status(404).json({message: 'Todo Not Found', errorMessage: err.message});
        break;
      case 'statusIsRequired':
        res.status(400).json({message: 'status is required', errorMessage: err.message})
        break;
      case 'invalidEmailOrPassword':
        res.status(401).json({ message: "Invalid email / password", errorMessage: err.message });
        break;
      default:
        res.status(500).json({message: 'Internal Server Error', errorMessage: err.message})
        break;
    }
  }
};

module.exports = errorHandlers;
