const { checkToken } = require("../helpers/jwt");
const { User, Todo } = require("../models");

async function authenticate(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token);

    let currentUser = await User.findOne({
      where: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      },
    });

    if (!currentUser) {
      return res.status(401).json({ message: "Please login" });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function authorize(req, res, next) {
  try {
    let dataTodo = await Todo.findOne({
      where: { id: req.params.id },
    });
    if (!dataTodo) {
      next({
        name: "NotFound",
      });
    } else if (dataTodo.UserId === req.user.id) {
      next();
    } else {
      next({
        name: "Unauthorized",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticate, authorize };
