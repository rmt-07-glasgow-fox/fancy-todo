```
Create fancy to-do app, using express, sequelize and pg
* REST API endpoint for Todo List's CRUD operation
* JSON formatted response
```

# USAGE
```
Open your text editor with Node.js in your computer and then run `npm install Or npm i`
Run `npx nodemon app.js or npm start  to start the server
```

## Restful endpoints
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
  "title": "string",
  "description": "string",
  "due_date": "date",
  "status": "boolean"
}
```
_Response (201 - Created)_
```
{
  "id": <get id>,
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
  "Error" :  VALIDATION_ERROR
  "message": "Must be filled, Due date must be than this day, Due Date cannot be empty"
}
```
_Response(401- notLoggedIn)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(401- wrongLogin)_
```
{
  "Error" :  "wrongInput"
  "message": "Invalid Email / Password"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "Your Internal Server Is not Connect / Error"
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
      "title": "Grinding GBF",
      "description": "Grinding For Magna 2",
      "status": false,
      "due_date": "2021-02-14"
    }
  ]
}
```


_Response(401- notLogin)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(401- wrongInput)_
```
{
  "Error" :  "wrongInput"
  "message": "Invalid Email / Password"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "Your Internal Server Is not Connect / Error"
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
  "todo":     {
      "id": 1,
      "title": "Grinding GBF",
      "description": "Grinding For Magna 2",
      "status": false,
      "due_date": "2021-02-14"
    }
}
```
_Response(401- notLogin)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(401- wrongInput)_
```
{
  "Error" :  "wrongInput"
  "message": "Invalid Email / Password"
}
```
_Response(404 - not found)_
```
{
  "Error": "resourceNotFound",
  "message": "Data Not Found"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "Your Internal Server Is not Connect / Error"
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
  "Error" :  VALIDATION_ERROR
  "message": "Must be filled, Due date must be than this day, Due Date cannot be empty"
}
```
_Response(401- notLogin)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(401- wrongInput)_
```
{
  "Error" :  "wrongInput"
  "message": "Invalid Email / Password"
}
```
_Response(404 - not found)_
```
{
  "Error": "resourceNotFound",
  "message": "Data Not Found"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "Your Internal Server Is not Connect / Error"
}
```
```

## PATCH/todos/:id

>Update todos status by ID
...
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "status": "<Succes Update todos>"
}
```
_Response(200)_
```
{
  "id": "<given id by system>",
  "title": "<title>",
  "description": "<description>",
  "status": "<updated status>",
  "due_date": "<due_date>"
}
```
_Response(400- bad request)_
```
{
  "Error" :  VALIDATION_ERROR
  "message": "Must be filled, Due date must be than this day"
}
```
_Response(401- notLogin)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(401- wrongInput)_
```
{
  "Error" :  "wrongInput"
  "message": "Invalid Email / Password"
}
```
_Response(404 - not found)_
```
{
  "Error": "resourceNotFound",
  "message": "Data Not Found"
}
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "Your Internal Server Is not Connect / Error"
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
  "message": "Todos Success to Delete"
}
```
_Response(401- notLogin)_
```
{
  "Error" :  "notLogin"
  "message": "You Must login First"
}
```
_Response(401- wrongInput)_
```
{
  "Error" :  "wrongInput"
  "message": "Invalid Email / Password"
}
```
_Response(404 - not found)_
```
{
  "Error": "resourceNotFound",
  "message": "Data Not Found"
}
```
```

_Response (500)_
```
{
  "Error": "internal server error",
  "message": "Your Internal Server Is not Connect / Error"
}
```