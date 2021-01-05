const express = require('express')
const router = express.Router()
const todo = require('./todo')
const auth = require('./auth')
const { tokenCheck } = require('../helper/jwt')
const { User } = require('../models')


router.use('/', auth)
router.use(async (req, res, next)=> {
      try{
            let decoded = tokenCheck(req.headers.access_token)
            let match = await User.findOne({where: {email: decoded.email}})

            if(!match) {
                  res.status(401).json({message: "you must login fisrt"})
            } else {
                  next()
            }


      }catch (err) { 
            res.status(400).json(err)
      }
})
router.use('/todos', todo )

module.exports = router