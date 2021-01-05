const { cekToken } = require("../helpers/jwt")
const { User } = require('../models')

const authentication = (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (access_token) {
            let decoded = cekToken(access_token)
            req.userData = decoded
            User
                .findByPk(req.userData.id)
                .then(data => {
                    !data && res.status(404).json({message: 'User Not Found!'})
                    next()
                })
                .catch(err => res.status(500).json({message: err.message}))
        }else {
            res.status(401).json({message : 'You are Unathorized'})
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = authentication