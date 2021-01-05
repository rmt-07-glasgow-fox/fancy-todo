const { user, Sequelize } =  require('../models/index')
const HelperBcrypt = require('../helpers/bcrypt');
const HelperJWT = require('../helpers/jwt');

class userController {
    static register( req, res) {
        let newRegis = {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }
        // console.log(newRegis);
        let dataUser

        user.create(newRegis)
        .then(data => {
            dataUser = {
                id: data.id,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
            res.status(201).json(dataUser)
        }) 
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login (req, res) {
        let login = {
            search: req.body.search,
            password: req.body.password
        }
        user.findAll({
            where: Sequelize.or(
              { email: login.search },
              { phoneNumber: login.search}
            )
          })
        .then( data => {
            let data_login = data[0].dataValues.password 
            const passMatch = HelperBcrypt.comparePassword(login.password, data_login)   
                if(passMatch){
                    let payload = { 
                        id: data.id,
                        email: data.email
                    } 
                    const access_token = HelperJWT.generateTokenJwt(payload)  
                    return res.status(200).json({access_token: access_token})
                } else {
                    res.status(401).json({msg: 'Invalid Email/Phone Number or Password'})
                }
        })
        .catch(err => {
            res.status(401).json({msg: 'Invalid Email/Phone Number or Password'})
        })
    }
}

module.exports = userController 