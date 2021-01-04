const {Todo} = require ('../models/index')

class ToDoController {
  static async getTodos (req, res) {
    let data = await Todo.findAll()
      try {
        res.status(200).json(data)
      } catch {
        res.status(500).json({message: 'internal server error'})
      }
  }

  static async getOneTodos (req, res) {
    let data = await Todo.findOne ({
      where: {
        id: +req.params.id
      }
    })
    try {
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
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    let data = await Todo.create (obj)
      try {
        res.status(201).json(data)
      } catch (err) {
        if (err.errors) {
          // console.log (err)
          console.log ('masuk---------------------')
          let errors = err.errors.map (e => {
            e.message
          })
          res.status(400).json({errors})
          console.log (errors, 'sini ----------------')
        }
        res.status(500).json({message: 'internal server error'})
      }
  }

  static async editTodos (req, res) {
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
      try {
        if (data[0] === 1) {
          res.status(201).json(data[1])
        } else {
          res.status(404).json({message: 'error not found'})
        }
      } catch (err) {
        res.status(500).json({message: 'internal server error'})
      }
  }

  static async patchTodos (req, res) {
    let obj = {
      status: req.body.status
    }
    let data = await Todo.update (obj, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
      try {
        if (data[0] === 1) {
          res.status(201).json(data[1])
        } else {
          res.status(404).json({message: 'error not found'})
        }
      } catch {
        res.status(500).json({message: 'internal server error'})
      }
  }

  static async deleteTodos (req, res) {
    let data = await Todo.destroy ({
      where: {
        id: +req.params.id
      },
      returning: true
    })
      try {
        console.log (data)
        if (data === 1) {
          res.status(201).json({message: 'todo success to delete'})
        } else {
          res.status(404).json({message: 'error not found'})
        }
      } catch {
        res.status(500).json({message: 'internal server error'})
      }
  }
}

module.exports = ToDoController