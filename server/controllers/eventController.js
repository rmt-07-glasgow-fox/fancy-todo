const {Event} = require('../models')

class EventController{
    static addEvent(req,res,next){
        let data = req.body
        data.UserId = req.userData.id
        Event.create(data)
        .then(result=>{
            res.status(201).json({result})
        })
        .catch(next)
    }
    static showAllEvent(req,res,next){
        Event.findAll()
        .then(result=>{
            result.forEach(element => {
                // console.log(element.dataValues); 
                element.dataValues.strDate = strDate(element.due_date)
            });
            // console.log(result);
            res.status(200).json(result)
        })
        .catch(next)
    }
    static showOneEvent(req,res,next){
        let {id} = req.params
        Event.findByPk(id)
        .then(result=>{
            if(!result){
                next({name:'NotFound', message:'Event not found'})
            }
            res.status(200).json(result)
        })
        .catch(next)
    }
    static editEvent(req,res,next){
        let id = req.params.id
        let data = req.body

        Event.update(data,{
            where:{
                id
            },
            returning:true
        })
        .then(result=>{
            res.status(200).json({messages:'update sukses',result})
        })
        .catch(next)
    }
    static deleteEvent(req,res,next){
        let id = req.params.id

        Event.destroy({
            where:{
                id
            },
            returning: true
        })
        .then(result=>{
            res.status(200).json({messages:'delete sukses',result})
        })
        .catch(next)
    }
}

function strDate(date){
    let month = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}
module.exports = EventController