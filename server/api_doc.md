# Fancy ToDo Web App Server
Fancy ToDo is an web application to list all your plan. This Web App has:
 - RESTful endpoint for todo list's CRUD operation
 - JSON formatted response

## RESTful endpoints
### POST /register
_Request Header_
```
  not needed
```

_Request Body_
```json
{
  "email": "<your email>",
  "name": "<your name>",
  "password": "<your password>"
}
```

_Response (201)_
```json
{
  "id": "<your id>",
  "email": "<your email>",
  "name": "<your name>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

### POST /login
_Request Header_
```
  not needed
```

_Request Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (201)_
```json
{
"access_token": "<your access token>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

### POST /glogin
_Request Header_
```
  not needed
```

_Request Body_
```json
{
  "id_token": "id_token";
}
```

_Response (201)_
```json
Payload from Google
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### GET /getuser
_Request Header_
```
  "access_token": "access_token"
```

_Request Body_
```json
{
  "id": "id from decoded access_token"
}
```

_Response (200)_
```json
{
  "id": "Your ID",
  "email": "Your Email",
  "name": "Your Name"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```


### POST /todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (201)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```


### GET /todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
  },
  {
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
  }
  ...
]
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### GET /todos/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

### PUT /todos/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (200)_
```json
{
  "title": "<[new] todo title>",
  "description": "<[new] todo description>",
  "status": "<[new] todo status>",
  "due_date": "<[new] todo due_date>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Response (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### PATCH /todos/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": "<todo status>"
}
```

_Response (200)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<[new] todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Response (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### DELETE /todos/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "message": "ToDo success to delete"
}
```

_Response (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```