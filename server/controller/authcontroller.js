const { User } = require('../models')
const {comparePassword} = require('../helper/hashPassword')
const {tokenGenerate} = require('../helper/jwt')


class AuthConroller {
      static register(req, res) {
            const newUser = {
                  email: req.body.email,
                  password: req.body.password
            }

            User.create(newUser)
                  .then(data => {
                        res.status(201).json(data)
                  })
                  .catch(err => {
                        res.status(500).json(err)
                  })
      }

      static async login(req, res) {
            try{
                  const userLogin = {
                        email: req.body.email,
                        password: req.body.password
                  }
                  const user = await User.findOne({where: {email: userLogin.email}})

                  if(!user) return res.status(401).json({message:"invalid email/password"})
                  
                  const compare = comparePassword(userLogin.password, user.password)

                  if (compare){
                        const payLoad = {
                              id: user.id,
                              email: user.email
                        }

                        const access_token = tokenGenerate(payLoad)
                        return res.status(200).json({
                              access_token
                        })
                  } else {
                        return res.status(401).json({message:"invalid email/password"})
                  }
                  
                  
            } catch(err) { 
                  res.status(401).json(err)
            }


      }
}

module.exports = AuthConroller