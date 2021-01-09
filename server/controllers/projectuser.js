const { Project, ProjectUser, User } = require('../models');

exports.listProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectUser = await ProjectUser.findAll({
      where: { UserId: userId },
      include: [Project],
    });
    return res.status(200).json(projectUser);
  } catch (error) {
    next(error);
  }
};

exports.invite = async (req, res, next) => {};

exports.destroy = async (req, res, next) => {};
