# Mah todo app Documentation

Todo app is an application to manage your must watchlist movie. This app has : 
* The dbmovie api
* JSON formatted response
* List movie watch todo

# URL
```
Server URL : http://localhost:3000
```

## ENDPOINT
### POST /todos
> Create new todos

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{
  "title": "<title>",
  "description": "<descrion>",
  "status": "<status>",
  "due_date": "<date>"
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "title": "<title>",
  "description": "<description>",
  "status": "status",
  "due_date": "2020-02-20",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z",
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

---
### POST /signup

> Create new user

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
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

_Response (500 - Bad Request)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Password is required!, Password must be more than 6 character"
}
```

_Response (400)_
```
{
  "message": "Email is required!, Email must be a format sample@mail.com"
}
```

---
### POST /signin

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  
}
```

_Response (200)_
```
{
    "id": "<user id>",
    "email": "<user email>"
    "access_token": "<generated accesss token>"
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```

---
### GET /todos

> Get all the todos

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  msg: 'List of Todos',
  [
    {
      "id": <given id by system>,
      "title": "<title>",
      "description": "<description>",
      "status": "<status>",
      "due_date": "2020-02-20",
      "createdAt": "2020-01-20T07:15:12.149Z",
      "updatedAt": "2020-01-20T07:15:12.149Z",
    },
    {
      "id": <"...">,
      "title": "<...>",
      "description": <"...">,
      "status": <"...">,
      "due_date": <"...">,
      "createdAt": <"...">,
      "updatedAt": <"...">,
    }
  ]
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Cannot retrieve data!"
}
```
---
### GET /todos/:id

> Get specify todo by id

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
Not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<title>",
  "description": "<description>",
  "status": "status",
  "due_date": "2020-02-20",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z",
}
```

_Response (404)_
```
{
  "message": "Not found"
}
```

_Response (400)_
```
{
  "message": "Data not found"
}
```
---

### PUT /todos/:id

> Replace object/record

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{
  "title": "<title>",
  "description": "<descrion>",
  "status": "<status>",
  "due_date": "<date>"
}
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<title>",
  "description": "<description>",
  "status": "status",
  "due_date": "2020-02-20",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z",
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---

### PATCH /todos/:id

> Modify attribute object/record

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{
  "status": "<status>"
}
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<title>",
  "description": "<description>",
  "status": "status",
  "due_date": "2020-02-20",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z",
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---

### DELETE /todos/:id

> Modify attribute object/record

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
  msg: '<title> list has been deleted!',
  {
    "id": <given id by system>,
    "title": "<title>",
    "description": "<description>",
    "status": "<status>",
    "due_date": "2020-02-20",
    "createdAt": "2020-01-20T07:15:12.149Z",
    "updatedAt": "2020-01-20T07:15:12.149Z",
  }
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---
