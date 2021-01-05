# fancy-todo
Membuat website untuk mencatat hal - hal menarik untuk dilakukan

npx sequelize model:generate --name TodoList --attributes title:string,description:string,status:boolean,due_date:date

npx sequelize model:generate --name User --attributes email:string,password:string

npx sequelize migration:generate --name add-UserId-to-todolist
