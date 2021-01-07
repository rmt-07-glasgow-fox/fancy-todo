const { checkToken } = require('../helpers/jwt.js');
const { User, Todo } = require('../models');

async function authenticate(req, res, next) {
  try { 
    let decoded = checkToken(req.headers.access_token);
    const find = await User.findOne({
      where: {email: decoded.email}
    });
    if(!find) {
      next({ name: 'Please login first' });
    } 
    else {
      req.userId = find.id;
      next();
    }
  } 
  catch(err) {
    next(err);
  }
}

async function authorize(req, res, next) {
  try {
    const id = +req.params.id;
    const todo = await Todo.findOne({ where: { id } });
    if(!todo || todo.UserId !== req.userId) {
      next({ name:  'Not authorized'});      
    }
    else {
      next();
    }
  }
  catch (err) {
    next(err);
  }
}

module.exports = {
  authenticate,
  authorize
};