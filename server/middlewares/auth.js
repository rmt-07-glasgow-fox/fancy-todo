const { checkToken } = require('../helpers/jwt.js');
const { User, Todo } = require('../models/index.js');

let authenticate = async (req, res, next) => {
  try {
    const decoded = checkToken(req.headers.access_token);
    const userFindOne = await User.findOne({ where: { email: decoded.email } })

    if (!userFindOne) {
      res.status(401).json({ message: 'please login first' });
    } else {
      req.user = userFindOne;
      next();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

let authorize = async (req, res, next) => {
  try {
    const todoFindOne = await Todo.findOne({ where: { id: Number(req.params.id) } })
    if (!todoFindOne) {
      res.status(404).json({ message: 'ToDo list not found.' })
    } else if (todoFindOne.UserId !== req.user.id) {
      res.status(401).json({ message: 'You don\'t have authorization to such request.' });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  };
};

module.exports = { authenticate, authorize };