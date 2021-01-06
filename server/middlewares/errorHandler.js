function errorHandler (err, req, res, next) {
    if (err) {
        switch(err.name) {
            case 'SequelizeValidationError':
                let errors = []
                for (let i = 0; i < err.errors.length; i++) {
                    errors.push(err.errors[i].message)
                }
                res.status(400).send(errors)
                break;
            case 'Not Found':
                res.status(404).json({ message: 'Not Found' })
                break;
            case 'Invalid Input':
                res.status(400).json({ message: 'Invalid Input'})
                break
            case 'Unauthorized':
                res.status(401).json({ message: `Unauthorized`})
                break
            default:
                res.status(500).json({ message: 'Internal Server Error'})

        }
    }
}

module.exports = {
    errorHandler
}