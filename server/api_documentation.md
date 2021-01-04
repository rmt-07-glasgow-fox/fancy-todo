# My Todo List App Server
My Todo List App is an application to manage your Todo List. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
- `GET /todos`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`


### GET /todos

> Get all todo list

_Request Header_
```
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
  "status" : "success",
  "data" : 
    [
        {
            "id": 1,
            "title": "<todos title>",
            "description": "<todos description>",
            "status": "<todos status>",
            "due_date": "2020-03-20T07:15:12.149Z",
            "createdAt": "2020-03-20T07:15:12.149Z",
            "updatedAt": "2020-03-20T07:15:12.149Z",
        },
        {
            "id": 2,
            "title": "<todos title>",
            "description": "<todos description>",
            "status": "<todos status>",
            "due_date": "2020-03-20T07:15:12.149Z",
            "createdAt": "2020-03-20T07:15:12.149Z",
            "updatedAt": "2020-03-20T07:15:12.149Z",
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Invalid server error"
}
```
---
### GET /todos/:id

> Get a todo list

_Request Header_
```
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
  "status" : "success",
   "data": {
    "id": 1,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Invalid server error"
}
```
---
### POST /todos

> Create new todo list

_Request Header_
```
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
  "due_date": "<due date to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
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
  "status" : "error",
  "message": [
        "title is required"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Invalid server error"
}
```

---
### PUT /todos/:id

> Update todo list

_Request Header_
```
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
  "due_date": "<due date to get insert into>"
}
```

_Response (200 - Created)_
```json
{
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "updatedAt": "<updated updatedAt>",
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "title is required"
    ]
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Invalid server error"
}
```

---
### PATCH /todos/:id

> Update status todo list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": "<status to get insert into>",
}
```

_Response (200 - Created)_
```json
{
  "status": "<updated status>",
  "updatedAt": "<updated updatedAt>",
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "title is required"
    ]
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Invalid server error"
}
```

---
### DELETE /todos/:id

> Delete todo list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": "<status to get insert into>",
}
```

_Response (200 - Created)_
```json
{
  "status": "<updated status>",
  "updatedAt": "<updated updatedAt>",
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Invalid server error"
}
```