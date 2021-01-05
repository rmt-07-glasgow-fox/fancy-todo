const { User, Todo } = require('../models')
const { checkToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    try {
        const decoded = checkToken(req.headers.access_token)
        const email = decoded.email
        let find = await User.findOne({where : {email}})
        if (find) {
            req.user = find
            next()
        } else {
            req.status(401).json({message : "Please SignUp or SignIn first"})
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

async function authorization(req, res, next) {
    try {
        let id = req.params.id
        let find = await Todo.findOne({ where: { id } })
        if (!find || find.UserId !== req.user.id) {
            res.status(401).json({ message : "This Todo not belong to your Username"})
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

module.exports = {
    authentication, 
    authorization
}