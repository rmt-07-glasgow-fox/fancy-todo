function errorHandler (err, req, res, next) {
    if (err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({message: "Due date must be later than today"})
        } else if (err.name === 'notFound') {
            res.status(404).json({message: "not found"})
        } else {
            res.status(500).json({err})
        }
    } 
}

module.exports = errorHandler