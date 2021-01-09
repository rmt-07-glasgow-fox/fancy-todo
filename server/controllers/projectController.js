const { User, Project, UserProject } = require('../models');

class ProjectController {
  static async showProject(req,res,next){
    try {
      const { id } = req.user
      const user = await User.findOne({
        where: {id},
        include : [ Project ]
      })
      res.status(200).json(user.Projects)
    } catch (err) {
      next(err)
    }
  }

  static async showOne(req,res,next){
    try {
      const { id } = req.params
      const project = await Project.findOne({
        where: {id}
      })
      if(project) res.status(200).json(project)
      else next({ name: 'errorNotFound' })
    } catch (err) {
      next(err)
    }
  }

  static async showMembers(req,res,next){
    try {
      const { projectId } = req.params
      const project = await Project.findOne({
        where: {id : projectId},
        include : [ User ]
      })
      if(project) res.status(200).json(project.Users)
      else next({ name: 'errorNotFound' })
    } catch (err) {
      next(err)
    }
  }

  static async createProject(req,res,next){
    try {
      const input = {
        title: req.body.title || '',
        desc: req.body.desc || '',
      }
      const project = await Project.create(input)
      const userProject = await UserProject.create({
        UserId : req.user.id,
        ProjectId : project.id
      })
      res.status(200).json({
        id: project.id,
        title: project.title,
        desc: project.desc,
        UserId: req.user.id
      })
    } catch(err) {
      next(err)
    }
  }

  static async addMember(req,res,next){
    try {
      const { projectId, userId } = req.params
      const userProject = await UserProject.create({
        UserId: userId,
        ProjectId: projectId
      })
      res.status(201).json({message: 'success add member'})
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const input = {
        title: req.body.title || '',
        desc: req.body.desc || '',
      }
      const project = await Project.update(input, {
        where:{ id: req.params.id },
        returning: true
      })
      if(project[0] != 0) res.status(200).json(project[1][0])
            else next({ name: 'errorNotFound' })
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const project = await Project.destroy({
        where: {id: req.params.id},
        returning: true
      })
      if(project) res.status(200).json({message:'todo success to delete'})
      else next({ name: 'errorNotFound' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProjectController