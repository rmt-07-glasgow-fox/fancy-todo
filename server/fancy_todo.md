# Fancy ToEat App Server
Fancy Todo App is an application to manage your meal plan and control your party's meal plan.

&nbsp;

## RESTful endpoints
POST /todos
GET /todos
GET /todos/:id
PUT /todos/:id
PATCH /todos/:id
DELETE /todos/:id
POST /signUp
POST /signIn

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
  "title": string,
  "description": string,
  "status": string,
  "due_date": date
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
  "message": "Due date must be later than today"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
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
    "id": <given by sistem>,
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
  "message": "internal server error"
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
{ id: integer}
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
  "title": string,
  "description": description,
  "status": string,
  "due_date": date
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
  "message": "Due date must be later than today"
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
{ id: integer}
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
  "message": "Due date must be later than today"
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
  "message": "internal server error"
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
{ id: integer}
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

### POST /signUp

> Create new account

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

### POST /signIn

> Sign In User

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (200 - OK)_
```
{
  accessToken
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
---


