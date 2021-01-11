const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            if (err.errors.length > 0) {

                const validate = err.errors.map(el => {
                    return el.message
                })

                res.status(400).json({
                    status: 'error',
                    message: validate
                })
            }
            break;
        case "SequelizeUniqueConstraintError":
            if (err.errors.length > 0) {

                const validate = err.errors.map(el => {
                    return el.message
                })

                res.status(400).json({
                    status: 'error',
                    message: validate
                })
            }
            break;
        case "cannotDeleteSelf":
            res.status(400).json({
                status: 'error',
                message: 'ups, you cannot kick your self in your project'
            })
            break;
        case "authValidate":
            res.status(401).json({
                status: 'error',
                message: 'invalid email or password'
            })
            break;
        case "unauthorize":
            res.status(403).json({
                status: 'error',
                message: 'forbidden access!'
            })
            break;
        case "notFound":
            res.status(404).json({
                status: 'error',
                message: 'not found'
            })
            break;
        default:
            res.status(500).json({
                status: 'error',
                message: err.message
            })
            break;
    }
}

module.exports = errorHandler