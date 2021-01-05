function errorHandler (err, req, res, next) {
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                const errorMessages = err.errors.map (el => {
                    return el.message
                })

                res.status (400).json ({ errorMessages })
            break;

            case "SequelizeUniqueConstraintError":
                res.status (400).json ({ errorMessages: err.errors[0].message })
            break;

            case "JsonWebTokenError":
                res.status (400).json ({ errorMessages: err.message })
            break;

            case "FromAuth":
                res.status (400).json ({ errorMessages: err.message })
            break;

            case "Unauthorized":
                res.status (401).json ({ errorMessages: err.message })
            break;

            case "NotLoggedIn":
                res.status (401).json ({errorMessages: err.message })
            break;

            case "ResourceNotFound":
                res.status (404).json ({ errorMessages: "Error Not Found" })
            break;

            case "InternalError":
                res.status (500).json ({ errorMessages: err.message })
            break;

            default:
                res.status (500).json ({ errorMessages: err.message })
            break

        }
    }
}

module.exports = {
    errorHandler
}