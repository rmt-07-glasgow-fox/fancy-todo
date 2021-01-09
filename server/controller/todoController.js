const { TodoList } = require('../models')

const axios = require('axios')

// change to async await

class Controller {
    static async create(req, res, next) {
        const create = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            user_id : req.loginUser.id
        }

        try {  
            const data = await TodoList.create(create)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }


        // TodoList.create(create)
        // .then(data => {
        //     res.status(201).json(data)
        // })
        // .catch(err => {
        //     if(err.errors) {
        //         res.status(400).json({
        //             message : err.message
        //         })
        //     } else {
        //         res.status(500).json({
        //             message : 'Error in internal server'
        //         })
        //     }
        // })
    }

    static async readList(req, res, next) {
        try {
            const data  = await TodoList.findAll({ where : 
                { user_id : req.loginUser.id }
            })

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }


        // TodoList.findAll()
        // .then(data => {
        //     res.status(200).json(data)
        // })
        // .catch(err => {
        //     res.status(500).json({
        //         message : 'Error in internal server'
        //     })
        // })
    }

    static async getTodoId(req, res, next) {
        let todoId = +req.params.id

        try {
            const data = await TodoList.findByPk(todoId)
            
            if(!data) {
                throw {
                    status : 404,
                    message : 'Error not found'
                }

            } else {
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }

        // TodoList.findByPk(todoId)
        // .then(data => {
        //     if(!data) {
        //         res.status(404).json({
        //             message : 'Error not found'
        //         })
        //     } else {
        //         res.status(200).json(data)
        //     }
        // })
        // .catch(err => {
        //     res.status(500).json({
        //         message : 'Error in internal server'
        //     })
        // })

    }

    static async edit(req, res, next) {
        let todoId = +req.params.id

        let dataEdit = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date 
        }

        try {
            const data = await TodoList.update(dataEdit, {where : 
                {id : todoId}
            })
            
            if(!data) {

                throw {
                    status : 404,
                    message : 'Error not found'
                }
            } else {
                res.status(200).json(data)
            }
            
        } catch (err) {
            next(err)
        }

        // TodoList.update(dataEdit, {wheren : {
        //     id : todoId
        // }})
        // .then(data => {
        //     if(!data) {
        //         res.status(404).json({
        //             message : 'Error not found'
        //         })
        //     } else {
        //         res.status(200).json(data)
        //     }
        // })
        // .catch(err => {
        //     res.status(500).json({
        //         message : 'Error in internal server'
        //     })
        // })
    }

    static async editStatus(req, res, next) {
        let todoId = +req.params.id

        let newStatus = {
            status : req.body.status
        }

        try {
            const data = await TodoList.update(newStatus, {where : 
                { id : todoId }
            })
            
            if(!data) {

                throw {
                    status : 404,
                    message : 'Error not found'
                }
            } else {
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }

        // TodoList.update(newStatus, {where : 
        //     {id : todoId}
        // })
        // .then(data => {
        //     if(!data) {
        //         res.status(404).json({
        //             message : 'Error not found'
        //         })
        //     } else {
        //         res.status(200).json(data)
        //     }
        // })
        // .catch(err => {
        //     res.status(500).json({
        //         message : 'Error in internal server'
        //     })
        // })
    }

    static async delete(req, res, next) {
        let todoId = +req.params.id

        try {
            const data = await TodoList.destroy({where :
                { id : todoId }
            })

            if(!data) {

                throw {
                    status: 404,
                    message : 'Error not found'
                }
            } else {
                res.status(200).json({
                    message : 'Todo success to delete'
                })
            }

        } catch (err) {
            next(err)
        }

        // TodoList.destroy({where : 
        //     {id : todoId}
        // })
        // .then(data => {
        //     if(!data) {
        //         res.status(404).json({
        //             message : 'Error not found'
        //         })
        //     } else {
        //         res.status(200).json({
        //             message : 'Todo success delete'
        //         })
        //     }
        // })
        // .catch(err => {
        //     res.status(500).json({
        //         message : 'Error in internal server'
        //     })
        // })
    }

    static async weather(req, res, next) {

        let weatherData = 'https://www.metaweather.com/api/location/1047378/'

         try {
            const response = await axios.get(weatherData)

            res.status(200).json(response)

         } catch (err) {
             next(err)
         }
    }
}

module.exports = Controller