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
      due_date: req.body.due_date,
      UserId: req.user.id
    }

    ToDoList.create(newList)
    .then(data => {
      if(data) {
        res.status(201).json({id: data.id, title: data.title, description: data.description, due_date: data.due_date})
      }
    })
    .catch(err => {
      if (err) {
        res.status(400).json({message: `Something Wrong`})
      }
      res.status(500).json(err.message)
    })
  }

  static pickList(req, res) {
    let id = +req.params.id

    ToDoList.findByPk(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({message: `error not found`})
      }
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({message: `current data is not found`})
    })
  }

  static updateData(req, res) {
    let id = +req.params.id
    
    const forUpdate = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    if(!id) {
      res.status(404).json({message: `Not Found`})
    } else {
      ToDoList.update(forUpdate, {where: {id}})
      .then(data => {
        res.status(200).json({id: data.id, title: data.title, description: data.description, due_date: data.due_date})
      })
      .catch(err => {
        if (err) {
          res.status(400).json({message: `Something wrong`})
        } else {
          res.status(500).json({message: `Unable to update data, current data is not found`})
        }
      })
    }
  }

  static updateStatus(req, res) {
    let id = +req.params.id

    const update = {
      status: req.body.status
    }

    ToDoList.update(update, {where: {id}})
    .then(data => {
      res.status(200).json({message: `Successfuly updated`})
    })
    .catch(err => {
      res.status(500).json({message: `Update failed`})
    })
  }

  static deleteList(req, res) {
    let id = +req.params.id

    if (!id) {
      res.status(404).json({message: `Not Found`})
    } else {
      ToDoList.destroy({where: {id}})
      .then(data => {
        res.status(200).json({message: `todo success to delete`})
      })
      .catch(err => {
        res.status(500).json({message: `No such data found`})
      })
    }
  }
}

module.exports = ToDoController