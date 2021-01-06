const { cekToken } = require('../helpers/jwt')
const { user, todo } = require('../models/index')

class Auth {
    static authentication(req, res, next) {
        try {
            let decoded = cekToken(req.headers.access_token)
            // console.log(decoded.email);
            user.findOne({
                where: { email: decoded.email }
            })
            .then( data => {
                if(!data) {
                    res.status(401.).json({msg : 'Please Login First'})
                } else {
                    req.user = data
                    next()
                }
            })
            .catch(err => {
                res.status(500).json({msg : err.message})
            })
        } catch (err) {
            res.status(400).json({msg: err.message})            
        }
    }

    static authorization (req, res, next) {
        const id = +req.params.id
        const userData = +req.user.id

        todo.findByPk(id)
        .then(data => {
            if(!data){
                res.status(404).json({msg : 'Data Todo Not Found'})
            } else if(userData !== data.UserId){
                res.status(403).json({msg : 'You dont have access'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({msg : err.message})
        })
    
    }
}



module.exports = Auth