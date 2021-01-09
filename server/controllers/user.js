const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

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

      return res.status(200).json({
        accessToken: token,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      return res.status(422).send({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.register = async (req, res, next) => {
  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.create(body);

    const data = {
      id: user.id,
      email: user.email,
    };

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  const { idToken } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payloadGoogle = ticket.getPayload();
    const email = payloadGoogle.email;

    const isUser = await User.findOne({ where: { email: email } });

    if (!isUser) {
      const body = {
        firstName: payloadGoogle.given_name,
        lastName: payloadGoogle.family_name,
        email: email,
        password: (Math.random() * 1000).toString() + 'password',
      };
      const newUser = await User.create(body);

      const payloadNewUser = {
        userId: newUser.id,
        userEmail: newUser.email,
      };

      const token = jwt.sign(payloadNewUser, process.env.JWT_SECRET);

      return res.status(200).json({
        accessToken: token,
        firstName: payloadGoogle.given_name,
        lastName: payloadGoogle.family_name,
      });
    } else {
      const payloadUser = {
        userId: isUser.id,
        userEmail: isUser.email,
      };

      const token = jwt.sign(payloadUser, process.env.JWT_SECRET);

      return res.status(200).json({
        accessToken: token,
        firstName: payloadGoogle.given_name,
        lastName: payloadGoogle.family_name,
      });
    }
  } catch (error) {
    next(error);
  }
};
