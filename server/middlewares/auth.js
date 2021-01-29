const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')



async function authentication(req, res, next) {

    try {
        let decoded = checkToken(req.headers.access_token)
        // console.log(decoded)
        let data = await User.findOne({ 
            where: {
            email: decoded.email
        }})
            // console.log(data)
                if(!data) {
                    res.status(401).json({message: 'Please Login'})
                }
                else {
                    req.user = data
                }
                next()
    }
    catch(err) {
        console.log(err)
    }
}

function authorization(req, res, next) {
    // console.log('authorize')
    Todo.findOne({where: {
        id: req.params.id
    }})
        .then(data => {
            // console.log(data)
            if(!data) {
                next({name: "notFound"})
                // res.status(401).json({message: "No Authorization"})
            } else if (data.UserId === req.user.id){
                next()
            } else if (data.Userid !== req.user.id) {
                next({name: 'Not Authorized'})
            }
        })
        .catch(err => {
            next(err)
        })
    

}

module.exports = {
    authentication,
    authorization
}