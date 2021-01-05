const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class Controller {
    static register (req, res, next){
        let obj = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password
        }
        User.create(obj)
        .then(data =>{
            let response = {
                id: data.id,
                email: data.email
            }
            return res.status(201).json(response)
        })
        .catch(err =>{
            next(err)
        })
    }

    static login(req, res, next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: obj.email}})
        .then(data =>{
            if(!data){
                next({name: 'accessDenied'})
            } else {

                let match = compare(obj.password, data.password)
                //console.log(match)
                if(match){
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    //console.log(payload)
                    let accessToken = generateToken(payload)
                    return res.status(200).json({
                        accessToken: accessToken
                    })
                }else {
                    next({name: 'accessDenied'})
                }
            }
        })
        .catch(err =>{
            //console.log(err)
            next(err)
        })
    }
}

module.exports = Controller