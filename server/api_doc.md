# Fancy To-Do
Fancy-ToDo App is an application to manage your daily task.
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;
## List of available endpoints
- `GET /todo`
- `POST /todo`
- `PUT /todo`
- `PATCH /todo`
- `DELETE /todo`
## RESTful endpoints
-
### GET /todo

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
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<done or not done>",
    "due_date": "<todo due date>",
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
### POST /todo

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
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due date>"
}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<done or not done>",
  "due_date": "<todo due date>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```