# Fancy To-Do App Server
Fancy To-Do is an application to manage your schedule. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response Send_
```string
Halo
```

### POST /signup
_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### POST /signin
_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### POST /loginGoogle
_Request Header_
```
not needed
```

_Request Body_
```json
{
  "id_token": "<idToken to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### GET /weather
_Request Header_
```
not needed
```

_Request Body_
```json
{
  "id_token": "<idToken to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### GET /todos

> Get all todos

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
    "title": "<todos name>",
    "description": "<todos description>",
    "status": true,
    "due_date": "2020-03-20T07:15:12.149Z",
    "user_id" : "<user_id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": true,
    "due_date": "2020-03-20T07:15:12.149Z",
    "user_id" : "<user_id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /todos/:id

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
  "due_date":"2020-03-20T07:15:12.149Z"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "title": "<posted name>",
  "description": "<posted description>",
  "status": true,
  "due_date": "2020-03-20T07:15:12.149Z",
  "user_id" : "<user_id>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### PUT /todos/:id

> update todo reference to specific id

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
  "status": true,
  "due_date":"2020-03-20T07:15:12.149Z"
}
```

_Response (200 - updated)_
```json
{
  "id": "<given id by system>",
  "title": "<posted name>",
  "description": "<posted description>",
  "status": false,
  "due_date": "2020-03-20T07:15:12.149Z",
  "user_id" : "<user_id>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### DELETE /todos/:id

> delete todos reference to specific id

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

_Response (200 - deleted)_
```json
{
  "message": "A To-Do is Deleted"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```