const errorHandler = (err,req,res,next) => {
    if(err){
        switch (err.name) {
            case "SequelizeValidationError":
                err.errors = err.errors.map(e=>e.message)
                res.status(400).json(err.errors)
                break;
            case "errorAuthentication" : 
                res.status(401).json({message: 'You need to login first'})
                break;
            case "errorAuthorization" : 
                res.status(401).json({ message: 'you dont have access' })
                break;
            case "errorNotFound":
                res.status(404).json({message:'error not found'})
                break;
            default:
                res.status(500).json({message:'Internal server error'})
                break;
        }
    }
}

module.exports = {
    errorHandler
}