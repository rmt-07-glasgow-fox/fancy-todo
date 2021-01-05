#migration
sequelize model:generate --name Todo --attributes title:string,description:string,status:boolean,due_date:dateonly

sequelize model:generate --name User --attributes email:string,password:string

sequelize migration:generate --name addUserIdToTodo