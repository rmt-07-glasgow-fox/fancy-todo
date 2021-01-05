const { Todo } = require ('../models/index')

class ToDoController {
  static async getTodos (req, res) {
      try {
        let data = await Todo.findAll({
          where: {
            user_id: req.user
          }
        })
        res.status(200).json(data)
      } catch {
        res.status(500).json({message: 'internal server error'})
      }
  }

  static async getOneTodos (req, res) {
    try {
      let data = await Todo.findOne ({
        where: {
          id: +req.params.id
        }
      })
      if (data !== null) {
        res.status(200).json(data)
      } else {
        res.status(404).json({message: 'error not found'})
      }
    } catch {
      res.status(500).json({message: 'internal server error'})
    }
  }
  
  static async createTodos (req, res) {
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
          res.status(400).json({errors})
        } else {
          res.status(500).json({message: 'internal server error'})
        }
      } 
  }

  static async editTodos (req, res) {
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
          res.status(400).json({errors})
        } else {
          res.status(500).json({message: 'internal server error'})
        }
      }
  }

  static async patchTodos (req, res) {
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
          res.status(400).json({errors})
        } else {
          res.status(500).json({message: 'internal server error'})
        }
      }
  }

  static async deleteTodos (req, res) {
      try {
        console.log (req.user, 'req user')
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
      } catch {
        res.status(500).json({message: 'internal server error'})
      }
  }
}

module.exports = ToDoController