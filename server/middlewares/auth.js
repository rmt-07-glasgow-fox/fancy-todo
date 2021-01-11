const { chkToken } = require('../helpers/jwt.js');
const { User, Todo } = require('../models/index.js');

let authenticate = async (req, res, next) => {
  try {
    const decoded = chkToken(req.headers.access_token);
    const user = await User.findOne({ where: { email: decoded.email } })

    if (!user) {
      throw { name: `Unauthorized` };
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  };
};

let authorize = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ where: { id: Number(req.params.id) } })
    if (!todo) {
      throw { name: `NotFound` };
    } else if (todo.UserId !== req.user.id) {
      throw { name: `Unauthorized` };
    } else {
      next();
    };
  } catch (err) {
    next(err);
  };
};

module.exports = { authenticate, authorize };