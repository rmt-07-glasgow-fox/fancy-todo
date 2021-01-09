const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models');

async function authentication(req, res, next) {
  try {
    const authParams = verifyToken(req.headers.access_token);
    const currentUser = await User.findOne({
      where: {
        id: authParams.id,
        email: authParams.email,
      },
    });
    if (!currentUser) {
      return next({
        name: "UnregisteredUser"
      })
    }
    req.user = currentUser;
    next();
  }
  catch {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    const idTodo = req.params.id;
    const userId = req.user.id;
    const todo = await Todo.findOne({
      where: {
        id: idTodo,
      },
    });
    if(!todo) {
      next({
        name: "NotFound"
      });
    }
    else if (todo.UserId === userId) {
      next();
    }
    else {
      next({
        name: "Unauthorized"
      });
    }
  }
  catch {
    next(err);
  }
}

module.exports = {
  authentication,
  authorization
};