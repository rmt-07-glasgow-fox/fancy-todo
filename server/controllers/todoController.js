const {Todo} = require('../models')
const axios = require('axios').default;

class TodoController {
  static getAll(req,res,next) {
    Todo.findAll({
      where: {
        UserId:req.user.id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getById(req,res,next) {
    Todo.findByPk(Number(req.params.id))
      .then(data => {
        if(!data) throw new Error({name:"NotFound"})
        else res.status(200).json(data)
      })
      .catch(err => {
        err.name = "NotFound"
        next(err)
      })
  }
  static create(req,res,next) {
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
      next(err)
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
        else res.status(404).json({message: "there is nothing to be deleted"})
      })
      .catch(err => {
        err.name="Unauthorized"
        next(err)
      })
  }
  static edit(req,res,next) {
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
        next(err)
      })
  }
  static patch(req,res,next) {
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
        next(err)
      })
  }
  static getQuotes (req,res,next) {
    let quotesApiUrl = "https://type.fit/api/quotes"
    axios.get(quotesApiUrl)
      .then(response => {
        let quotes = response.data.map(data => ({
          text: data.text,
          author: data.author
        }))
        res.status(200).json(quotes)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TodoController