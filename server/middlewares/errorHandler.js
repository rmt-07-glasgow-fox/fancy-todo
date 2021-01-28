const errorHandler = (err, req, res, next) => {
    // err.errors ?
    // res.status(400).json(err) :
    let statusCode = 500
    let message = 'Internal Server Error'
    switch (err.name) {
        case 'SequelizeValidationError':
            let errMsg = err.errors.map(err => err.message)
            statusCode = 400
            message = errMsg
            break;
        case 'SequelizeDatabaseError':
            statusCode = 400
            message = err.message
            break;
        case 'SequelizeUniqueConstraintError':
            statusCode = 400
            message = `${err.errors[0].value} already exists`
            break;
        case 'NotFoundError':
            statusCode = 404
            message = 'Data Not Found!'
            break;
        case 'ForbiddenError':
            statusCode = 403
            message = 'You dont have access!'
            break;
        case 'UnauthorizedError':
            statusCode = 401
            message = 'You are Unathorized'
            break;
        case 'CustomError':
            statusCode = err.statusCode
            message = err.message
            break
        default:
            let errMsgs = err.errors && err.errors.map(err => err.message) || 'Something is wrong!'
            err.errors && (statusCode = 400, message = errMsgs) //other error
            break;
    }
    statusCode === 500 && console.log(err.stack)
    res.status(statusCode).json({message})
}

module.exports = errorHandler