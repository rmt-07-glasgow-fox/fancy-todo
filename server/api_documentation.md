# My Todo List App Server
My Todo List App is an application to manage your Todo List. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

_Auth Endpoint_
- `POST /login`
- `POST /register`

_Todos Endpoint_
- `GET /todos`
- `GET /todos/movies/popular`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

_Project Endpoint_
- `GET /project`
- `GET /project/select2user`
- `GET /project/:id`
- `GET /project/:user`
- `POST /project`
- `POST /project/:id/user`
- `PUT /project/:id`
- `PATCH /project/:id`
- `DELETE /project/:id`
- `DELETE /project/:id/user/:userId`


### POST /login

> Create new todo list

_Request Header_
```
{
  not needed
}
```

_Request Body_
```json
{
  "email": "<email to get login>",
  "password": "<password to get login>",
}
```

_Response (200)_
```json
{
"status" : "success",
"data" : {
  "email": "<login email>",
  "password": "<login password>",
}
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": 
    "invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---

### POST /register

> Create new todo list

_Request Header_
```
{
  not needed
}
```

_Request Body_
```json
{
  "email": "<email to get register>",
  "password": "<password to get register>",
}
```

_Response (200)_
```json
{
"status" : "success",
"data" : {
  "email": "<posted email>",
  "password": "<posted password>",
}
}
```

_Response (400 - Bad Request)_
```json
{
  "status": "error",
  "message": [
        "email must be unique"
        "invalid email",
        "field email is required",
        "field password is required",
        "password must at least 6 character"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---

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
        },
        {
            "id": 2,
            "title": "<todos title>",
            "description": "<todos description>",
            "status": "<todos status>",
            "due_date": "2020-03-20T07:15:12.149Z",
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### GET /todos/movies/popular

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
{
  "status" : "success",
  "data" : 
    [
        ``` api from themoviedb```
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### GET /todos/:id

> Get a todo list

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

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
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
  "message": "Internal server error"
}
```
---
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
  "due_date": "<due date to get insert into>",
  "movieId": "<movieId to get insert into>",
  "movieName": "<movieName date to get insert into>"
}
```

_Response (201 - Created)_
```json
{
"status" : "success",
"data" : {
  "id": "<given id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "movieId": "<posted movie id>",
  "movieName": "<posted movie name>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "Start date at least start today.",
        "title is required",
        "description is required",
        "status is required",
        "due date is required"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### PUT /todos/:id

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
  "title": "<title to get update into>",
  "description": "<description to get update into>",
  "status": "<status to get update into>",
  "due_date": "<due date to get update into>",
  "movieId": "<movieId to get insert into>",
  "movieName": "<movieName date to get insert into>"
}
```

_Response (200)_
```json
{
    "status" : "success",
    "message" : "todo updated successfully",
    "data" : {
      "title": "<updated title>",
      "description": "<updated description>",
      "status": "<updated status>",
      "due_date": "<updated due_date>",
      "movieId": "<updated movieId>",
      "movieName": "<updated movieName>"
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z",
    }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "Start date at least start today.",
        "title is required",
        "description is required",
        "status is required",
        "due date is required"
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
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
  "message": "Internal server error"
}
```

---
### PATCH /todos/:id

> Update status todo list

_Request Header_
```json
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

_Response (200)_
```json
{
  "status": "success",
  "message": "todo updated successfully",
  "data" : {
    "status": "<updated status>",
  }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "status is required",
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
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
  "message": "Internal server error"
}
```

---
### DELETE /todos/:id

> Delete todo list

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
  "status": "success",
  "message": "todo successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
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
  "message": "Internal server error"
}
```

### GET /project

> Get all project list

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
  "status" : "success",
  "data" : 
    [
        {
            "id": 1,
            "title": "<project title>",
            "description": "<project description>",
            "status": "<project status>",
            "ownerId": "<project owner id>",

        },
        {
            "id": 2,
            "title": "<project title>",
            "description": "<project description>",
            "status": "<project status>",
            "ownerId": "<project owner id>",
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### GET /project/select2user

> Get query search user

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
  "status" : "success",
  "data" : 
    [
      {
            "id": 2,
            "firstName": "<project title>",
            "lastName": "<project description>",
        } 
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### GET /project/:id

> Get a project

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
  "status" : "success",
   "data": {
        "id": 1,
        "title": "<project title>",
        "description": "<project description>",
        "status": "<project status>",
        "ownerId": "<project owner id>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
  }
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "project not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### POST /project

> Create new project

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
  "ownerId": "<owner id to get insert into>",

}
```

_Response (201 - Created)_
```json
{
"status" : "success",
"data" : {
  "id": "<given id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",  
  "ownerId": "<posted owner id >",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "Start date at least start today.",
        "title is required",
        "description is required",
        "status is required",
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---

### POST /project/:id/user

> Create new user project

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "userId": "<title to get insert into>",
  "projectId": "<owner id to get insert into>",
}
```

_Response (201 - Created)_
```json
{
"status" : "success",
"data" : {
  "id": "<given id by system>",
  "userId": "<posted user id >",
  "projectId": "<posted project id >",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### PUT /project/:id

> Update project 

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get update into>",
  "description": "<description to get update into>",
  "status": "<status to get update into>",
}
```

_Response (200)_
```json
{
    "status" : "success",
    "message" : "todo updated successfully",
    "data" : {
      "title": "<updated title>",
      "description": "<updated description>",
      "status": "<updated status>",
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z",
    }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "Start date at least start today.",
        "title is required",
        "description is required",
        "status is required",
        "due date is required"
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "project not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### PATCH /project/:id

> Update status project

_Request Header_
```json
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

_Response (200)_
```json
{
  "status": "success",
  "message": "project updated successfully",
  "data" : {
    "status": "<updated status>",
  }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "status is required",
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "project not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### DELETE /project/:id

> Delete project

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
  "status": "success",
  "message": "project successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "project not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### DELETE /project/:id/user/:userId

> Delete project member

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
  "status": "success",
  "message": "user successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "user not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```