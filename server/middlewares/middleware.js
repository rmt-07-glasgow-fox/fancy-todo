const {
  cekToken
} = require("../helpers/jwt")
const {
  User,
  Todo
} = require("../models")


const authentication = (req, res, next) => {
  try {
    let decoded = cekToken(req.headers.access_token)
    User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email
      }
    })
      .then(data => {
        console.log(decoded);
        if (!data) {
          next({ name: "notLoggedIn" })
        } else {
          req.user = data
          next()
        }
      })
      .catch(err => {
        next(err)
      })

  } catch (err) {
    next({ name: "notLoggedIn" })
  }
}
const authorization = (req, res, next) => {
  let id = req.params.id
  Todo.findByPk(id)
    .then(data => {
      if (!data) {
        next({ name: "resourceNotFound" })
      } else if (data.userId == req.user.id) {
        next()
      } else {
        next({ name: "unauthorized" })
      }
    })
    .catch(err => {
      next(err)
    })
}



module.exports = {
  authentication,
  authorization,
}