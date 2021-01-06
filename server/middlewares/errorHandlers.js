function errorHandlers(err, req, res, next) {
    console.log(err);
    switch (err.name) {
        case 'SequelizeValidationError':
            let eror = []
            err.errors.forEach(e => {
                eror.push(e.message)
            });
            return res.status(400).json(eror)
        case 'JsonWebTokenError':
            return res.status(401).json({message: err.message})
        case 'NotLogin':
            return res.status(401).json({message: err.message})
        case 'NotOwn':
            return res.status(401).json({message: err.message})
        case 'WrongInput':
            return res.status(401).json({message: err.message})
        case 'NotFound':
            return res.status(404).json({message: err.message})
        default:
            return res.status(500).json({message: 'internal server error'})
    }
}

module.exports = errorHandlers