const errorHandlers = (err, req, res, next) => {
    if (err) {
        // console.log(err)
        console.log('>>> err.name : ', err.name)

        if (err.name === "SequelizeValidationError") {
            let errorMessages = err.errors.map(error => error.message)
            console.log(errorMessages)
            return res.status(400).json({ message: errorMessages })
        }

        if (err.name === "SequelizeUniqueConstraintError") {
            let errorMessages = err.errors.map(error => error.message)
            console.log(errorMessages)
            return res.status(400).json({ message: errorMessages })
        }

        if (err.name === "JsonWebTokenError") {
            let errorMessages = err.message
            console.log(errorMessages)
            return res.status(401).json({ message: errorMessages })
        }

        if (err.name === '401') {
            let errorMessages = 'Unauthorized'
            console.log(errorMessages)
            return res.status(401).json({ message: errorMessages })
        }

        if (err.name === '403') {
            let errorMessages = `It doesn't belongs to user`
            console.log(errorMessages)
            return res.status(403).json({ message: errorMessages })
        }

        if (err.name === '404') {
            let errorMessages = 'Not found'
            console.log(errorMessages)
            return res.status(404).json({ message: errorMessages })
        }

        let errorMessages = 'Internal server error'
        return res.status(500).json({ message: errorMessages })
        // return res.send(err)
    }
}

module.exports = errorHandlers