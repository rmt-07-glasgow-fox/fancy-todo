# Fancy ToDo Web App Server
Fancy ToDo is an web application to list all your plan. This Web App has:
 - RESTful endpoint for todo list's CRUD operation
 - JSON formatted response

## RESTful endpoints
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

_Request (201)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Request (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Request (500)_
```json
{
  "ae": "Error 500: Internal Server Error"
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

_Request (200)_
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

_Request (500)_
```json
{
  "ae": "Error 500: Internal Server Error"
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

_Request (200)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Request (404)_
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

_Request (200)_
```json
{
  "title": "<[new] todo title>",
  "description": "<[new] todo description>",
  "status": "<[new] todo status>",
  "due_date": "<[new] todo due_date>"
}
```

_Request (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Request (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

_Request (500)_
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

_Request (200)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<[new] todo status>",
  "due_date": "<todo due_date>"
}
```

_Request (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Request (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

_Request (500)_
```json
{
  "ae": "Error 500: Internal Server Error"
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

_Request (200)_
```json
{
  "message": "ToDo success to delete"
}
```

_Request (404)_
```json
{
  "message": "Error 404: ToDo List not found"
}
```

_Request (500)_
```json
{
  "ae": "Error 500: Internal Server Error"
}
```