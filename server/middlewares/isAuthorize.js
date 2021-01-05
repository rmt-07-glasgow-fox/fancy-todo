const { Todo } = require('../models');

const isAuthorize = async(req, res, next) => {

    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo || todo.userId !== req.user.id) {
            return res.status(401).json({ message: 'forbidden access!' })
        }

        return next();
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = isAuthorize