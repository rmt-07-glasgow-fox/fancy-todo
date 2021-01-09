const {Todo} = require('../models')

class TodosController {
  static async create(req, res, next) {
    let { title, description, status, due_date } = req.body
    let todoObj = {
      title: title,
      description: description,
      status: status,
      due_date: due_date,
      UserId: req.currentUser.id
    }

    try {
      let todo = await Todo.create(todoObj)
      console.log('CREATE MASUK CONTROLLER', todo);
      return res.status(201).json(todo)
    } catch(error) {
      console.log('OH ERROR PAS CREATE YA', error);
      next(error)
    }
  }

  static async index(req, res, next) {
    try {
      let todos = await Todo.findAll()
      return res.status(200).json(todos)
    } catch (error) {
      next({name: 'cantRetrieve'})
    }
  }

  static async show(req, res, next) {
    console.log('SHOW TODO CONTROLLER');
    let todo = await Todo.findByPk(+req.params.id)
    try {
      if (todo) {
        return res.status(200).json(todo)
      } else {
        next({name: 'notFound'})
      }
    } catch (error) {
      next({name: 'internalError'})
    }
  }

  static async updatePut(req, res, next) {
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
        next({name: 'notFound'})
      }
    } catch(error) {
      if (error) {
        next(error)
      } else {
        next({name: 'internalError'})
      }
    }

  }

  static async updatePatch(req, res, next) {
    let {status} = req.body

    try {
      let todo = await Todo.findByPk(+req.params.id)

      if (todo) {
        await todo.update({status}, {where: {id: todo.id}})
        return res.status(200).json(todo)
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      if (error) {
        console.log('DIDIEU');
        next(error)
      } else {
        next({name: 'internalError'})
      }
    }

  }

  static async destroy(req, res, next) {
    try {
      let todo = await Todo.findByPk(+req.params.id)
      if (todo) {
        await todo.destroy()
        return res.status(200).json({
          msg: `${todo.title} list has been deleted!`,
          todo
        })
      } else {
        next({name: 'notFound'})
      }
    } catch(error) {
      next({name: 'internalError'})
    }

  }

}

module.exports = TodosController