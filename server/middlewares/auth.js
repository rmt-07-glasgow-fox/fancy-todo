const { checkToken } = require('../helpers/jwt.js');
const { User, Todo } = require('../models');

function authenticate(req, res, next) {
  try {
    const decoded = checkToken(req.headers.access_token);
    User.findOne({ where: { id: decoded.id } })
      .then(dataUser => {
        if (!dataUser) {
          throw { name: 'invalidEmailPassword' }; // 401
        } else {
          // Save user id to req middleware
          req.user = {
            id: dataUser.id
          }
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  } catch (err) {
    next(err);
    // res.status(400).json({ message: err });
  }
}

function authorize(req, res, next) {
  const id = req.params.id;
  const idUser = req.user.id;
  Todo.findOne({ where: { id } })
    .then(dataTodo => {
      console.log(dataTodo);

      if (!dataTodo) {
        throw { name: 'resourceNotFound' };
      } else if (dataTodo.UserId !== idUser) {
        throw { name: 'forbidden' };
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
}

module.exports = { authenticate, authorize };