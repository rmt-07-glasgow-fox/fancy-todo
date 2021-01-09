const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models')

async function authentication(req, res ,next){
    // console.log(req.headers);
    try {
        // console.log(req.headers);
        const accessToken = req.headers.accesstoken
        if(!accessToken){
            throw { msg: 'Authentication failed', status: 401 }
        }else{
            const decoded = verifyToken(accessToken)
            console.log(decoded, 'huuuu');
            const user = await User.findOne({
                where:{
                    email:decoded.email
                }
            })
            if (!user) {
                
                throw { msg: 'Authentication failed', status: 401}
            }else{
                req.loggedInUser = decoded
                console.log(req.loggedInUser, 'hmmm');
                next()
            }
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = authentication