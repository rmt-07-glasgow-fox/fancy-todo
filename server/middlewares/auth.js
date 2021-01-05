const { checkToken } = require('../helpers/jwt.js');
const { User,Todo } = require('../models');

function authenticate(req, res, next) {
  try {
    const decoded = checkToken(req.headers.access_token);
    User.findOne({ where: { id: decoded.id } })
      .then(dataUser => {
        if (!dataUser) {
          res.status(401).json({ message: 'Please Login First' });
        } else {
          // Save user id to req middleware
          req.user = {
            id: dataUser.id
          }
          next();
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.name, message: err.message });
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

function authorize(req, res, next) {
  const id = req.params.id;
  const idUser = req.user.id;
  Todo.findOne({ where: { id } })
    .then(dataTodo => {
      if (!dataTodo || dataTodo.UserId !== idUser) {
        res.status(401).json({ message: 'Cannot get access' });
      }else{
        next();
      }
    })
    .catch(err => {
      // "message": "Cannot read property 'UserId' of null"
      res.status(500).json({ error: err.name, message: err.message });
    });
}

module.exports = { authenticate, authorize };