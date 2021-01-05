# Fancy Todo App Server
Fancy Todo App is an application to manage your activities. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
POST /todos
GET /todos
GET /todos/:id
PUT /todos/:id
PATCH /todos/:id
DELETE /todos/:id

### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "<New Date()>",
  "updatedAt": "<new Date()>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Invalid requests"
}
```
### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt)>",
    "updatedAt": "<todo updatedAt)>",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt)>",
    "updatedAt": "<todo updatedAt)>",
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Invalid request"
}
```

### GET /todos/:id

> Get todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>",
  }
```

_Response (404 - Not Found)_
```
{
  "message": "not found"
}
```


### PUT /todos/:id

> Update todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due date to get insert into>"
}
```

_Response (200 - OK)_
```
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>",
  }
```
_Response (400 - Bad Request)_
```
{
  "message": "bad request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Invalid request"
}
```


### PATCH /todos/:id

> Update todo status by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
{
  "status": "<status to get insert into>"
}
```

_Response (200 - OK)_
```
  {
    "id": <todo id>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>",
  }
```
_Response (400 - Bad Request)_
```
{
  "message": "bad request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Invalid request"
}
```


### DELETE /todos/:id

> Delete todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "todo success to delete"
  }
```
_Response (404 - Not Found)_
```
{
  "message": "not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Invalid request"
}
```
---


