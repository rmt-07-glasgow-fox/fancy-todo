
const errorHandler = (err, req, res, next) => {
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                let errorMessages = err.errors.map(err => {
                    return {
                        message: err.message,
                        column: err.path
                    }
                })
                res.status(400).json(errorMessages)
                break
            case "ResourceNotFound":
                res.status(404).json({ message: "Not found." })
                break
            case "AuthorisationError":
                res.status(401).json({ message: "Not authorised." })
            //case "axiosError":
            //break
            default:
                res.status(500).json({
                    message: "Internal server error."
                })
                break
        }
    }
}

module.exports = errorHandler
