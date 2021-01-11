const { Project, ProjectUser, User } = require('../models');

exports.listProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectUser = await ProjectUser.findAll({
      where: { UserId: userId },
      include: [Project],
    });
    return res.status(200).json(projectUser);
  } catch (err) {
    next(err);
  }
};

exports.invite = async (req, res, next) => {
  try {
    const { email, projectId } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return next({ name: 'NotFound' });
    } else {
      const body = {
        ProjectId: Number(projectId),
        UserId: user.id,
      };
      await ProjectUser.create(body);
      return res.status(201).json({ message: 'ok' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.destroy = async (req, res, next) => {};
