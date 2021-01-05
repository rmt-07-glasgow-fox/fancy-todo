# Fancy To Do App Server
Fancy To Do App is an application to manage your todos. This app has : 
* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todo list

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
    "id": "<given id by system>",
    "title": "<to do title>",
    "description": "<to do description>",
    "status": true,
    "due_date": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": "<given id by system>",
    "title": "<to do title>",
    "description": "<to do description>",
    "status": false,
    "due_date": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### GET /todos/:id

> Get specified todo list

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

_Request Params_
```json
{
  "id": "<To do id>"
}
```

_Response (200)_
```json
[
  {
    "id": "<given id by system>",
    "title": "<to do title>",
    "description": "<to do description>",
    "status": true,
    "due_date": "2020-03-20T07:15:12.149Z",
  }
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### POST /todos

> Create new to do

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "title": "<to do title>",
  "description": "<to do description>",
  "status": "<to do status>",
  "due_date": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### PUT /todos/:id

> Edit specified to do

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```

_Request Params_
```json
{
  "id": "<To do id>"
}
```

_Response (200 - OK)_
```json
{
  "id": "<given id by system>",
  "title": "<to do title>",
  "description": "<to do description>",
  "status": "<to do status>",
  "due_date": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Invalid requests"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### PATCH /todos/:id

> Edit one attributes of specified to do

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```

_Request Params_
```json
{
  "id": "<To do id>"
}
```

_Response (200 - OK)_
```json
{
  "id": "<given id by system>",
  "title": "<to do title>",
  "description": "<to do description>",
  "status": "<to do status>",
  "due_date": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found )_
```json
{
  "message": "Invalid requests"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### PATCH /todos/:id

> Edit one attributes of specified to do

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

_Request Params_
```json
{
  "id": "<To do id>"
}
```

_Response (200 - OK)_
```json
{
  "id": "<given id by system>",
  "title": "<to do title>",
  "description": "<to do description>",
  "status": "<to do status>",
  "due_date": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```