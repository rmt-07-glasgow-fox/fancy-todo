const {Todo} = require('../models')

class TodosController {
  static async create(req, res) {
    let { title, description, status, due_date } = req.body
    let todoObj = {
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }

    try {
      let todo = await Todo.create(todoObj)
      return res.status(201).json({
        msg: `Successfuly create new ${todo.title} todo list`
      })
    } catch(error) {
      if (error) {
        let msg = error.errors.map((err) => err.message)
        return res.status(400).json({msg})
      } else {
        return res.status(500).json({msg: 'Internal server error!'})
      }
    }

    // Todo.create(todoObj)
    // .then((todo) => {
    //   return res.status(201).json({
    //     msg: 'Successfuly create new To Do!',
    //     todo
    //   })
    // })
    // .catch((error) => {
    //   return res.status(400).json({
    //     msg: 'Invalid create new To Do'
    //   })
    // })
  }

  static async index(req, res) {
    try {
      let todos = await Todo.findAll()
      return res.status(200).json({
        msg: 'List of Todos',
        todos
      })
    } catch (error) {
      return res.status(500).json({msg: 'Cannot retrieve data!'})
    }

    // Todo.findAll()
    // .then((todos) => {
    //   res.status(200).json(todos)
    // })
    // .catch((error) => {
    //   res.status(400).json(error)
    // })
  }

  static async show(req, res) {
    let todo = await Todo.findByPk(+req.params.id)
    try {
      if (todo) {
        return res.status(200).json(todo)
      } else {
        return res.status(404).json({msg: 'Not found!'})
      }
    } catch (error) {
      return res.status(400).json({msg: 'Data not found!'})
    }

    // Todo.findByPk({where: {id: +req.params.id}})
    // .then((todo) => {
    //   res.status(200).json(todo)
    // })
    // .catch((error) => {
    //   res.status(400).json(error)
    // })
  }

  static async updatePut(req, res) {
    let { title, description, status, due_date } = req.body
    let todoObj = {
      title: title,
      description: description,
      status: status,
      due_date: due_date
    }

    try {
      let todo = await Todo.findByPk(+req.params.id)

      if (todo) {
        await todo.update(todoObj, {where: {id: todo.id}})
        return res.status(200).json(todo)
      } else {
        return res.status(404).json({msg: 'Data not found!'})
      }
    } catch(error) {
      if (error) {
        let msg = error.errors.map((err) => err.message)
        return res.status(400).json({msg})
      } else {
        return res.status(500).json({msg: 'Internal server error'})
      }
    }

    // Todo.update({where: {id: +req.params.id}})
    // .then((todo) => {
    //   res.status(200).json(todo)
    // })
    // .catch((error) => {
    //   res.status(400).json(error)
    // })
  }

  static async updatePatch(req, res) {
    let {status} = req.body

    try {
      let todo = await Todo.findByPk(+req.params.id)

      if (todo) {
        await todo.update({status}, {where: {id: todo.id}})
        return res.status(200).json({
          msg: `${todo.title} list berubah menjadi ${todo.status}`
        })
      } else {
        return res.status(404).json({msg: 'Data not found'})
      }
    } catch(error) {
      if (error) {
        let msg = error.errors.map((err) => err.message)
        return res.status(400).json({msg})
      } else {
        return res.status(500).json({msg: 'Internal server error'})
      }
    }

    // Todo.update({where: {id: +req.params.id}})
    // .then((todo) => {
    //   // console.log('SUSKES');
    //   res.status(200).json(todo)
    // })
    // .catch((error) => {
    //   // console.log('GAGAL');
    //   res.status(400).json(erorr)
    // })
  }

  static async destroy(req, res) {
    try {
      let todo = await Todo.findByPk(+req.params.id)
      if (todo) {
        await todo.destroy()
        return res.status(200).json({msg: `${todo.title} list has been deleted!`})
      } else {
        return res.status(404).json({msg: 'Data not found!'})
      }
    } catch(error) {
      return res.status(500).json({msg: 'Internal server error'})
    }

    // Todo.destroy({where: {id: +req.params.id}})
    // .then((todo) => {
    //   res.status(200).json(todo, {
    //     msg: `Todo list ${todo.title} has been deleted!`
    //   })
    // })
    // .catch((error) => {
    //   res.status(500).json(json)
    // })
  }

}

module.exports = TodosController