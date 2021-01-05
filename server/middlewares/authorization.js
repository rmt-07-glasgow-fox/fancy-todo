const { Todo } = require('../models')

const authorization = (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.userData.id
        Todo
            .findByPk(+id)
            .then(data => {
                !data ? res.status(404).json({message: 'Data Not Found!'}) :
                userId !== data.UserId ? res.status(403).json({message: 'You dont have access'}) :
                next()
            })
            .catch(err => res.status(500).json({message: err.message}))
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = authorization