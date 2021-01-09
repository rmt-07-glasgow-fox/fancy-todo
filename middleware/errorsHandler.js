function errorHandler(err, req, res, next) {
    let errors = []
    switch (err.name) {
        case 'SequelizeValidationError':
            errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.status(400).json(errors)

            break;
        case 'SequelizeUniqueConstraintError':
            errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.status(400).json(errors)

            break;
        case 'notFound':
            res.status(404).json({message:'Not found'})

            break;
        case 'unauthorized':
            res.status(401).json({message:'Invalid authorized'})

            break;
        default:
            if (err.name) {
                res.status(500).json({message:'Internal server error'})
            } else {
                res.status(401).json({message:'Unknown error'})
            }

            break;
    }
}

module.exports = errorHandler