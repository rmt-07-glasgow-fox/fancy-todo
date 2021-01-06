const { cekToken } = require('../helper/jwt')
const { User, todoList  } = require('../models')

async function authenticate (req, res, next) {
    try {
        let decoded = cekToken(req.headers.access_token)
        const find = await User.findOne({ where: {
            email: decoded.email
        }})
        if (!find) {
            res.status(401).json({
                msg: 'Please login'
            })
        } else {
            req.user = find
            next()
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

async function authorize (req, res, next) {
        console.log(req.user);
        todoList.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if(!data || data.UserId !== req.user.id) { 
                res.status(401).json({
                    msg: 'Your Account is not Allowed!'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}

module.exports = { authenticate, authorize }