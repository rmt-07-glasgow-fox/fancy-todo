const { cekToken } = require("../helpers/jwt")
const { User, ToDoList } = require("../models")

async function authentication (req, res, next) {
  try {
    let decoded = cekToken(req.headers.access_token)
    let find = await User.findOne({where: {email: decoded.email}})
    if (!find) {
      res.status(401).json({message: `Please Sign In first`})
    } else {
      req.user = {
        id: find.id
      }
      next()
    }
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
}

async function authorize(req, res, next) {
  try {
    let list = await ToDoList.findOne({ where: {id: req.params.id}})
    if (!list) {
      res.status(404).json({message: `Not Found`})
    } else if (list.UserId !== req.user.id) {
      res.status(401).json({message: `Not Yours`})
    } else (
      next()
    )
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  authentication,
  authorize
}