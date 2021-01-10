# fancy-todo
Membuat website untuk mencatat hal - hal menarik untuk dilakukan

## RESTful endpoints
### POST /login

> Login User

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200)_
```

{
  "access_token": "<jwt token>",
  "email": "<email>"
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid email / password"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
---
### POST /register

> Register new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (201)_
```

{
  "message": "Success create user"
}

```

_Response (400 - Bad Request)_
```
{
  "message": "<error validation messages>"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
---
### GET /quote

> Get random quote from api

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200)_
```

{
  "content": "<quote content>",
  "author": "<quote author>"
}

```
Response (500 - Internal Server Error)
```
{
  "message": "internal server error"
}
```
---
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

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
---
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
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
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
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Due date cannot be before today"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
---
### GET /todos/:id

> Show todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

Request Params
```
{
  "id": "<todo id>"
}
```

_Response (200 - Success)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
---
### PUT /todos/:id

> Update todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get updated>",
  "description": "<description to get updated>",
  "status": "<status to get updated>",
  "due_date": "<due_date to get updated>",
}
```

Request Params
```
{
  "id": "<todo id>"
}
```

_Response (200 - Success)_
```
{
  "id": <todo id>,
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Due date cannot be before today"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
### PATCH /todos/:id

> Update todo Status

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": "<status to get updated>"
}
```

Request Params
```
{
  "id": "<todo id>"
}
```

_Response (200 - Success)_
```
{
  "id": <todo id>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<updated status>",
  "due_date": "<todo due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Due date cannot be before today"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Error not found"
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

Request Params
```
{
  "id": "<todo id>"
}
```

_Response (200 - Success)_
```
{
  "id": <deleted todo id>,
  "title": "<deleted todo title>",
  "description": "<deleted todo description>",
  "status": "<deleted updated status>",
  "due_date": "<deleted todo due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - Not Found)_
```
{
  "message": "Error not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```



