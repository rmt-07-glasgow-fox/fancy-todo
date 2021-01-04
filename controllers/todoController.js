const { ToDoList } = require('../models')

class ToDoController {

  static showLists(req, res) {
    ToDoList.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: `cannot get datas`})
    })
  }

  static addList(req, res) {
    let newList =  {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    ToDoList.create(newList)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  }

  static pickList(req, res) {
    let id = +req.params.id

    ToDoList.findByPk(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: `current data is not found`})
    })
  }

  static updateData(req, res) {
    let id = +req.params.id
    const update = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date
    }

    ToDoList.update(update, {where: {id}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: `Unable to update data, current data is not found`})
    })
  }

  static updateStatus(req, res) {
    let id = +req.params.id

    const done = {
      status: "done"
    }

    const undone = {
      status: "undone"
    }

    ToDoList.findByPk(id)
    .then(data => {
      if (data.status === "undone") {
        ToDoList.update(done, {where: {id}})
      } else if (data.status === "done") {
        ToDoList.update(undone, {where: {id}})
      }
      res.status(200).json({message: `Successfuly updated`})
    })
    .catch(err => {
      res.status(500).json({message: `Update failed`})
    })
  }

  static deleteList(req, res) {
    let id = +req.params.id

    ToDoList.destroy({where: {id}})
    .then(data => {
      res.status(200).json({message: `Data successfuly deleted`})
    })
    .catch(err => {
      res.status(500).json({message: `No such data found`})
    })
  }
}

module.exports = ToDoController