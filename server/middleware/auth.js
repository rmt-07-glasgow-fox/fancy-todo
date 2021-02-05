const { checkToken } = require('../helper/jwt')
const { User, Todo } = require('../models/index')

function authenticate(req, res, next)  {
    //cek token
    try {
        let decoded = checkToken(req.headers.access_token)
        User.findOne({
            where : {
                email: decoded.email 
            }
        })
        .then(userLogin => {
            if (!userLogin) {
                next({
                    name: "please login first" 
                })
            } else {
                req.user = {
                    id: userLogin.id
                }
                next()
            }
        })
        .catch(err => {
            next(err.message)
        })
        
    } catch (err) {
        // console.log(err.name);
        next({
            name: "please login first" 
        })
        
    }
}

function authorize(req, res, next) {
    Todo.findOne({
        where : {
            id: +req.params.id
        }
    })
    .then(data => {
        if (!data) {
            next({
                name: "ResourceNotFound" 
            })
        } else {
            if (data.userId === +req.user.id) {
                next()
            } else {
                next({
                    name: "unauthorize" 
                })
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { 
    authenticate,
    authorize
}