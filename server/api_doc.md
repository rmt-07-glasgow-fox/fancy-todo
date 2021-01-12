# Fancy Todo App
Fancy Todo App is an application to make a list of every fancy todo of your daily activities. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## List of available endpoints
- `GET /todos`
- `POST /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`
- `GET /register`
- `POST /register`
- `DELETE /register/:id`
- `POST /login`

## RESTful endpoints
### GET /todos

> Get all todo

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
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<due date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
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
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due date to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
---
### PUT /todos/:id

> Update todo with the id inputed


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": "<id todo want to be deleted>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
---
### PATCH /todos/:id

> Update todo with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": "<id todo want to be deleted>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
---
### DELETE /todos/:id

> Delete todo with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": "<id todo want to be deleted>"
}
```

_Response (200)_
```json
{
  "message": "Todo has been deleted"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### POST /register

> Create new user

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "email": "<posted email>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```
---
### POST /login

> Compare data login database with request

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "email": "<email to get compare>",
  "password": "<password to get compare>"
}
```

_Response (200)_
```json
{
  "acces_token": "<your acces token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/ password"
}
```
