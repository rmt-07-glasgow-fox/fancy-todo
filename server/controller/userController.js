const { user, Sequelize } =  require('../models/index')
const { comparePassword } = require('../helpers/bcrypt');
const { generateTokenJwt } = require('../helpers/jwt');

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
            let data_login = data[0].dataValues
            const passMatch = comparePassword(login.password, data_login.password)  
           
                if(passMatch){
                    let payload = { 
                        id: data_login.id,
                        email: data_login.email
                    } 
                    const access_token = generateTokenJwt(payload)  
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