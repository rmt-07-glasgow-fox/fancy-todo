const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')
const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library')
const genPassword = require('../helper/randomPassword')

class UserController {
    static register(req,res,next){
        let data = req.body
        User.create(data)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }
    static login(req,res,next){
        let data = req.body
        User.findOne({
            where:{
                email:data.email
            }
        })
        .then(result=>{
            if(!result){
                    next({name:'NotFound', message:'Email atau Password salah'})
            }else{
                if(compare(data.password,result.password)){
                    let payload = {
                        id: result.id,
                        email: data.email
                    }
                    let access_token = generateToken(payload)
                    res.status(200).json({message:'berhasil login', access_token})
                }else{
                    next({name:'NotFound', message:'Email atau Password salah'})
                }
            }
        })
        .catch(next)
    }
    static async googleSign(req,res,next){
        try {
            const token = req.body.token;
            const client = new OAuth2Client(process.env.CLIENT_ID)
    
            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:process.env.CLIENT_ID
            })
            const payload = ticket.getPayload();
            let user = {
                email: payload.email,
                password: genPassword(8)
            }
            console.log(user.password,'>>>>>>>>>>>>>>>>>>>>>>>');
            let data = await User.findOne({where : {email:user.email}})
            // console.log(data);
            if(data) {
                const access_token = generateToken({
                        id: data.id,
                        email: user.email,
                        });
                res.status(200).json({access_token});
            } else {
                let newUser = User.create(user);
                const access_token = generateToken({
                    id: newUser.id,
                    email: newUser.email,
                    });
                res.status(200).json({access_token});
            } 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController