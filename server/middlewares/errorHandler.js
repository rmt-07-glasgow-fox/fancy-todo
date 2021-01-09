const errorHandler = (err,req,res,next) => {
  if(err) {
    console.log(`---------NAME----------`);
    console.log(err);
    console.log(`-----------------------`);
    if (err.name == "SequelizeValidationError") {
      let errorMessages = err.errors.map(err => { return {message:err.message,column:err.path}})
      res.status(400).json(errorMessages)
    } else if (err.name == "Unauthorized") {
      res.status(404).json({message: "unauthorized action"})
    } else if (err.name == "NotFound") {
      res.status(404).json({message: "data not found"})
    } else if (err.name == "BadRequest") {
      res.status(404).json({message: "bad request"})
    } else {
      res.status(500).json({message: "internal server error"})
    }
  }
}

module.exports = errorHandler