const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}
let compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}
module.exports = {hashPassword, compare}