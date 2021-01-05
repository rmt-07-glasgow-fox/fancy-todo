const { Todo } = require('../models/index');
const { cekToken } = require('../helpers/jwt');

async function authentication (req, res, next) {
    if (req.headers.token) {
        next();
    } else {
        res.status(401).json({ msg: 'You must logged in!!!' });
    }
}

async function authorization (req, res, next) {
    try {
        if (!req.headers.token) {
            return res.status(401).json({ msg: 'You must logged in!!!' });
        }
    
        let data = cekToken(req.headers.token);
    
        let userId = await Todo.findByPk(req.params.id);
        
        if (userId) {
            userId = userId.userId
        }
    
        if (data.id == userId) {
            next();
        } else {
            return res.status(401).json({ msg: 'Access failed!!!' });
        }
    } catch (err) {
        return res.status(500).json('Server Error');
    }
}

module.exports = { authentication, authorization };