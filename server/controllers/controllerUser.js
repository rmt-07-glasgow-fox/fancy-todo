const { User } = require('../models')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const { noExtendLeft } = require('sequelize/types/lib/operators')


class ControllerUser {

    static register(req,res,next){
        const obj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static login(req,res,next){
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data){
                if(compare(req.body.password,data.password)){
                    const access_token = generateToken({id: data.id, email:data.email})
                    res.status(200).json({ access_token })
                } else {
                    throw {
                        status: 404,
                        message: "wrong email/password"
                    }
                } 
            } else {
                throw {
                    status: 404,
                    message: "wrong email/password"
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = ControllerUser