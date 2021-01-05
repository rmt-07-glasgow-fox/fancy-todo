const {checkToken} = require("../helpers/jwt")
const {User, Todo} = require("../models")

function authentication (req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token, 'wrong-secret');
        User.findOne({where: {email: decoded.email}})
        .then(user => {
            if (!user) {
                res.status(401).json({message: "please login first"})
            } else {
                req.user = user
                next()
            }
        })
        .catch(err => res.status(500).json({message: err.message}))

      } catch(err) {
        res.status(400).json({message: "please login first"})
      }
}

function authorization (req, res, next) {
    Todo.findByPk(+req.params.id)
    .then(todo => {
        if (todo.UserId === req.user.id) {
            next()
        } else {
            res.status(400).json({message: "access denied"})
        }
    })
    .catch(err => res.status(500).json({message: err.message}))

}

module.exports = {authentication, authorization}