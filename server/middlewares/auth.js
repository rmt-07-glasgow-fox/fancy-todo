const { User, Todo } = require('../models')
const { checkToken } = require('../helper/jwt')

async function authenticate(req, res, next){
    try{
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if(!find){
            res.status(401).json({ message: 'Please login first'})
        } else {
            req.user = find.id
            next()
        }
    } catch(err){
        res.status(400).json({ message: err.message})
    }
}

async function authorize (req, res, next) {
   try {
        let data = await Todo.findOne ({
            where: {
                id: +req.params.id
            }
        })

        if(data.user_id === +req.user){
            next ()
        } else {
            res.status(401).json({ message: 'Not authorized'})
        }
    } catch (err) {
        next (err)
    }
}
 
module.exports = { authenticate, authorize }