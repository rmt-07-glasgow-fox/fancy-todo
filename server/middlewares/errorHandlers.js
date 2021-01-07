errorHandlers = (err, req, res, next) => {
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                console.log(err.errors[0].message);
                const errMsg = err.errors.map( el => {
                    return { message: el.message }
                } )
                res.status(400).json(errMsg)
                break;
            case "loginFailed":
                res.status(400).json({ message: 'Invalid email/ password' })
                break;
            case "notLogin":
                res.status(401).json({
                    message: 'Please login first',
                    description: 'JWT success but UserId not found'
                })
                break;
            case "JsonWebTokenError":
                res.status(401).json({
                    message: 'Please login first',
                    description: 'JWT error (not provided or malformed)'
                })
                break;
            case "unauthorized":
                res.status(401).json({ message: 'Unauthorized to change data' })
                break;
            case "todoNotFound":
                res.status(404).json({ message: 'Todo not found' })
                break;
            default:
                console.log(err);
                // res.status(500).json({
                //     message: "Internal Server Error"
                // })
                break;
        }
    }
}

module.exports = errorHandlers