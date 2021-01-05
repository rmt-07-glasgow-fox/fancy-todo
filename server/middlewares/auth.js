const { checkToken } = require('../helpers/jwt.js');
const { User, Todo } = require('../models/index.js');

let authenticate = async (req, res, next) => {
  try {
    const decoded = checkToken(req.headers.access_token);
    const userFindOne = await User.findOne({ where: { email: decoded.email } })

    if (!userFindOne) {
      throw { name: `Unauthorized` };
    } else {
      req.user = userFindOne;
      next();
    }
  } catch (err) {
    next(err);
  }
};

let authorize = async (req, res, next) => {
  try {
    const todoFindOne = await Todo.findOne({ where: { id: Number(req.params.id) } })
    if (!todoFindOne) {
      throw { name: `NotFound` };
    } else if (todoFindOne.UserId !== req.user.id) {
      throw { name: `Unauthorized` };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  };
};

module.exports = { authenticate, authorize };