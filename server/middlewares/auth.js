const { checkToken } = require ("../helpers/jwt")
const { User, Todo } = require ("../models")

cekLogin = async (req, res, next) => {
    try {
        let decoded = checkToken (req.headers.access_token)
        let user = await User.findOne ({ where: {
                email: decoded.email
            }
        })
        if (!user) {
            next ({ name: "NotLoggedIn", message: "You Must Login First" })
        } else {
            req.user = user
            next ()
        }
    } catch (err) {
        next (err)
    }
}

authorization = (req, res, next) => {
    const id = req.params.id

    Todo.findOne ({ 
        where: {
            id
        }
    })
    .then (result => {
        if (result.UserId === req.user.id) {
            next ()
        }  else {
            next({name: "Unauthorized" , message: "You Have No Authorization to Make Changes When It Is Not Yours"})
        }
    })
    .catch (err => {
        next ({ name: "FromAuth", message: err.message })
    })
}

module.exports = {
    cekLogin,
    authorization
}