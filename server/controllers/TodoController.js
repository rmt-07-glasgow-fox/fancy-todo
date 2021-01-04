const model = require('../models');

class Controller {
    static homepage(req, res) {
        res.send('Hello World')
    }
}

module.exports = Controller;