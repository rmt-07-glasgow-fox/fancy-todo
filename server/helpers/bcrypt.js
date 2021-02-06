const bcrypt = require('bcryptjs');

const hashPass = pass => bcrypt.hashSync(pass, 5);

const comparePass = (inputPass, dbPass) => bcrypt.compareSync(inputPass, dbPass);

module.exports = { hashPass, comparePass }