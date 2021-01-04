const { User } = require('../models');

class UserController {
    static homepage(req, res) {
        res.send('Hello World')
    }
}

module.exports = UserController