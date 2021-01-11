function errorHandler(err, req, res, next){
    if(err){
        if(err.name === 'SequelizeValidationError'){
            let errorMsg = err.errors.map(err=> err.message)
            res.status(400).json(errorMsg)
        }else if(err.name === 'resourceNotFound'){
            res.status(404).json({message: 'resource not found'})
        }else if(err.name === 'accessDenied'){
            res.status(401).json({message: 'no access for this action'})
        }else {
            res.status(500).json({message: 'error from the server'})
        }
    }
}

module.exports = errorHandler