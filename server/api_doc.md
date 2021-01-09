**Fancy Todo**
----
    Membuat website untuk mencatat hal - hal menarik untuk dilakukan

&nbsp;

* **URL**
    http://localhost:3000
  <_The URL Structure (path only, no root url)_>



* **List Endpoint**
  
  &nbsp;
  
## POST /todos
_Request Header_
```
{
  not needed
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
  "userId": "<automatically inserted by user id>"
}
```
_Response (201 - OK)_
```
{
  "id": "<give id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "userId": "<automatically inserted by user id>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## GET /todos
_Request Header_
```
{
  not needed
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
  "id": "<give id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "userId": "<automatically inserted by user id>"
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## GET /todos:id
_Request Header_
```
{
  not needed
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Response (200 - OK)_
```
[
  {
  "id": "<give id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "userId": "<automatically inserted by user id>"
  }
]
```
_Response (404 - Resource Not Found)_
```
{
  "message": "resource not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## PUT /todos/:id
_Request Header_
```
{
  not needed
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"description": "<posted description>",
"status": "<posted status>",
"due_date": "<posted due_date>",
"userId": "<automatically inserted by user id>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## PATCH /todos/:id
_Request Header_
```
{
  not needed
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Request Body_
```
{
  "status": "<status to get insert into>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"description": "<posted description>",
"status": "<posted status>",
"due_date": "<posted due_date>",
"userId": "<automatically inserted by user id>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## DELETE /todos/:id
_Request Header_
```
{
  not needed
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Response (200 - OK)_
```
{
  "message": "todo success to delete"
}
```
&nbsp;
## POST /register
_Request Header_
```
{
  not needed
}
```
_Request Body_
```
{
  "email": "<email to get insert into>",
  "fullName": "<full name to get insert into>"
  "password": "<password to get insert into>"
}
```
_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## POST /login
_Request Header_
```
{
  not needed
}
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
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```