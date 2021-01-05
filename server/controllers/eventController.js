const {Event} = require('../models')

class EventController{
    static addEvent(req,res){
        let data = req.body
        Event.create(data)
        .then(result=>{
            res.status(201).json({messages:'Event Created'})
        })
        .catch(err=>{
            res.status(500).json({messages:err.messages})
        })
    }
    static showAllEvent(req,res){
        Event.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(500).json({messages:err.messages})
        })
    }
    static editEvent(req,res){
        let id = req.params.id
        let data = req.body

        Event.update(data,{
            where:{
                id
            }
        })
        .then(result=>{
            res.status(200).json({messages:'update sukses'})
        })
        .catch(err=>{
            res.status(500).json({messages:err.messages})
        })
    }
    static deleteEvent(req,res){
        let id = req.params.id

        Event.destroy(id)
        .then(result=>{
            res.status(200).json({messages:'delete sukses'})
        })
        .catch(err=>{
            res.status(500).json({messages:err.messages})
        })
    }
}

module.exports = EventController