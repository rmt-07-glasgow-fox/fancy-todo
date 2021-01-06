const {Todo} = require('../models')
const axios = require('axios').default;

class TodoController {
  static getAll(req,res) {
    Todo.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({message: 'INTERNAL SERVER ERROR'})
      })
  }
  static getById(req,res) {
    Todo.findByPk(Number(req.params.id))
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(404).json({message: 'NOT FOUND'})
      })
  }
  static create(req,res) {
    const obj = {
      title: req.body.title,
      description: req.body.description,
      status: "ongoing",
      due_date: req.body.due_date,
      UserId: req.user.id
    }
    Todo.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if(err.errors[0].validatorName) res.status(400).json({message: `BAD REQUEST`})
      else res.status(500).json({message: 'INTERNAL SERVER ERROR'})
    })
  }
  static delete(req,res) {
    Todo.destroy({
      where: {
        id:Number(req.params.id)
      }
    }) 
      .then(data => {
        if(data == 1) res.status(200).json({message: "Todo deleted successfully"})
        else res.status(404).json({message: "NOT FOUND"})
      })
      .catch(err => {
        res.status(500).json({message: `INTERNAL SERVER ERROR`})
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
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
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
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
      })
  }
  static getQuotes (req,res) {
    let quotesApi = "https://type.fit/api/quotes"
    axios.get(quotesApi)
      .then(response => {
        let quotes = response.data.map(data => ({
          text: data.text,
          author: data.author
        }))
        res.status(200).json(quotes)
      })
      .catch(err => {
        res.status(400).json()
      })
  }
}

module.exports = TodoController