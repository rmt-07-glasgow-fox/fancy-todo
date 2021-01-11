const { User, Todo } = require('../models');
const { checkToken } = require('../helpers/jwt');

const authenticate = async (req, res, next) => {
    try {
        let decoded = checkToken(req.headers.access_token);
        let output = await User.findOne({where: {email: decoded.email}})
        if (output) {
            req.user = {id: output.id};
            next();
        } else {
            throw {name: 'PleaseLogin'}
        }
 
    } 
    catch(err) {
        next(err)
    }
}

const authorize = async (req, res, next) => {
    try {
        let output = await Todo.findOne({where: {id: req.params.id}})
        if (output && output.UserId === req.user.id) {
            next();
        } else {
            throw {name: 'Unauthorized'}
        }
    } 
    catch(err) {
        next(err);
    }
}

module.exports = {authenticate, authorize}