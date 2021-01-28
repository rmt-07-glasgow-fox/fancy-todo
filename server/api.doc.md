# Fancy-TODO App
Fancy TODO App is for save note fancy things to do. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## List availabel endpoints
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

## RESTful endpoints
### GET /todos

> Get all things to do

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 1,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",,
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /todos

> Create new asset

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
  {
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
  }
```

_Response (201 - Created)_
```json

{
    "id": <given id by system>,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
    "createdAt": "Automate created by system",
    "updatedAt": "Automate created by system",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
### GET /todos/:id

> Read todo by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

not needed
```

_Response (200)_
```json

{
    "id": <id as requested>,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Invalid requests"
}
```
### PUT /todos/:id

> edit todo by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "id": <id as requested>,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (200)_
```json
{
    "id": <id as requested>,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
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

### PATCH /todos/:id

> Edit todo by id on spesicic attributes

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "status": "<status todo>",
}
```

_Response (200)_
```json
{
    "id": <id as requested>,
    "title": "<title todo>",
    "description": "<todo description>",
    "status": "<status todo>",
    "due_date": "<due date todo>",
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

> Delete todo by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

not needed
```

_Response (200)_
```json
{
  "message": "todo success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Invalid requests"
}
```