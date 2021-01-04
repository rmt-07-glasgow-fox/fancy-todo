const { User } = require('../models');

class Controller {
    static homepage(req, res) {
        res.send("Hello World")
    }

    static register(req, res) {

    }

    static login(req, res) {

    }
}   

module.exports = Controller;