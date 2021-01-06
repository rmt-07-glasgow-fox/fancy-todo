const {Todo, User} = require('../models')
const {verifyPassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class Controller {

    static async createTodo (req, res, next) {
        try {
            let body = {
                title: req.body.title,
                description: req.body.description,
                status: 'Undone',
                due_date: req.body.due_date,
                // userId: req.body.userId
            }
            console.log(body)
            const created = await Todo.create(body)
            res.status(201).json(created)
        } catch (err) {
            next(err)
        }
    }

    static async getList (req, res, next) {
        try {
            const list = await Todo.findAll()
            res.status(200).json(list)
        } catch (err) {
            next(err)
        }
    }
    
    static async getTodoById (req, res, next) {
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            res.status(200).json(list)
        } catch (err) {
            next(err)
        }
    }

    static async editTodo (req, res, next) {
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            const data = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date
            }
            if (!list) {
                throw {
                    status: 404,
                    message: "Todo not found"
                }
            } else {
                const edited = await Todo.update(data, {where: {id}})
                res.status(200).json('Data edited')
            }
        } catch (err) {
            next(err)
        }
    }

    static async changeStatus(req, res, next){
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            const data = {
                status: 'Done'
            }
            if (!list) {
                throw {
                    status: 404,
                    message: "Todo not found"
                }
            } else {
                const edited = await Todo.update(data, {where: {id}})
                res.status(200).json('Data edited')
            }
        } catch (err) {
            next(err)
        }
    }

    static async deletedTodo(req, res, next){
        try {
            const id = req.params.id
            const list = await Todo.findByPk(id)
            if (!list) {
                throw {
                    status: 404,
                    message: "Todo not found"
                }
            } else {
                const deleted = await Todo.destroy({where: {id}})
                res.status(200).json({message: 'Data deleted'})
            }
        } catch (err) {
            next(err)
        }
    }

    static async register (req, res, next) {
        try {
            let body = {
                email: req.body.email,
                password: req.body.password
            }
            const created = await User.create(body)
            res.status(201).json({id: created.id, email: created.email})
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            let body = {
                email: req.body.email,
                password: req.body.password
            }
            const find = await User.findOne({where: {email: body.email}})
            if(!find){
                throw {
                    status: 400,
                    message: "Email/Password Invalid"
                }
            } else {
                if(verifyPassword(body.password, find.password) == true){
                    let access_token = generateToken({id: find.id, email: find.email})
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status: 400,
                        message: "Email/Password Invalid"
                    }
                }
            }
        } catch (err) {
            next(err)
        }   
    }

    // static async loginGoogle(req, res, next) {
    //     try {
            
    //     } catch (err) {
            
    //     }   
    // }

}

module.exports = Controller