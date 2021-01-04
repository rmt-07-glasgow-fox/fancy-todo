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

_Response (500 - Server errors)_
```
{
  "message": "internal server error"
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
  "id": <given id by system>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": false,
  "due_date": "<todo due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Validation error)_
```json
{
  "message": "validation error"
}
```
_Response (500 - Server errors)_
```
{
  "message": "internal server error"
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
  "message": "error not found"
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
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```
_Response (400 - Validation error)_
```json
{
  "message": "validation error"
}
```
_Response (404 - Id not found)_
```json
{
  "message": "error not found"
}
```
_Response (500 - Server error)_
```json
{
  "message": "internal server error"
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
  "id": "<todo id>",
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```
_Response (400 - Validation error)_
```json
{
  "message": "validation error"
}
```
_Response (404 - Id not found)_
```json
{
  "message": "error not found"
}
```
_Response (500 - Server error)_
```json
{
  "message": "internal server error"
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
  "message": "todo succes to delete"
}
```
_Response (404 - Id not found)_
```json
{
  "message": "error not found"
}
```
_Response (500 - Server errors)_
```json
{
  "message": "internal server error"
}
```