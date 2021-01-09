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
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {};
