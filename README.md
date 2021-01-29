# fancy-to-do
```
Create fancy to do app, using express, jquery, ajax, axios
* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response
* Web Server response
* Jokes API to show random jokes
* Quote API to show random quotes
* Able to send a new Todo to your email right away via #rd API gmail send using nodemailer after you've created your own Todo List
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
Run `live-server --host=localhost` to start the client
```

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### GET/todos

>get all todos list

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```


 {
    "id": 16,
    "title": "Belajar",
    "description": "belajar di hacktiv",
    "status": "unfinished",
    "due_date": "2020-12-15",
    "createdAt": "2020-11-27T14:24:59.702Z",
    "updatedAt": "2020-11-27T16:31:57.412Z",
    "UserId": 4
  }
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```



### POST/todos

>Create new todos list

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>",
   "status": "<status to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": 21,
  "title": "Belajar test2",
  "description": "belajar di Hacktiv",
  "status": "unfinished",
  "due_date": "2020-11-30",
  "UserId": 4,
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}
```
_Response(400- bad request)_
```
{
  "message": "Validation error: tanggal tidak boleh diisi tanggal sebelumnya, Validation error: Validation notEmpty on title failed, Validation error: Validation notEmpty on description failed, Validation error: Validation notEmpty on due_date failed"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/todos/2

>get todo by id
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
 {
    "id": 16,
    "title": "Belajar 2                                                                                                                      ",
    "description": "belajar di hacktiv",
    "status": "unfinished",
    "due_date": "2020-12-15",
    "createdAt": "2020-11-27T14:24:59.702Z",
    "updatedAt": "2020-11-27T16:31:57.412Z",
    "UserId": 4
  }
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```


### PUT/todos/:id

>Update todos list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```
{
  "id": 19,
  "title": "sample",
  "description": "test",
  "status": "unfinished",
  "due_date": "2020-11-30",
  "createdAt": "2020-11-27T16:10:04.421Z",
  "updatedAt": "2020-11-28T00:23:26.193Z",
  "UserId": 4
}
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not authorized"
}
```

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```



_Response(400- bad request)_
```
{
  "message": "Validation error: tanggal tidak boleh diisi tanggal sebelumnya, Validation error: Validation notEmpty on title failed, Validation error: Validation notEmpty on description failed, Validation error: Validation notEmpty on due_date failed"
}
```
_Response (500)_
```

{
  "message": "Internal Server Error"
}
```
### PATCH/todos/:id

>Modify Status todos list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```
{
  "id": 19,
  "title": "sample",
  "description": "test",
  "status": "completed",
  "due_date": "2020-11-30",
  "createdAt": "2020-11-27T16:10:04.421Z",
  "updatedAt": "2020-11-28T00:26:04.326Z",
  "UserId": 4
}
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not autorized to access this todo"
}
```

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```


_Response (500)_
```

{
  "message": "Internal Server Error"
}
```


### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "delete success"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not authorized"
}
```

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/register

>Create User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```
{
  "id": 25,
  "email": "ogyrahmawan@ymail.com",
  "password": "$2a$08$h.kbgDtxJwE/koklvTOWNOZEU6/csi46/RbbIjwfQB6B3cyY/NS.W",
  "updatedAt": "2020-11-27T18:53:16.688Z",
  "createdAt": "2020-11-27T18:53:16.688Z"
}
```
_Response(400- bad request)_
```
{
   "message": "Validation error: min password length is 4, email must be unique, Validation error: Validation isEmail on email failed,\nValidation error: Validation notEmpty on email failed, Validation error: min password length is 4,\nValidation error: Validation isEmail on email failed,\nValidation error: Validation notEmpty on password failed,email must be unique"
}
```


_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```
{
    "access_token": <token>
}
```
_Response(400- bad request)_
```
{
    "message": "Invalid Account, invalid email or password"
}
```


_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/google-sign-in

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "id_token": <id_token>;
}
```

_Response(200)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJvZ3lyYWhtYXdhbkBnbWFpbC5jb20iLCJpYXQiOjE2MDY1MjM5ODJ9.67RLPaYnmqyfiEvEnITuq3QsLjX8AEBbpiHUJxaPkrQ"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
### GET/quotes

>Get random Quote

_Request Header_
```
not needed
```

_Request Body_
```
not need
```

_Response(200)_
```
{
  "author": "Henry David Thoreau",
  "quote": "Men are born to succeed, not to fail."
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
### GET/jokes

>Get random jokes

_Request Header_
```
not needed
```

_Request Body_
```
not need
```

_Response(200)_
```
{
  "setup": "3 SQL statements walk into a NoSQL bar. Soon, they walk out",
  "punchline": "They couldn't find a table."
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
