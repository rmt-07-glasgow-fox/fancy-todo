# Risuto ToDo List
Risuto ToDo list is a fancy-todo web application (well, not too fancy I guess) for your need to list all your activity plan.

> P.S.: This app is still experimental and for educational purpose, but ofcourse you can use it for your daily driver.

## Feature
 - Create, Read, Update, and Delete your todo list
 - Optimized for mobile
 - Glassmorphism design
 - and IT'S FREE!

 ## Endpoints
 This table is list of this app's API endpoint. You can see the detail in [API Documentation](https://github.com/Ralfarios/fancy-todo/blob/main/server/api_doc.md). 

| Route         | Method      | Description                   |
| ------------- | ----------- | ----------------------------- |
| `/register`   | POST        | For register user             |
| `/login`      | POST        | For login user                |
| `/glogin`     | POST        | For login user with Google    |
| `/getuser`    | GET         | For get user information      |
| `/todos`      | POST        | For add todo to list          |
| `/todos`      | GET         | For get user's todo list      |
| `/todos/:id`  | GET         | For detailed todo list        |
| `/todos/:id`  | PUT         | For update todo list          |
| `/todos/:id`  | PATCH       | For mark as done todo list    |
| `/todos/:id`  | DELETE      | For delete todo list          |
| `/animequote` | GET         | For get random anime quote    |
<br>

## Are you dev?
Want to help me to develop this web application? You are very welcome and Let's get started!

Before you start, make sure you already installed [Node.js](https://nodejs.org/en/) on your machine.

### Let's get started

 First, all you had to do is clone this repo <br> `$ git clone https://github.com/ralfarios/fancy-todo`

#### If you want to develop back-end side

 1. Second, go to your `repo`/server directory `$cd fancy-todo/server/`
 2. and then, install the packages <br>
 `$ npm install`
 3. Install sequelize-cli and nodemon (global recommended).
 `$ npm install -g sequelize-cli nodemon`
 4. Then, setup the Sequelize database with these commands: 
    - For create the database<br>
    `$ sequelize db:create`
    - For creating the tables and stuff<br>
    `$ sequelize db:migrate`
 5. Remember to fill API KEY on `.env` file (make one if you don't have it, example is on `.env.example` file)
 6. AND YOU GOOD TO GO! 

 #### If you want to develop front-end side
 1. Second, go to your `repo`/server directory `$cd fancy-todo/client/`
 2. Install live-server (global recommended).
 `$ npm install -g live-server`
 3. AND YOU GOOD TO GO! 

 ## Executing
After everything is done, let's execute it with `$ npm run dev` for `back-end` or `live-server --host=localhost` for `front-end`.

## Any question?
Feel free to contact me!

## Demo Application
[Risuto Todo @ Firebase](https://risuto-todo.web.app)

## Credit
- [satomizu @ Pixiv](https://pixiv.me/stmzu)
- [UI-Avatars](https://ui-avatars.com/)
- [Animechan API](https://animechanapi.xyz/)