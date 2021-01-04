const {ToDo} = require('../models')

class toDoController{
    static add(req, res) {
        let input = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
            
        }

        ToDo.create(input)
        .then((result) => {
            res.status(201).json(result)
            
        }).catch((err) => {
            res.status(400).json(err.message)
            
        })
    }

    static showAll(req,res) {
        ToDo.findAll()
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ message: "data not found" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static showById(req, res) {
        ToDo.findByPk(req.params.id)

        .then(result => {
            
            if (result === null) {
                res.status(404).json({ message: "data not found" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch(() => {
            res.status(500).json({message: 'internal server error'})
          })
    }

    static replace(req, res) {
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
        .then(data => {
            if (result) {
                res.status(200).json({message: 'data has been updated'})
              } else {
                res.status(404).json({message: 'data not found'})
              }
        })
        .catch(err => {
            res.status(500).json({message: 'internal server error'})
        })
    }

   

    static completeToDo(req, res) {
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
                res.status(404).json({message: 'data not found'})
              }
            
        }).catch((err) => {
            res.status(500).json({message: 'internal server error'})
        });
    }

   

    static deleteToDo(req, res) {
        ToDo.destroy({
            where: {
                id: req.params.id
            }
        })

        .then((result) => {
            if (result) {
                res.status(200).json({message: 'data has been deleted'})
              } else {
                res.status(404).json({message: 'data not found'})
              }
            
        }).catch((err) => {
            res.status(500).json({message: 'internal server error'})
        });
    }
}


module.exports = toDoController