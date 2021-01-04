# fancy-todo
Membuat website untuk mencatat hal - hal menarik untuk dilakuka

&nbsp;

## RESTful endpoints
### POST /todos

>Creat new todo

_Request Params_
```
not needed
```
_Request Body_
```
{
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due_date to get insert into>"
}
```
_Response (201 - Created)_
```
{
    "id": "<given id by system>",
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>"
    "createdAt": "<given createdAt by system>",
    "updatedAt": "<given updatedAt by system>"
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
---
### GET /todos

>Get all todo

_Request Params_
```
not needed
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
[
    {
        "id": "<todo id>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>"
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>"
    },
    {
        "id": "<todo id>",
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>"
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>"
    }
]
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
---
### GET /todos/:id

>Get specific todo

_Request Params_
```
<id as parameter to get specific todo>
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
{
    "id": "<todo id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>"
}
```
_Response (404 - Not Found)_
```
{message error not found}
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
---
### PUT /todos/:id

>Update/Replace todo

_Request Params_
```
<id as parameter to Update/Replace todo>
```
_Request Body_
```
{
    "title": "<title to update/replace into>",
    "description": "<description to update/replace into>",
    "status": "<status to update/replace into>",
    "due_date": "<due_date to update/replace into>"
}
```
_Response (200 - OK)_
```
{
    "id": "<todo id>",
    "title": "<todo updated title>",
    "description": "<todo updated description>",
    "status": "<todo updated status>",
    "due_date": "<todo updated due_date>"
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updated updatedAt>"
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (404 - Not Found)_
```
{"message error not found"}
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
---
### PATCH /todos/:id

>Update/Modify todo

_Request Params_
```
<id as parameter to Update/Replace todo>
```
_Request Body_
```
{
    "status": "<status to update/replace into>"
}
```
_Response (200 - OK)_
```
{
    "id": "<todo id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo updated status>",
    "due_date": "<todo updated due_date>"
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updated updatedAt>"
}
```
_Response (400 - Bad Request)_
```
[<validation error message>]
```
_Response (404 - Not Found)_
```
{"message error not found"}
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
---
### DELETE /todos/:id

>Delete todo

_Request Params_
```
<id as parameter to delete todo>
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
{msg: "todo success to dlete"}
```
_Response (404 - Not Found)_
```
{"message error not found"}
```
_Response (500 - Internal Server Error)_
```
{<errors message>}
```
---






