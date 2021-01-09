const { verifyToken } = require('../helper/jwt')

const { User } = require('../models')

//change to async await

async function authUser(req, res, next) {
    const { access_token } = req.headers

    try {

        if( !accessToken ) {
            throw {
                status : 401,
                message : 'Please Login First'
            }
        } else {
            const decoded = verifyToken(access_token)

            req.loginUser = decoded

            const data = await User.findOne({ where :
                {id : decoded.id}
            })

            if(!data) {

                throw {
                    status : 401,
                    message : 'Please Login First'
                }
            } else {
                next()
            }
        }

    } catch (err) {
        next(err)
    }




    // if(!access_token) {
    //     res.status(401).json({message : 'Please Login First'})
    // } else {
    //     const decoded = verifyToken(access_token)

    //     req.loggedInUser = decoded

    //     User.findOne({where : 
    //         { id : decoded.id }
    //     })
    //     .then(user => {
    //         next()
    //     })
    //     .catch(err => {
    //         res.status(401).json({
    //             message : 'Please Login FIrst'
    //         })
    //     })
    // }
}

module.exports = {
    authUser
}