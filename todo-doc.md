# Fancy Todo App Server
Fancy Todo App is an application to manage things you want to do. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* PATCH /todos/:id
* DELETE /todos/:id


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
  title,
  description,
  status,
  due_date
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "<asset name>",
  "description": "<asset description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
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
            "title": "<asset title>",
            "description": "<asset description>",
            "status": "<asset status>",
            "due_date": "<asset due date>",
            "updatedAt": "<asset updated at>",
            "createdAt": "<asset created at>"
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
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```