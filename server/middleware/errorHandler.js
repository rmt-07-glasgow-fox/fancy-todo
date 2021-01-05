function errorHandler (err, req, res, next) {
    if(err.status) {
        res.status(err.status).json({
            message : err.message
        })
    }
}

module.exports = {
    errorHandler
}