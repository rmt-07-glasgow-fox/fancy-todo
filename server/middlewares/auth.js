const { User, Todo } = require('../models/index');
const { cekToken } = require('../helpers/jwt');

async function authentication (req, res, next) {
    try {
        if (req.headers.token) {
            let data = cekToken(req.headers.token);
    
            data = await User.findByPk(data.id);
    
            if (data) {
                next();
            } else {
                res.status(401).json({ msg: 'You must logged in!!!' });    
            }
        } else {
            res.status(401).json({ msg: 'You must logged in!!!' });
        }
    } catch (err) {
        res.status(500).json('Server Error');
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