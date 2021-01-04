# Fancy To-Do App Server
Fancy To-Do is an application to manage your schedule. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

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
```
[
  {
    "id": 1,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": "true/false",
    "due_date": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todos name>",
    "description": "<todos description>",
    "status": "true/false",
    "due_date": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /todos

> Create new asset

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
  "description": "<description to get insert into>"
  "due_date":"2020-03-20T07:15:12.149Z"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "true/false",
  "due_date": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### PUT /todos/:id

> update all schedule

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
  "description": "<description to get insert into>"
  "due_date":"2020-03-20T07:15:12.149Z"
}
```

_Response (200 - updated)_
```
{
  "id": <given id by system>,
  "title": "<posted name>",
  "description": "<posted description>",
  "status": "true/false",
  "due_date": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### DELETE /todos/:id

> update all schedule

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

_Response (200 - deleted)_
```
{
  "message": "To-Do List Deleted"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```