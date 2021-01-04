# Fancy Todo

## Available endpoints
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

## RESTful endpoints
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
  "due_date": "<date to get insert into>"
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
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Errors"
}
```
_Response (500 - Internal Server Error)_

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
    "status": "status",
    "due_date": "<due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<title name>",
    "description": "<description name>",
    "status": "status",
    "due_date": "<due_date>",
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
  "due_date": "<updated due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Validation Errors"
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
  "due_date": "<updated due_date>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Errors"
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
  "due_date": "<updated due_date>"
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

