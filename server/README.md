# Fancy Todo Server
This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET http://localhost:3000/todos

> Get all todo list

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "Belajar HTML",
    "description": "Belajar HTML Dasar",
    "status": "false",
    "due_date": "2021-01-05T00:00:00.149Z",
    "createdAt": "2021-01-04T07:15:12.149Z",
    "updatedAt": "2021-01-04T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Belajar CSS",
    "description": "Belajar CSS Dasar",
    "status": "false",
    "due_date": "2021-01-05T00:00:00.149Z",
    "createdAt": "2021-01-04T07:15:12.149Z",
    "updatedAt": "2021-01-04T07:15:12.149Z",
  }
]
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST http://localhost:3000/todos

> Create new todo

_Request Body_
```
{
  "title": "Belajar Javascript",
  "description": "Belajar Javascript Dasar",
  "status": "false",
  "due_date": "01/20/2021",
}
```

_Response (201 - Created)_
```
  {
    "id": "3",
    "title": "Belajar Javascript",
    "description": "Belajar Javascript Dasar",
    "status": "false",
    "due_date": "2021-01-20T00:00:00.149Z",
    "createdAt": "2021-01-04T07:15:12.149Z",
    "updatedAt": "2021-01-04T07:15:12.149Z",
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Due date not valid"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET http://localhost:3000/todos/:id

> Get todo by id

_Request Params_
```
id = [integer]
```

_Response (200 - OK)_
```
  {
    "id": 1,
    "title": "Belajar HTML",
    "description": "Belajar HTML Dasar",
    "status": "false",
    "due_date": "2021-01-05T00:00:00.000Z",
    "createdAt": "2021-01-04T07:15:12.149Z",
    "updatedAt": "2021-01-04T07:15:12.149Z",
  }
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT http://localhost:3000/todos/:id

> Edit todo value

_Request Params_
```
id = [integer]
```
_Request Body_
```
{
  "title": "Belajar HTML Lanjutan",
  "description": "Belajar HTML Lanjutan",
  "status": "false",
  "due_date": ""01/25/2021"",
}
```

_Response (200 - OK)_
```
  {
    "id": "1",
    "title": "Belajar Lanjutan",
    "description": "Belajar HTML Lanjutan",
    "status": "false",
    "due_date": "2021-01-25T00:00:00.000Z", 
    "createdAt": "2021-01-04T07:15:12.149Z",
    "updatedAt": "2021-01-04T07:15:12.149Z",
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Due date not valid"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### PATCH http://localhost:3000/todos/:id

> Edit todo value

_Request Params_
```
id = [integer]
```
_Request Body_
```
{
  "status": "true",
}
```

_Response (200 - OK)_
```
  {
    "id": "1",
    "title": "Belajar HTML Lanjutan",
    "description": "Belajar HTML Lanjutan",
    "status": "true",
    "due_date": "2021-01-25T00:00:00.149Z",
    "createdAt": "2021-01-04T07:15:12.149Z",
    "updatedAt": "2021-01-04T07:15:12.149Z",
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "Due date not valid"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE http://localhost:3000/todos/:id

> Delete todo value

_Request Params_
```
id = [integer]
```
_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    "message": "Todo success to deleted"
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
