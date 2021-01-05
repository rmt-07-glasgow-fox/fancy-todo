const { Todo } = require('../models');

const isAuthorize = async(req, res, next) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo || todo.userId !== req.user.id) {
            next({ name: "unauthorize" })
        }

        return next();
    } catch (err) {
        return next(err)
    }
}

module.exports = isAuthorize