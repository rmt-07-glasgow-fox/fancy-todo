const bcrypt = require('bcryptjs');

let hashPass = userPass => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPass, salt);
  return hash;
};

let compPass = (userPass, dbPass) => bcrypt.compareSync(userPass, dbPass);

module.exports = { hashPass, compPass };