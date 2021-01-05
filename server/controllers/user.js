const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ error: 'Email not found' });
    }

    const isPassword = comparePassword(password, user.password);

    if (isPassword) {
      const payload = { userId: user.id, userEmail: user.email };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).json({ accessToken: token });
    } else {
      return res.status(422).send({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.register = async (req, res) => {
  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.create(body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};
