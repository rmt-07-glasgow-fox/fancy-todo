const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class Controller {
    static register (req, res){
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
            return res.status(400).json(err)
        })
    }

    static login(req, res){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: obj.email}})
        .then(data =>{
            if(!data){
                return res.status(401).json({msg:`invalid email/password`})
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
                    return res.status(401).json({
                        msg: `invalid email/password`
                    })
                }
            }
        })
        .catch(err =>{
            console.log(err)
            return res.status(400).json(err)
        })
    }
}

module.exports = Controller