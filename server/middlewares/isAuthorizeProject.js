const { Project } = require('../models');

const isAuthorize = async(req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);


        if (!project || project.ownerId !== req.user.id) {
            return next({ name: "unauthorize" })
        }

        return next();
    } catch (err) {
        return next(err)
    }
}

module.exports = isAuthorize