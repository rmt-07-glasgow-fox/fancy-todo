const errorHandlers = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            let errorMessages = err.errors.map( err => ({
                message: err.message,
                column: err.path
            }))
            res.status(400).json(errorMessages)
            break;
        case "resourceNotFound":
            res.status(404).json({ message: "error not found"})
            break;
        case "userIdNotMatch":
            res.status(403).json({ message: "This Todo not belong to your Username"})
            break;
        case "failedSignIn":
            res.status(400).json({ message: "Invalid Email / Password"})
            break;
        case "invalidAccessToken":
            res.status(401).json({ message: "Please SignUp or SignIn first"})
            break;
        default:
            res.status(500).json({ message: "Internal Server Error"})
            break;
    }

}

module.exports = errorHandlers