const { User } = require('../models')
const {comparePassword} = require('../helper/hashPassword')
const {tokenGenerate} = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');


class AuthConroller {
      static getUser(req, res, next) {
            let id = req.params.id

            User.findByPk(id)
                  .then(data => {
                        res.status(200).json(data)
                  }).catch(err => next(err))
                  
      }

      static register(req, res) {
            const newUser = { email: req.body.email, password: req.body.password }

            User.create(newUser)
                  .then(data => {
                        res.status(201).json(data)
                  }).catch(err => {
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
                        const payLoad = { id: user.id, email: user.email }
                        const access_token = tokenGenerate(payLoad)
                        return res.status(200).json({ access_token })
                  } else {
                        return res.status(401).json({message:"invalid email/password"})
                  }
                  
                  
            } catch(err) { 
                  res.status(401).json(err)
            }


      }

      static googleLogin(req, res, next ){
            const {id_token} = req.body
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID );
            let payload

            client.verifyIdToken({
                  idToken: id_token,
                  audience: process.env.GOOGLE_CLIENT_ID  
              }).then(ticket => {
                  payload = ticket.getPayload();
                  return User.findOne({where: {email: payload.email}})
              }).then(data => {
                    if(data){
                        return data
                    } else{ 
                        let password = toString(Math.floor(Math.random()*1000000))
                        return User.create({email: payload.email, password})
                    }
              }).then(data => {
                  const payLoad = { id: data.id, email: data.email }
                  const access_token = tokenGenerate(payLoad)
                  return res.status(200).json({ access_token })
                    
              }).catch(err => { next(err) })
              
              // If request specified a G Suite domain:
              // const domain = payload['hd'];
      }
}

module.exports = AuthConroller