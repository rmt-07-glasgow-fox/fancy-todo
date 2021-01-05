const { User } = require('../models');

exports.login = async (req, res) => {};

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
