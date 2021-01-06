const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            console.log(err);
            let errMsg = err.errors.map(err => {
                return {
                    message: err.message
                }
            })
            res.status(400).json(errMsg)
            break;
        case "ResourceNotFound":
            res.status(404).json(err)
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json([{ message: err.message }])
            break;
        case "InvalidUser" || "please login first":
            res.status(401).json(err)
            break;
        default:
            res.status(500).json(err)
            break;
    }
}

module.exports = errorHandler