const errorHandler = (err, req, res, next) => {
    console.log(err)
    switch(err.name) {
        case 'SequelizeValidationError':
            res.status(400).json(err.errors.map(err => {
                return {message: err.message}
            }));
            break;
        case 'NotFound':
            res.status(404).json({message: 'Not Found'});
            break;
        case 'InvalidInput':
            res.status(400).json({message: 'Wrong email or password'});
            break;
        case 'InternalServerError':
            res.status(500).json({message: 'Internal server error'});
            break;
        // default:
    }
}

module.exports = errorHandler;