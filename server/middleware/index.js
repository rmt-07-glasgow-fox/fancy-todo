const { authUser } = require('./authentication')

const { authorUser } = require('./authorization')

const { errorHandler } = require('./errorHandler') 


module.exports = {
    authUser,
    authorUser,
    errorHandler
}