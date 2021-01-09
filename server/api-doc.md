Create fancy to-do app, using express, sequelize and pg
* REST API endpoint for Todo List's CRUD operation
* JSON formatted response
```

# USAGE
```
Open your text editor with Node.js in your computer and then run `npm install`
Run `npx nodemon app.js  to start the server
```

##Restful endpoints
<!-- --- -->
# URL
```
Server URL : http://localhost:3000
```


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
}
```
_Response(400- bad request)_
```
{
    "Error" :  VALIDATION_ERROR
    "message": "Date must be today or more than today"
}
```

_Response (500)_
```
{
  "Error": server error,
  "message": "server error"
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


_Response (500 - Bad Request)_
```
{
  "Error": server error,
  "message": "server error"
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

_Response(404 - not found)_
```
{
  "Error": "invalid id",
  "message": "Data not found"
}
```

_Response (500)_
```
{
  "Error": server error,
  "message": "server error"
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
  "status": "<new status to update>"
}
```
_Response(200)_
```
{
  "id": <given id by system>,
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<updated status>",
  "due_date": "<updated due_date>"
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response(404 - not found)_
```
{
  "Error": "invalid id",
  "message": "Data not found"
}
```
_Response (500)_
```
{
  "Error": server error,
  "message": "server error"
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
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response(404 - not found)_
```
{
  "Error": "invalid id",
  "message": "Data not found"
}
```
_Response (500)_
```
{
  "Error": server error,
  "message": "server error"
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
  "message": "todo success to delete"
}
```

_Response(404 - not found)_
```
{
  "Error": "invalid id",
  "message": "Data not found"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```
_Response (500)_
```
{
  "Error": server error,
  "message": "server error"
}
```