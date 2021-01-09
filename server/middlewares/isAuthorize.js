const { Todo, Project } = require('../models');

const isAuthorize = async(req, res, next) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        const project = await Project.findByPk(req.params.id);


        if (todo) {
            if (!todo || todo.userId !== req.user.id) {
                return next({ name: "unauthorize" })
            }
        }

        if (project) {
            if (!project || project.ownerId !== req.user.id) {
                return next({ name: "unauthorize" })
            }
        }

        return next();
    } catch (err) {
        return next(err)
    }
}

module.exports = isAuthorize