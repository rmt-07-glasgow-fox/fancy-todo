const { Todo } = require ('../models/index')
const { getWeather } = require ('../helper/axios')

class ToDoController {
  static async getTodos (req, res, next) {
      try {
        let data = await Todo.findAll({
          where: {
            user_id: req.user
          }
        })

        let weather = await getWeather ()
        res.status(200).json({data, weather})
      } catch (err) {
        next (err)
      }
  }

  static async getOneTodos (req, res, next) {
    try {
      let data = await Todo.findOne ({
        where: {
          id: +req.params.id
        }
      })
      if (data !== null) {
        let weather = await getWeather ()
        res.status(200).json(data, weather)
      } else {
        throw new Error ('error not found')
      }
    } catch (err) {
      next(err)
    }
  }
  
  static async createTodos (req, res, next) {
      try {
        let obj = {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          due_date: req.body.due_date,
          user_id: req.user
        }
        let data = await Todo.create (obj)
        res.status(201).json(data)
      } catch (err) {
        if (err.errors) {
          let errors = err.errors.map (e => {
            return e.message
          })
          next ({name: 'Error Input', message: errors})
        } else {
          next (err)
        }
      } 
  }

  static async editTodos (req, res, next) {
      try {
        let obj = {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          due_date: req.body.due_date
        }
    
        let data = await Todo.update (obj, {
          where: {
            id: +req.params.id
          },
          returning: true
        })

        let isSuccess = data[0]
        let dataObj = data[1]
        if (isSuccess === 1) {
          res.status(200).json(dataObj)
        } else {
          res.status(404).json({message: 'error not found'})
        }
      } catch (err) {
        if (err.errors) {
          let errors = err.errors.map (e => {
            return e.message
          })
          next ({name: 'Error Input', message: errors})
        } else {
          next (err)
        }
      }
  }

  static async patchTodos (req, res, next) {
      try {
        let obj = {
          status: req.body.status
        }
        let data = await Todo.update (obj, {
          where: {
            id: +req.params.id
          },
          returning: true
        })

        let isSuccess = data[0]
        let dataObj = data[1]
        if (isSuccess === 1) {
          res.status(200).json(dataObj)
        } else {
          res.status(404).json({message: 'error not found'})
        }
      } catch (err) {
        if (err.errors) {
          let errors = err.errors.map (e => {
            return e.message
          })
          next ({name: 'Error Input', message: errors})
        } else {
          next (err)
        }
      }
  }

  static async deleteTodos (req, res, next) {
      try {
        // console.log (req.user, 'req user')
        let data = await Todo.destroy ({
          where: {
            id: +req.params.id,
          }
        })
        if (data === 1) {
          res.status(200).json({message: 'todo success to delete'})
        } else {
          res.status(404).json({message: 'error not found'})
        }
      } catch (err) {
        next (err)
      }
  }
}

module.exports = ToDoController