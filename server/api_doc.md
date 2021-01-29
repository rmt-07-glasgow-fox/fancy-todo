# Risuto ToDo API Documentation
For make you easier to develop this app, I make a documentation about API endpoints.


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


## Detailed Endpoints
### POST /register
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "name": "<your name>",
  "email": "<your email>",
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
Unneeded
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
Unneeded
```

_Request Body_
```json
{
  "id_token": "id_token"
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
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
  Unneeded
```

_Response (200)_
```json
{
  "id": "<your id>",
  "email": "<your email>",
  "name": "<your name>",
  "profpic": "<your profpic link>"
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
  "due_date": "<todo due_date>",
  "UserId": "<your id>",
  "updatedAt": "<date>",
  "createdAt": "<date>",
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
Unneeded
```

_Response (200)_
```json
[
  {
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "UserId": "<your id>",
    "updatedAt": "<date>",
    "createdAt": "<date>",
  },
  {
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "UserId": "<your id>",
    "updatedAt": "<date>",
    "createdAt": "<date>",
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
Unneeded
```

_Response (200)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
  "UserId": "<your id>",
  "updatedAt": "<date>",
  "createdAt": "<date>",
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
  "due_date": "<[new] todo due_date>",
  "UserId": "<your id>",
  "createdAt": "<date>",
  "updatedAt": "<[new] date>",
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
  "due_date": "<todo due_date>",
  "UserId": "<your id>",
  "createdAt": "<date>",
  "updatedAt": "<[new] date>",
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
Unneeded
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

### GET /animequote

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "quote": "<random quote>",
  "character": "<random character>",
  "anime": "T<random anime>"
}
```

_Response (401)_
```json
{
  "message": "Error 401: You don't have permission to access this feature"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```