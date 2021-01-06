const bcrypt = require('bcryptjs')

const hashPwd = userPwd => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPwd, salt);
  return hash
}

const comparePwd = (userPwd, hashedPwd) => {
 return bcrypt.compareSync(userPwd, hashedPwd)
}

module.exports = {
  hashPwd,
  comparePwd
}