const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            console.log(err);
            let error = []
            err.errors.map(err => {
                return error.push(err.message)
            })
            res.status(400).json({ errors: error })
            break;
        case "ResourceNotFound":
            res.status(404).json({ errors: [ err.name ] })
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ errors: [ err.name ] })
            break;
        case "InvalidUser" || "please login first":
            res.status(401).json({ errors: [ err.name ] })
            break;
        case "SequelizeDatabaseError":
            res.status(400).json({ errors: [ err.name ] })
            break;
        default:
            res.status(500).json({ errors: [ err.name ] })
            break;
    }
}

module.exports = errorHandler