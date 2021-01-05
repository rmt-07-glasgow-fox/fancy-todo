# My Fancy Todo App
My Fancy Todo app is an application to manage your activities. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
&nbsp;

## List endpoitns
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

### POST /todos
> Create new Todo

_Request Header_
```json
  {
    "access_token": "application/json"
  }
```
_Request Body_
```json
  {
    "title": "Take a Nap",
    "description": "after lunch",
    "status": false,
    "due_date": "2021-01-07"
  }
```
_Response (201 - Created)_
```json
  {
    "id": <given id by system>,
    "title": "Take a Nap",
    "description": "after lunch",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
  }
```
_Response (400 - Bad Request)_
```json
  {
    "message": "validation errors"
  }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```
---
### GET /todos
> Get all Todos

_Request Header_
```json
  {
    "access_token": "application/todos"
  }
```
_Request Body_
```
  no needed
```
_Response (200)_
```json
[
  { 
    "id": <given id by system>,
    "title": "<posted name>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```

### GET /todos/:id
> Get Todo by id from Params 

_Request Header_
```json
  {
    "access_token": "application/json"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  no needed
```
_Response (200)_
```json
  {
    "id": 1,
    "title": "New Take a Nap",
    "description": "before lunch",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
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
    "message": "Error in internal server"
  }
```
---

### PUT /todos/:id
> Edit Todos by id from Params 

_Request Header_
```json
  {
    "access_token": "application/json"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  {
    "title": "New Take a Nap",
    "description": "before lunch",
    "status": false,
    "due_date": "2021-01-07"
  }
```
_Response (200)_
```json
  {
    "id": 1,
    "title": "New Take a Nap",
    "description": "before lunch",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
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
    "message": "Error in internal server"
  }
```
---

### PATCH /todos/:id
> Edit Todo Status by id from params

_Request Header_
```json
  {
    "access_token": "application/json"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  {
    "status": true,
  }
```
_Response (200)_
```json
  {
    "id": 1,
    "title": "New Take a Nap",
    "description": "before lunch",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
    "createdAt": "2021-01-07T00:00:00.000Z",
    "updatedAt": "2021-01-07T00:00:00.000Z"
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
    "message": "Error in internal server"
  }
```
---

### DELETE /todos/:id
> Remove Todo by id from Params 

_Request Header_
```json
  {
    "access_token": "application/json"
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  no needed
```
_Response (200)_
```json
  {
    "message": 'todo success deleted'
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
    "message": "Error in internal server"
  }
```
---