# My Todos App Server
My Todos App is an application to manage your daily activity. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## List available endpoints
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

## RESTful endpoints
### POST /todos

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
  "title": "bangun tidur",
  "description": "tidur lagi",
  "status": false,
  "due_date": "2021-01-06",
}
```
#### Success

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "bangun tidur",
  "description": "tidur lagi",
  "status": false,
  "due_date": "2021-01-06T00:00:00.000Z",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T14:23:52.990Z"
}
```
#### Error

_Response (400 - Bad Request)_
```json
{
  "message": "Date must be greater than today"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
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
#### Success

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "bangun tidur",
    "description": "tidur lagi",
    "status": false,
    "due_date": "2021-01-06T00:00:00.000Z",
    "createdAt": "2021-01-04T14:23:52.990Z",
    "updatedAt": "2021-01-04T15:43:36.781Z"
  }
]
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### GET /todos/:id

> Get all todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "title": "bangun tidur",
  "description": "tidur lagi",
  "status": false,
  "due_date": "2021-01-06T00:00:00.000Z",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T15:43:36.781Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### PUT /todos/:id

> replace todo by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "Membaca buku",
  "description": "membaca buku sejarah",
  "status": false,
  "due_date": "2021-01-06",
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "title": "Membaca buku",
  "description": "membaca buku sejarah",
  "status": false,
  "due_date": "2021-01-06",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T15:43:36.781Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Date must be greater than today"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### PATCH /todos/:id

> modify todo by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": true,
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "title": "Membaca buku",
  "description": "membaca buku sejarah",
  "status": true,
  "due_date": "2021-01-06",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T15:43:36.781Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": ""
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### DELETE /todos/:id

> remove data todo by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "message": "todo success to delete"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---