const {ToDo} = require('../models')

class toDoController{
    static add(req, res, next) {
        let input = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId: req.loggedInUser.id

            
        }

        ToDo.create(input)
        .then((result) => {
            res.status(201).json(result)
            
        }).catch((err) => {
            next(err)
            
        })
    }

    static showAll(req,res, next) {
        ToDo.findAll()
        .then(result => {
            if (result.length === 0) {
                next()
            } else {
                res.status(200).json(result)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static showById(req, res, next) {
        ToDo.findByPk(req.params.id)

        .then(result => {
            
            if (result === null) {
                next()
            } else {
                res.status(200).json(result)
            }
        })
        .catch((err) => {
            next(err)
          })
    }

    static replace(req, res, next) {
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        ToDo.update(data, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (result) {
                res.status(200).json({message: 'data has been updated'})
              } else {
                next()
              }
        })
        .catch(err => {
            next(err)
        })
    }

   

    static completeToDo(req, res, next) {
        const input = {
            status: req.body.status
        }

        ToDo.update(input, {
            where: {
                id: req.params.id
            }
        })

        .then((result) => {
            if (result) {
                res.status(200).json({message: 'status has been updated'})
              } else {
                next()
              }
            
        }).catch((err) => {
            next(err)
        });
    }

   

    static deleteToDo(req, res, next) {
        ToDo.destroy({
            where: {
                id: req.params.id
            }
        })

        .then((result) => {
            if (result) {
                res.status(200).json({message: 'data has been deleted'})
              } else {
               next()
              }
            
        }).catch((err) => {
            next(err)
        });
    }
}


module.exports = toDoController