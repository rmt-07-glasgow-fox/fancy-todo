const {Todo} = require('../models')

class TodoController {
  static getAll(req,res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message: 'internal server error'})
      })
  }
  static getById(req,res) {
    Todo.findByPk(Number(req.params.id))
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message: 'error not found'})
      })
  }
  static create(req,res) {
    const obj = {
      title: req.body.title,
      description: req.body.description,
      status: "ongoing",
      due_date: req.body.due_date
    }
    Todo.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).json({message: 'internal server error'})
    })
  }
  static delete(req,res) {
    Todo.destroy({
      where: {
        id:Number(req.params.id)
      }
    }) 
      .then(data => {
        if(data == 1) res.status(200).json({message: "Todo has been deleted"})
        else res.status(404).json({message: "Todo not found"})
      })
      .catch(err => {
        res.status(500).json({message: `internal server error`})
      })
  }
  static edit(req,res) {
    const id = Number(req.params.id)
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.update(obj, {
      where: {
        id:id
      }
    })
      .then(() => {
        return Todo.findByPk(id)
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message:"update error"})
      })
  }
  static patch(req,res) {
    const id = Number(req.params.id)
    Todo.update({status:req.body.status}, {
      where: {
        id:id
      }
    })
      .then(() => {
        return Todo.findByPk(id)
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message:"patch error"})
      })
  }
}

module.exports = TodoController