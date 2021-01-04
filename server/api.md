# Fancy Todo
Fancy Todo is an web application to manage todo list. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* 

&nbsp;

## List Available endpoints
- `GET /todos`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

## RESTful endpoints

### GET /todos

> Get all todos

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date in Date format>",
    "createdAt": "2021-01-04T16:08:02.900Z",
    "updatedAt": "2021-01-04T16:08:02.900Z"
  },
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date in Date format>",
    "createdAt": "2021-01-04T16:08:02.900Z",
    "updatedAt": "2021-01-04T16:08:02.900Z"
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /todos

> Create new todos

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": <status to get insert into>
}
```

_Response (201 - Created)_
```
{
    "id": "<given by system>",
    "title": "makan malam",
    "description": "makan di luar",
    "status": true,
    "due_date": "2021-12-12T00:00:00.000Z"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

> Get todo by Id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date in Date format>",
  "createdAt": "2021-01-04T16:08:02.900Z",
  "updatedAt": "2021-01-04T16:08:02.900Z"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

> Get todo by Id

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date in Date format>",
  "createdAt": "2021-01-04T16:08:02.900Z",
  "updatedAt": "2021-01-04T16:08:02.900Z"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

### PUT /todos/:id

> Update the entire of one todo 

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  
  "title": "<title to get update into>",
  "description": "<description to get update into>",
  "status": "<status to get update into>",
  "due_date": "<due_date to get update into>",
}
```

_Response (200 - Success)_
```
{
    "id": 1,
    "title": "<edited title>",
    "description": "<edited description>",
    "status": "edited status",
    "due_date": "edited due_date"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PATCH /todos/:id

> Update status of todo 

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
{
  "status": "<status to get update into>",
}
```

_Response (200 - Success)_
```
{
  "id": 1,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date in Date format>",
  "createdAt": "2021-01-04T16:08:02.900Z",
  "updatedAt": "2021-01-04T16:08:02.900Z"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### DELETE /todos/:id

> Delete todo 

_Request Header_
```
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
    "message": "todo success to delete"
}
```

_Response (404 - Not Found)_
```
{
    "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```