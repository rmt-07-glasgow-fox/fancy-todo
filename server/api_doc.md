# Fancy Todo
Fancy app is an application to organize your todo list. This app has:
* RESTfull endpoint for todo's CRUD operation
* JSON formatted endpoint

&nbsp;

## Available Endpoints List
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

### GET /todos

> Get all todo list

_Request Header_
```json
{
  "Content-Type": "application/json"
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
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
  }
]
```

_Response (500 - Server errors)_
```
{
  "message": "Internal server error"
}
```
---
### POST /todos

> Create new todo

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Body_
```json
{
    "title": "<todo title>",
    "description": "<todo description>",
    "due_date": "<todo due_date>",
}
```

_Response (201 - Created)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```

_Response (400 - Validation error)_
```json
{
  "message": "Validation error"
}
```
_Response (500 - Server errors)_
```json
{
  "message": "Internal server error"
}
```
---
### GET /todos/:id
> Get todo by id

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>"
}
```
_Response (404 - Id not found)_
```json
{
  "message": "Error not found"
}
```
---
### PUT /todos/:id
> Edit todo by id

_Request Header_
```json
{
  "Content-type": "application/json"
}
```

_Request Body_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```
_Response (200 - Updated Todo)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```
_Response (400 - Validation error)_
```json
{
  "message": "Validation error"
}
```
_Response (404 - Id not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Server error)_
```json
{
  "message": "Internal server error"
}
```
---
### PATCH /todos/:id
> Update todo status by id

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```
_Request Body_
```json
{
  "status": "<todo status>"
}
```
_Response (200 - Updated Todo Status)_
```json
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```
_Response (400 - Validation error)_
```json
{
  "message": "Validation error"
}
```
_Response (404 - Id not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Server error)_
```json
{
  "message": "Internal server error"
}
```
---
### DELETE /todos/:id
> Delete todo by id

_Request Header_
```json
{
  "Content-Type": "application/json"
}
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
  "message": "Todo success to delete",
  "data": {
    "id": "<todo id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"                 
  }
}
```
_Response (404 - Id not found)_
```json
{
  "message": "Error not found"
}
```
_Response (500 - Server errors)_
```json
{
  "message": "Internal server error"
}
```