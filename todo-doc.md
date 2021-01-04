# Fancy Todo App Server
Fancy Todo App is an application to manage things you want to do. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* PATCH /todos/:id
* DELETE /todos/:id
* POST /register
* POST /login


### POST /todos

> Add new Todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title" : "<title to be inserted>",
  "description" : "<description to be inserted>",
  "status" : "<status to be inserted>",
  "due_date" : "<due_date to be inserted>",
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
}
```

_Response (400 - Bad Request)_
```json
{
        "message": "Date must be after today",
        "type": "Validation error",
        "path": "due_date",
        "value": "2021-01-04T00:00:00.000Z",
        "origin": "FUNCTION",
        "instance": {
            "id": null,
            "title": "<todo title>",
            "description": "<todo description>",
            "status": "<todo status>",
            "due_date": "<todo due date>",
            "updatedAt": "<todo updated at>",
            "createdAt": "<todo created at>"
        },
        "validatorKey": "isAfter",
        "validatorName": "isAfter",
        "validatorArgs": [
            "<current date>"
        ],
        "original": {
            "validatorName": "isAfter",
            "validatorArgs": [
                "<current date>"
            ]
        }
    }
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### GET /todos

> List all Todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
Not needed
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### GET /todos/:id

> List all Todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
Not needed
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
}
```

_Response (404 - Not found)_
```json
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### PUT /todos/:id

> List all Todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title" : "<title to be inserted>",
  "description" : "<description to be inserted>",
  "status" : "<status to be inserted>",
  "due_date" : "<due_date to be inserted>",
}
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
}
```

_Response (400 - Bad Request)_
```json
[
    {
        "message": "Date must be after today",
        "type": "Validation error",
        "path": "due_date",
        "value": "2021-01-03T00:00:00.000Z",
        "origin": "FUNCTION",
        "instance": {
            "id": null,
            "title": "<todo title>",
            "description": "<todo description>",
            "status": false,
            "due_date": "2021-01-03T00:00:00.000Z",
            "updatedAt": "2021-01-04T16:25:48.250Z"
        },
        "validatorKey": "isAfter",
        "validatorName": "isAfter",
        "validatorArgs": [
            "2021-01-04T16:25:36.624Z"
        ],
        "original": {
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-01-04T16:25:36.624Z"
            ]
        }
    }
]
```

_Response (404 - Not found)_
```json
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### PATCH /todos/:id

> List all Todos

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status" : "<status to be changed>",
}
```

_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
}
```

_Response (400 - Bad Request)_
```json
[
    {
        "message": "Date must be after today",
        "type": "Validation error",
        "path": "due_date",
        "value": "2021-01-03T00:00:00.000Z",
        "origin": "FUNCTION",
        "instance": {
            "id": null,
            "title": "<todo title>",
            "description": "<todo description>",
            "status": false,
            "due_date": "2021-01-03T00:00:00.000Z",
            "updatedAt": "2021-01-04T16:25:48.250Z"
        },
        "validatorKey": "isAfter",
        "validatorName": "isAfter",
        "validatorArgs": [
            "2021-01-04T16:25:36.624Z"
        ],
        "original": {
            "validatorName": "isAfter",
            "validatorArgs": [
                "2021-01-04T16:25:36.624Z"
            ]
        }
    }
]
```

_Response (404 - Not found)_
```json
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

---

### DELETE /todos/:id

> Delete specific Todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
Not needed
```

_Response (200 - Ok)_
```json
{
  "message": "Todo is successfully deleted"
}
```

_Response (404 - Not found)_
```json
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```