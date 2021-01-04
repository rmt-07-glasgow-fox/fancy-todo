const {Todo} = require('../models')

class TodosController {
  static create(req, res) {

    Todo.create()
    .then((todo) => {

    })
    .catch((error) => {

    })
  }

  static index(req, res) {

    Todo.findAll()
    .then((todos) => {
      
    })
    .catch((error) => {

    })
  }

  static show(req, res) {
    
    Todo.findByPk()
    .then((todo) => {

    })
    .catch((error) => {

    })
  }

  static updatePut(req, res) {

    Todo.update()
    .then((todo) => {

    })
    .catch((error) => {

    })
  }

  static updatePatch(req, res) {
    Todo.update()
    .then((todo) => {

    })
    .catch((error) => {

    })
  }

  static destroy(req, res) {
    Todo.destroy()
    .then((todo) => {

    })
    .catch((error) => {

    })
  }

}

module.exports = TodosController