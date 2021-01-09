# Fancy Todo

## Available endpoints
- `POST /register`
- `POST /login`
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`
- `GET /jokes`

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "fullName": "<full name to get insert into>"
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
}
```

---
### POST /login

> Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email/Password"
}
```

---
### POST /todos

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<date to get insert into>",
  "UserId": "<user id>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<status>",
  "due_date": "<posted date>",
  "UserId": <"user id">,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
}
```
_Response (500 - Internal Server Error)_

---
### GET /todos

> Get all tasks

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

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "title": "<title name>",
    "description": "<description name>",
    "status": "<status>",
    "due_date": "<due_date>",
    "UserId": "<user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<title name>",
    "description": "<description name>",
    "status": "<status>",
    "due_date": "<due_date>",
    "UserId": "<user id>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
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
### GET /todos/:id

> Get task based on id

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

_Response (200 - OK)_
```
{
  "id": "<id>",
  "title": "<title name>",
  "description": "<description name>",
  "status": "<status>",
  "due_date": "<due_date>",
  "UserId": "<user id>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Not found"
}
```
---
### PUT /todos/:id

> Update task based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title name>",
  "description": "<description name>",
  "status": "<status>",
  "due_date": "<due_date>"
}
```

_Response (200 - OK)_
```
{
  "id": "<id>",
  "title": "<updated title name>",
  "description": "<updated description name>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "UserId": "<user id>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PATCH /todos/:id

> Update status based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": "<status>"
}
```

_Response (200 - OK)_
```
{
  "id": "<id>",
  "title": "<title name>",
  "description": "<description name>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "UserId": "<user id>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation errors>"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```
_Response (500 - Internal Server Errors)_

---
### DELETE /todos/:id

> Delete task based on id

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

_Response (200 - OK)_
```
{
  "id": "<id>",
  "title": "<title name>",
  "description": "<description name>",
  "status": "<updated status>",
  "due_date": "<updated due_date>",
  "UserId": "user id",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (200 - OK)_
```
{
  "message": 'Task has been deleted.'
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Errors)_

---
### GET /jokes

> Get one random joke

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

_Response (200 - OK)_
```
{
  "id": "<id>",
  "jokes": "<jokes>"
}
```
_Response (500 - Internal Server Errors)_

---
