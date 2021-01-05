const { checkToken } = require('../helpers/jwt')
const { Todo, User } = require('../models')

async function authentication(req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token)
        // console.log(decoded)
        let find = await User.findOne({where: { email: decoded.email}})
        // res.send(find)
        if(!find) {
            res.status(401).json({message: "Please login first"})
        } else {
            req.user = find
            // console.log(find)
            next()
        }
    }
    catch (err) {
        res.status(500).json({message: "Internal Server Error"})
    }
    // next()
}

function authorization(req, res, next) {

    Todo.findOne({where: {
        id: req.params.id
    }})
        .then(data => {
            console.log(data)
            if(!data || data.UserId !== req.user.id) {
                res.status(401).json({message: "No Authorization"})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message: "Internal Server Error"})
        })
    

}

module.exports = {
    authentication,
    authorization
}