const bcrypt = require('bcryptjs');

exports.hashPassword = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};

exports.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
