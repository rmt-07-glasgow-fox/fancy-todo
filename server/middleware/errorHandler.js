const errorHandler = (err, req, res, next) => {
      if (err) {
            console.log(err);
            switch(err.name){
            case "SequelizeValidationError":
                 const errorMessage = err.errors[0].message
                 res.status(400).json(errorMessage)

                 break
            case "SourceNotFound":
                  res.status(404).json({message: "gak ketemu, bos"})
                  break
            default:     
                  res.status(500).json({message: "broken inside :("})
            
            }
                  
      }
}

module.exports = errorHandler