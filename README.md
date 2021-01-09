# fancy-todo
```
Create fancy to-do app, using express, sequelize, jquerry, and axios
* REST API endpoint for Todo List's CRUD operation
* JSON formatted response
* Getting real time data of covid19 cases in Globally
```

# USAGE
```
Open your text editor with Node.js in your computer and then run `npm install`
Run `npx nodemon app.js  to start the server
Run `live-server --host=localhost` to start the client
```

## Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

## ENDPOINT LIST
- POST /todos
- GET /todos
- GET /todos/:id
- PUT /todos/:id
- PATCH /todos/:id
- DELETE /todos/:id
- POST /google/googleLogin
- POST /register
- POST /login


## POST/todos

>Create new todos list

_Request Header_
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
  "due_date": "<due_date with yyyy-mm-dd format to get insert into>",
  "status": "<status to get insert into, false = not done, true = done>"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
  "userId": "<automatically filled>
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Title cannot be empty, Description cannot be empty, Due date must be today or more than today, Due Date cannot be empty"
}
```
_Response(401- not logged in)_
```
{
  "Error" :  "NOT_LOGGED_IN"
  "message": "please login first"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```




## GET/todos

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
  "Todo": [
    {
      "id": 1,
      "title": "dinner",
      "description": "fancy dinner at fancy restaurant",
      "status": false,
      "due_date": "2021-02-14"
    },
    {
      "id": 2,
      "title": "play poker",
      "description": "i'm chippin in",
      "status": false,
      "due_date": "2021-01-21"
    },
    {
      "id": 3,
      "title": "horse betting",
      "description": "fancy horse betting at fancy race track",
      "status": false,
      "due_date": "2021-02-01"
    }
  ]
}
```


_Response(401- not logged in)_
```
{
  "Error" :  "NOT_LOGGED_IN"
  "message": "please login first"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```



## GET/todos/:id

>Get todos list by ID


__Request Header_
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
  "todo": {
    "id": 4,
    "title": "dinner",
    "description": "another fancy candlelight dinner",
    "status": false,
    "due_date": "2021-03-14"
  }
}
```
_Response(401- not logged in)_
```
{
  "Error" :  "NOT_LOGGED_IN"
  "message": "please login first"
}
```
_Response(404 - not found)_
```
{
  "Error": "RESOURCE_NOT_FOUND",
  "message": "not found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## PUT/todos/:id

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
  "title": "<new title to update>",
  "description": "<new description to update>",
  "due_date": "<new due_date to update>",
}
```
_Response(200)_
```
{
  "id": <given id by system>,
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<old status>",
  "due_date": "<updated due_date>"
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Title cannot be empty, Description cannot be empty, Due date must be today or more than today, Due Date cannot be empty"
}
```
_Response(401- not logged in)_
```
{
  "Error" :  "NOT_LOGGED_IN"
  "message": "please login first"
}
```
_Response(404 - not found)_
```
{
  "Error": "RESOURCE_NOT_FOUND",
  "message": "not found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## PATCH/todos/:id

>Update todos status by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "status": "<new status to update>"
}
```
_Response(200)_
```
{
  "id": <given id by system>,
  "title": "<title>",
  "description": "<description>",
  "status": "<updated status>",
  "due_date": "<due_date>"
}
```

_Response(401- not logged in)_
```
{
  "Error" :  "NOT_LOGGED_IN"
  "message": "please login first"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## DELETE/todos/:id

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
  "message": "todo success to delete"
}
```

_Response(401- not logged in)_
```
{
  "Error" :  "NOT_LOGGED_IN"
  "message": "please login first"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/google/googleLogin

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token": "id_token";
}
```

_Response(200)_
```
Google's Payload
```



_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/register

>Create new user account

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
    "id": "1",
    "email": "someone@mail.com",
    "password": <encrypted password>
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Invalid email format, Password must contain at least 6 characters"
}
```


_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/login

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
  access_token: token 
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "invalid email or password"
}
```


_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```
