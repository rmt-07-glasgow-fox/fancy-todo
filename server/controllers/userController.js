const { User } = require('../models');

class userController {
  static registerHandler(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then(dataUser => {
        console.log(dataUser);
        const returnDataUser = {
          id: dataUser.id,
          email: dataUser.email
        }
        return res.status(201).json(returnDataUser);
      })
      .catch(err => {
        if (err.message) {
          return res.status(500).json({ message: err.message });
        }
        return res.status(400).json(err);
      });
  }

  static loginHandler(req, res) {
    const { email, password } = req.body;

  }
}

module.exports = userController