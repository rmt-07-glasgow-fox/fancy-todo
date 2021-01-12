const errorHandler =  (err, req, res, next) =>  {
    console.log(err);

    let statusCode = 500
    let message = "Internal Server Error!"
    switch(err.name){
        case "SequelizeUniqueConstraintError":
          statusCode = 400
          message = `${err.errors[0].value} already exists`
          break;
        case 'JsonWebTokenError': 
            statusCode = 401
            message = err.msg
        break;
        case 'NotFoundError':
            usCode = 401
            message = err.msg
        break; 
        case "SequelizeValidationError":
            statusCode = 400
            message = err.errors[0].message
        break;
        case "DataNotFound":
            statusCode = 404
            message = err.message
        break;
    }    
    res.status(statusCode).json({message})
  }

  module.exports = errorHandler