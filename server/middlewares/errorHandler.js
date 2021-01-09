const errorHandler = (err, req, res, next) => {
    switch(err.name) {
        case "SequelizeValidationError":
        let errorMsg = err.errors.map(err => {
            return {
                message: err.message
            }
        })
        res.status(400).json(errorMsg)
        break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({
                message: err.message
            })
        break;
        case "resourceNotFound" :
            res.status(404).json({
                message: 'error not found'
            })
        break;
        case "please login first":
            res.status(401).json({
                message: 'you must login'
            })
        break;  
        default:
            res.status(500).json(err)
        break;
    }
}

module.exports = errorHandler