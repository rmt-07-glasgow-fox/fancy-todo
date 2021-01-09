const { User, Project, UserProject } = require('../models');

class ProjectController {
    static async getAll(req, res, next) {
        try {
            const data = await User.findByPk(req.user.id, {
                include: ['project'],
                attributes: { exclude: ['createdAt', 'updatedAt', , 'password'] },
            })

            res.status(200).json({
                message: 'success',
                data: data.project
            })
        } catch (error) {
            next(error);
        }
    }

    static async store(req, res, next) {
        try {
            const { title_project, description_project, status } = req.body;
            const input = { title: title_project, description: description_project, status, ownerId: req.user.id };
            const data = await Project.create(input);

            const inputUserProject = { userId: req.user.id, projectId: data.id }
            await UserProject.create(inputUserProject)

            return res.status(201).json({
                status: 'success',
                data
            })
        } catch (err) {
            return next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const { id_project, title_project, description_project, status } = req.body;
            const input = { title: title_project, description: description_project, status, ownerId: req.user.id };

            const data = await Project.findByPk(id_project, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!data) return next({ name: 'notFound' })

            await Project.update(input, { where: { id: id_project } })
            await data.reload();

            return res.status(200).json({
                status: 'success',
                message: 'project updated successfully',
                data
            })

        } catch (err) {
            return next(err)
        }
    }

    static async destroy(req, res) {
        try {
            const data = await Project.findByPk(+req.params.id);

            if (!data) return next({ name: 'notFound' })

            data.destroy();

            return res.status(200).json({
                status: 'success',
                message: 'project successfully deleted'
            })

        } catch (err) {
            return next(err)
        }
    }
}

module.exports = ProjectController;