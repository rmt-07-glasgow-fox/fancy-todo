const { cekToken } = require("../helpers/generateToken")
const { Todo, User } = require('../models')

const authentication = (req, res, next) => {
    try {
        let decoded = cekToken(req.headers.access_token)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(data => {
            if (!data) {
                res.status(401).json({ message: "Please Login First" })
            } else {
                req.user = data
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        })
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const authorization = (req, res, next) => {
    let id = +req.params.id
    Todo.findByPk(id)
    .then(data => {
        if(data.UserId == req.user.id){
            next()
        } else {
            res.status(401).json({message: "You not Unauthorized"});
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}

module.exports = {authentication, authorization}