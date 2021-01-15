const { checkToken } = require("../helpers/jwt");
const { User, Todo } = require("../models");

async function authenticate(req, res, next) {
  try {
    if(!req.headers.access_token){
      next({
        name: "NoToken"
      })
    }
    // decode access_token dan ambil datanya
    let decoded = checkToken(req.headers.access_token);


    let currentUser = await User.findOne({
      where: {
        id: decoded.id,
        username: decoded.username,
        fullName: decoded.fullName,
        email: decoded.email,
      },
    });

    //if user from decoded data doesn't exist in database
    if (!currentUser) { 
      return next({
        name: "UnregisteredUser"
      })
    }
    req.user = currentUser;
    next();
  } catch (err) {
    next(err)
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
