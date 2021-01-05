const { User } = require('../models')

const { getToken } = require('../helper/jwt')
const { comparePass } = require('../helper/bcrypt')

class Controller {
    static login (req, res, next) {
        let userId = +req.params.id
        let pass = req.body.password
        
        User.findByPk(userId)
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message : 'Error not found'
                })
            } else if (comparePass(pass, data.password)){
                let checkAccess = getToken( {
                    id : data.id,
                    email : data.email,
                })

                res.status(200).json({checkAccess})    
            } else {
                res.status(401).json({
                    message : 'invalid email / password'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res, next) {

    }
}

module.exports = Controller