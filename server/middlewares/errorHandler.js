const errorHandler = (err, req, res, next) => {
  if(err){
    switch (err.status) {
      case 400:
        res.status(400).json({
          message: 'Invalid access token',
          data: err.data
        })
        break;
      case 401:
        res.status(401).json({
          message: 'Unauthorized. Please try fill in the correct login details.',
          data: err.data
        })
        break;
      case 404:
        res.status(404).json({
          message: 'Data not found'
        })
        break;
      default:
        res.status(500).json(err)
        if(err.data.name === "SequelizeConnectionError"){
          res.status(500).json({
            message: 'Internal server error',
            data: err.data.name
          })
        }else if(err.data.name === "SequelizeValidationError"){
          res.status(500).json({
            message: 'Internal server error',
            data: err.data
          })
        }else{
          res.status(500).json({
            message: 'Internal server error'
          })
        }
        break;
    }
  }
}

module.exports = errorHandler