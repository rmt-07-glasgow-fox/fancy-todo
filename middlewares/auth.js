const { cekToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication (req, res, next) {
  try {
    let decoded = cekToken(req.headers.access_token)
    let find = await User.findOne({where: {email: decoded.email}})
    if (!find) {
      res.status(401).json({message: `Please Sign In first`})
    } else {
      next()
    }
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = authentication