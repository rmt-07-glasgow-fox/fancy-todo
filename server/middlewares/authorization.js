const { Todo } = require('../models')

const authorization = (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.userData.id
        Todo
            .findByPk(+id)
            .then(data => {
                !data ? next({name: 'NotFoundError'}) :
                userId !== data.UserId ? next({name: 'ForbiddenError'}) :
                next()
            })
            .catch(err => next(err))
    } catch (err) {
        next(err)
    }
}

module.exports = authorization