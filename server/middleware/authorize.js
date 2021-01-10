const {Todo} = require("../models")

module.exports = async (req, res, next) => {
  try {
    const user = req.user
    const todo = await Todo.findByPk(req.params.id)
    if (user.id != todo.UserId) {
      throw { 
        status: 403,
        message: `Unauthorized`
      }
    } else {
      next ()
    }
  } catch (err) {
    next (err)
  }
}