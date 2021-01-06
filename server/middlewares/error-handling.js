function errorHandle(err, req, res, next) {
    if(err) {
        res.status(err.code).json(err)
    }
}

module.exports = errorHandle