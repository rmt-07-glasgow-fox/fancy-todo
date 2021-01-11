const { Project, ProjectUser } = require('../models');

exports.list = async (req, res, next) => {};

exports.create = async (req, res, next) => {
  const bodyProject = {
    name: req.body.name,
    status: req.body.status,
    CreatorId: req.user.id,
  };

  try {
    const project = await Project.create(bodyProject);

    const bodyProjectUser = {
      ProjectId: project.id,
      UserId: req.user.id,
    };
    await ProjectUser.create(bodyProjectUser);
    return res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const isFound = await Project.findOne({
      where: { id: id, CreatorId: userId },
    });
    if (!isFound) return next({ name: 'NotFound' });
    else {
      await Project.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Project success to delete' });
    }
  } catch (err) {
    next(err);
  }
};
