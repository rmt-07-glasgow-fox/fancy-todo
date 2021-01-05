const bcrypt = require('bcryptjs')

let hash = (payload) => {
  let salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(payload, salt)
}

let compared = (payload, hashed) => {
  return bcrypt.compareSync(payload, hashed)
}

module.exports = { hash, compared }