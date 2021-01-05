const { response } = require('express');
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

module.exports = {
    authenticate: (req, res, next) => {
        try {
            let decodedUser = verifyToken(req.headers.access_token);

            User.findOne({where: {email: decodedUser.email}})
                .then(user => {
                    if (!user) {
                        res.status(401).json({message: "Please login first"})
                    } else {
                        req.user = user
                        next()
                    }
                })
                .catch(err => {
                    res.status(500).json({message: 'Internal server error'})
                })

        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    },
    authorize: (req, res, next) => {
        
    }
}   