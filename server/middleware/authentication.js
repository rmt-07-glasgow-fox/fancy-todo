const { verifyToken } = require('../helper/jwt')

const { User } = require('../models')

//change to async await

async function authUser(req, res, next) {
    const { accessToken } = req.headers

    try {

        if( !accessToken ) {
            res.status(401).json({
                message : 'Please Login first'
            })
        } else {
            const decoded = verifyToken(accessToken)

            req.loginUser = decoded

            const data = await User.findOne({ where :
                {id : decoded.id}
            })

            if(!data) {
                res.status(401).json({
                    message : 'Please login first'
                })
            } else {
                next()
            }
        }

    } catch (err) {
        res.status(500).json({
            message : 'Error in internal server'
        })
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