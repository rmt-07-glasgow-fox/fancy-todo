const { checkToken } = require('../helpers/jwt.js');
const { User } = require('../models');

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
        console.log(err);
        res.status(500).json({ error: err.name, message: err.message });
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

function authorize(req, res, next) {
  console.log(req.user, 'REQ USERRRRRRRRRRRRRRRRRRR');
  const id = req.params.id
  // todo.findOne({ where: { id } })

}

module.exports = { authenticate, authorize };