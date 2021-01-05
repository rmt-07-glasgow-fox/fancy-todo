# fancy_todo
Membuat website untuk mencatat hal - hal menarik untuk dilakukan
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## List Endpoints TODO
- "POST/todos"
- "GET/todos"
- "GET/todos/:id"
- "PUT/todos/:id"
- "Patch/todos/:id"
- "DELETE/todos/:id"

## RESTful endpoints

### POST /todos

> Create new todo list

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
  "due_date": "<due_date to get insert into>"
}
```
_Response (201 - Created)_
```json
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
```json
{
  "message": "Title can not empty"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Date must be greater than today"
}
```
_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
---
### GET /todos

> GET list todos

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
    "id": 1,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<asset name>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  ...
]
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```

### GET /todos /:id

> GET list todos by id

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
    "id": 1,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
### PUT /todos /:id

> Update todo list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to be update>",
  "description": "<description to be update>",
  "status": "<status to be update>",
  "due_date": "<due_date to be update>"
}
```
_Response (200 - Updated)_
```json
{
  "id": <id found>,
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - not found)_
```json
{
  "message": "id not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title can not empty"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Date must be greater than today"
}
```
_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```

### PATCH /todos /:id

> Update a component of todo list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": "<status to be update>",
}
```
_Response (200 - Updated)_
```json
{
  "id": <id found>,
  "title": "<title same as before>",
  "description": "<description same as before>",
  "status": "<updated status>",
  "due_date": "<due_date same as before>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - not found)_
```json
{
  "message": "id not found"
}
```
_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
### DELETE /todos /:id

> DELETE list todos by id

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
    "message": "Todo success to delete"
  }

```
_Response (404 - not found)_
```json

{
  "message": "id not found"
}

```

_Response (500 - internal server error)_
```json

{
  "message": "Internal server error"
}

```
