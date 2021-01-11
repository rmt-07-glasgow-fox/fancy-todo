const { verifyToken } = require('../helpers/jwt');
const { User, ToDo } = require('../models');

async function authentication(req, res, next) {
  try {
    const authParams = verifyToken(req.headers.access_key);
    const user = await User.findOne({ where: { email: authParams.email } });
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    const todo = await ToDo.findOne({ where: { id: +req.params.id } });
    if (!todo) {
      next({ name: 'resourceNotFound' });
    } else if (todo.UserId !== req.user.id) {
      next({ name: 'accessDenied' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { authentication, authorization };
