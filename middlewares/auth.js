const { checkToken } = require('../helpers/jwt.js');
const { User, Todo } = require('../models');

async function authenticate(req, res, next) {
  try { 
    let decoded = checkToken(req.headers.access_token);
    const find = await User.findOne({
      where: {email: decoded.email}
    });
    if(!find) {
      return res.status(401).json({ message: 'Please login first' });
    } 
    else {
      req.userId = find.id;
      next();
    }
  } 
  catch(err) {
    res.status(400).json({ message: err.message });
  }
}

async function authorize(req, res, next) {
  try {
    const id = +req.params.id;
    const todo = await Todo.findOne({ where: { id } });
    if(!todo || todo.UserId !== req.userId) {
      return res.status(401).json({ message:  'Not authorized'});      
    }
    else {
      next();
    }
  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  authenticate,
  authorize
};